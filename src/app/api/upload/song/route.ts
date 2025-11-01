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
    const title = formData.get("title") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { error: "No title provided" },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 50MB" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"];
    if (!validTypes.includes(file.type)) {
      console.warn(`Invalid file type: ${file.type}`);
      // Continue anyway - some clients may have wrong mime type
    }

    const admin = getAdminClient();
    const fileName = `${Date.now()}-${file.name}`;

    console.log(`Uploading song: ${fileName}, size: ${file.size} bytes`);

    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    const { data, error } = await admin.storage
      .from("songs")
      .upload(fileName, buffer, {
        contentType: file.type || "audio/mpeg",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
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
    } = admin.storage.from("songs").getPublicUrl(data.path);

    console.log(`Song uploaded successfully: ${publicUrl}`);

    // Update content with new song
    await updateContent({
      song: {
        url: publicUrl,
        title,
      },
    });

    return NextResponse.json({
      url: publicUrl,
      title,
      path: data.path,
      message: "Song uploaded successfully",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("POST /api/upload/song error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to upload song: ${errorMessage}` },
      { status: 500 }
    );
  }
}
