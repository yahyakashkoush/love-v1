"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Trash2, Music, Image as ImageIcon, X } from "lucide-react";
import { ContentType } from "@/lib/supabase";
import Image from "next/image";

interface MediaTabProps {
  content: ContentType;
  onSave: (updates: Partial<ContentType>) => Promise<void>;
  token: string;
  saving: boolean;
}

export const MediaTab = ({
  content,
  onSave,
  token,
  saving,
}: MediaTabProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus("✅ Image uploaded successfully!");
        setTimeout(() => setUploadStatus(""), 3000);
      } else {
        setUploadStatus(`❌ ${data.error || "Failed to upload image"}`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Upload error";
      console.error("Image upload error:", error);
      setUploadStatus(`❌ ${errorMsg}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSongUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const title = prompt("Enter song title:");
    if (!title) return;

    setUploading(true);
    setUploadStatus("Uploading song...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);

      const response = await fetch("/api/upload/song", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus("✅ Song uploaded successfully!");
        setTimeout(() => setUploadStatus(""), 3000);
      } else {
        setUploadStatus(`❌ ${data.error || "Failed to upload song"}`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Upload error";
      console.error("Song upload error:", error);
      setUploadStatus(`❌ ${errorMsg}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus("Uploading cover...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/cover", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus("✅ Cover uploaded successfully!");
        setTimeout(() => setUploadStatus(""), 3000);
      } else {
        setUploadStatus(`❌ ${data.error || "Failed to upload cover"}`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Upload error";
      console.error("Cover upload error:", error);
      setUploadStatus(`❌ ${errorMsg}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Status Message */}
      {uploadStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-600 dark:text-blue-400 text-sm"
        >
          {uploadStatus}
        </motion.div>
      )}

      {/* Images Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Gallery Images
        </h3>

        {/* Upload Input */}
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="block p-6 border-2 border-dashed border-pink-300 dark:border-pink-700 rounded-lg text-center cursor-pointer hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-colors"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2"
            >
              <ImageIcon className="text-pink-600 dark:text-pink-400" size={32} />
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                {uploading ? "Uploading..." : "Upload Image"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click to select or drag & drop
              </p>
            </motion.div>
          </label>
        </div>

        {/* Images Grid */}
        {content.images && content.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {content.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative h-32 rounded-lg overflow-hidden group"
              >
                <Image
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                    onClick={() => {
                      const updatedImages = content.images.filter(
                        (_, i) => i !== index
                      );
                      onSave({ images: updatedImages });
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Song Section */}
      <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Song
        </h3>

        <div className="relative">
          <input
            type="file"
            accept="audio/*"
            onChange={handleSongUpload}
            disabled={uploading}
            className="hidden"
            id="song-upload"
          />
          <label
            htmlFor="song-upload"
            className="block p-6 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg text-center cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2"
            >
              <Music className="text-purple-600 dark:text-purple-400" size={32} />
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                {uploading ? "Uploading..." : "Upload Song"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                MP3, WAV, or OGG
              </p>
            </motion.div>
          </label>
        </div>

        {content.song && (
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="text-purple-600" size={20} />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {content.song.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uploaded
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cover Section */}
      <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Song Cover
        </h3>

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            disabled={uploading}
            className="hidden"
            id="cover-upload"
          />
          <label
            htmlFor="cover-upload"
            className="block p-6 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2"
            >
              <ImageIcon className="text-blue-600 dark:text-blue-400" size={32} />
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                {uploading ? "Uploading..." : "Upload Cover"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Album cover image
              </p>
            </motion.div>
          </label>
        </div>

        {content.songCover && (
          <div className="relative h-32 w-32 mx-auto rounded-lg overflow-hidden">
            <Image
              src={content.songCover}
              alt="Song Cover"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
