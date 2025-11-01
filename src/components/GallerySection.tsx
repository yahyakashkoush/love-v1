"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface GallerySectionProps {
  images: string[];
}

export const GallerySection = ({ images }: GallerySectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  if (!images || images.length === 0) {
    return null;
  }

  // Auto-flip every 5 seconds (longer on mobile for performance)
  useEffect(() => {
    if (!autoPlay) return;
    
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const flipInterval = isMobile ? 7000 : 5000; // Longer interval on mobile
    
    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsFlipping(false);
      }, 300);
    }, flipInterval);

    return () => clearInterval(timer);
  }, [autoPlay, images.length]);

  const nextImage = () => {
    setAutoPlay(false);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsFlipping(false);
      // Resume auto-play after 3 seconds
      setTimeout(() => setAutoPlay(true), 3000);
    }, 300);
  };

  const prevImage = () => {
    setAutoPlay(false);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsFlipping(false);
      // Resume auto-play after 3 seconds
      setTimeout(() => setAutoPlay(true), 3000);
    }, 300);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
      className="py-32 px-4 bg-gradient-to-b from-red-50 via-rose-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-rose-950 relative overflow-hidden"
    >
      {/* Enhanced Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-300 to-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-pulse" />
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-gradient-to-tr from-rose-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title - Enhanced */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-32"
        >
          {/* Heart Icon */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-8"
          >
            <Heart className="w-14 h-14 text-red-600 fill-red-600" />
          </motion.div>

          <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-10 bg-gradient-to-r from-red-700 via-rose-600 to-red-700 dark:from-red-300 dark:via-rose-300 dark:to-red-300 bg-clip-text text-transparent">
            Our Memories
          </h2>
          
          <div className="h-2 w-40 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 mx-auto mb-10 rounded-full shadow-lg shadow-red-400/50" />
          
          <div className="max-w-3xl mx-auto">
            <p className="text-3xl md:text-4xl text-red-600 dark:text-red-300 font-light mb-4">
              Precious Moments of Love
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-light">
              Every smile, every laugh, every tender moment we share together
            </p>
          </div>

          {/* Animated dots */}
          <div className="mt-12 flex justify-center gap-5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-4 h-4 bg-gradient-to-r from-red-500 to-rose-500 rounded-full shadow-md shadow-red-400/50"
              />
            ))}
          </div>
        </motion.div>

        {/* Carousel Gallery - Square */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col items-center"
        >
          {/* Main Carousel Container - SQUARE */}
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-red-200/50 dark:border-red-900/50 bg-white dark:bg-slate-900">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-rose-50/50 dark:from-slate-800/50 dark:to-slate-900/50 pointer-events-none" />

            {/* Carousel Track */}
            <motion.div
              animate={{
                rotateY: isFlipping ? 90 : 0,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={images[currentIndex]}
                alt={`Memory ${currentIndex + 1}`}
                fill
                className="w-full h-full object-cover"
                unoptimized
              />

              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </motion.div>

            {/* Auto-play indicator */}
            {autoPlay && (
              <motion.div
                className="absolute top-6 right-6 w-3 h-3 rounded-full bg-green-400 shadow-lg"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}

            {/* Navigation Buttons */}
            <motion.button
              whileHover={{ scale: 1.15, x: -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 hover:shadow-xl transition-all shadow-lg backdrop-blur-sm border-2 border-red-300/50 dark:border-red-900/50 z-20 group"
            >
              <motion.div
                animate={{ x: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronLeft size={24} />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.15, x: 8 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 hover:shadow-xl transition-all shadow-lg backdrop-blur-sm border-2 border-red-300/50 dark:border-red-900/50 z-20"
            >
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight size={24} />
              </motion.div>
            </motion.button>
          </div>

          {/* Thumbnail Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex gap-3 overflow-x-auto pb-2 px-2 justify-center w-full"
          >
            {images.map((img, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAutoPlay(false);
                  setIsFlipping(true);
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setIsFlipping(false);
                    setTimeout(() => setAutoPlay(true), 3000);
                  }, 300);
                }}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-3 transition-all shadow-lg cursor-pointer ${
                  idx === currentIndex
                    ? "border-red-500 shadow-red-500/70 scale-125"
                    : "border-red-200/50 dark:border-red-900/50 hover:border-red-400 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  fill
                  className="w-full h-full object-cover"
                  unoptimized
                />
                {idx === currentIndex && (
                  <motion.div
                    layoutId="active-thumbnail"
                    className="absolute inset-0 border-2 border-red-500"
                    transition={{ type: "spring", bounce: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mt-8 w-full max-w-md h-1 bg-red-200/30 dark:bg-red-900/30 rounded-full overflow-hidden"
          >
            <motion.div
              animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
