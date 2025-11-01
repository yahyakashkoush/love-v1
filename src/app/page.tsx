"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Gift } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { GallerySection } from "@/components/GallerySection";
import { AudioPlayer } from "@/components/AudioPlayer";
import { LoveMessage } from "@/components/LoveMessage";
import { Footer } from "@/components/Footer";
import { FloatingHearts } from "@/components/FloatingHearts";
import { ContentType } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
  const [content, setContent] = useState<ContentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check if already unlocked
  useEffect(() => {
    const unlocked = localStorage.getItem("lovev1_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  // Fetch content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
    // Reduce refresh rate on mobile for better performance
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const refreshInterval = isMobile ? 5000 : 2000;
    const interval = setInterval(fetchContent, refreshInterval);
    return () => clearInterval(interval);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "iloveyou") {
      setIsUnlocked(true);
      localStorage.setItem("lovev1_unlocked", "true");
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  if (!isUnlocked) {
  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-b from-red-50 via-rose-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-rose-950 flex items-center justify-center z-50"
      >
        {/* Floating Hearts Background */}
        <FloatingHearts />

        <div className="relative z-10 flex flex-col items-center justify-center gap-8">
          {/* Gift Icon */}
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl"
          >
            🎁
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-red-600 dark:from-red-300 dark:via-rose-300 dark:to-red-300 bg-clip-text text-transparent text-center"
          >
            LoveStory
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-red-700 dark:text-red-300"
          >
            Valentine Edition
          </motion.p>

          {/* Password Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onSubmit={handlePasswordSubmit}
            className="flex flex-col gap-4 w-80"
          >
            <div className="relative">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-red-600 dark:text-red-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-3 bg-white/70 dark:bg-slate-800/70 border-2 border-red-200 dark:border-red-900/50 rounded-xl focus:outline-none focus:border-red-500 dark:focus:border-red-400 backdrop-blur-sm text-red-900 dark:text-white placeholder-red-600 dark:placeholder-red-400"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 dark:text-red-400 text-sm text-center font-semibold"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-500 dark:to-rose-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Unlock Your Love Story
            </motion.button>
          </motion.form>

          {/* Heart Animation */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="text-4xl"
          >
            ❤️
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 via-rose-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-rose-950">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            💕
          </motion.div>
          <p className="text-red-700 dark:text-red-300 text-lg">
            Loading your love story...
          </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 via-rose-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-rose-950">
        <p className="text-red-700 dark:text-red-300 text-lg">
          Unable to load content
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <FloatingHearts />

      {/* Admin Icon */}
      <Link href="/admin/login">
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-40 bg-gradient-to-br from-red-600 to-rose-600 dark:from-red-500 dark:to-rose-500 p-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
          title="Admin Panel"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </motion.div>
      </Link>

      <main className="relative z-10">
        <HeroSection content={content} />
        <GallerySection images={content.images} />
        {content.song && (
          <AudioPlayer
            songUrl={content.song.url}
            songTitle={content.song.title}
            coverUrl={content.songCover}
          />
        )}
        <LoveMessage message={content.loveMessage} />
        <Footer />
      </main>
    </div>
  );
}
