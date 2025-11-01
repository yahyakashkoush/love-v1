import { verifyToken } from "@/lib/auth";
import { getAdminClient } from "@/lib/supabase";
import { updateContent } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const verified = verifyToken(token);
    if (!verified) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB for images)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 10MB" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      console.warn(`Invalid image type: ${file.type}`);
      // Continue anyway - some clients may have wrong mime type
    }

    const admin = getAdminClient();
    const fileName = `${Date.now()}-${file.name}`;

    console.log(`Uploading cover: ${fileName}, size: ${file.size} bytes`);

    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    const { data, error } = await admin.storage
      .from("covers")
      .upload(fileName, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

    if (error) {
      console.error("Supabase cover upload error:", error);
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Upload failed: No data returned" },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = admin.storage.from("covers").getPublicUrl(data.path);

    console.log(`Cover uploaded successfully: ${publicUrl}`);

    // Update content with new cover
    await updateContent({
      songCover: publicUrl,
    });

    return NextResponse.json({
      url: publicUrl,
      path: data.path,
      message: "Cover uploaded successfully",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("POST /api/upload/cover error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to upload cover: ${errorMessage}` },
      { status: 500 }
    );
  }
}
