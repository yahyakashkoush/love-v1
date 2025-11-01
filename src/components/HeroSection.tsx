"use client";

import { motion } from "framer-motion";
import { ContentType } from "@/lib/supabase";

interface HeroSectionProps {
  content: ContentType;
}

export const HeroSection = ({ content }: HeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const startDate = new Date(content.startDate);
  const today = new Date();
  const daysCount = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-50 via-rose-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-slate-950" />
        
        {/* Animated orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-red-400 to-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        />
        
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-400 to-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-to-br from-red-300 to-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-8"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main heading with background */}
        <motion.div
          variants={itemVariants}
          className="mb-8 relative"
        >
          {/* Decorative background shape */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 -z-10 bg-gradient-to-r from-red-200/40 via-rose-200/40 to-red-200/40 dark:from-red-900/30 dark:via-rose-900/30 dark:to-red-900/30 rounded-3xl blur-2xl -top-12 -bottom-12 -left-20 -right-20"
          />

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-serif mb-4 relative z-10 py-6">
            <span className="bg-gradient-to-r from-red-700 via-rose-600 to-red-700 dark:from-red-400 dark:via-rose-300 dark:to-red-400 bg-clip-text text-transparent block leading-tight drop-shadow-lg">
              {content.maleName}
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-red-600 dark:text-red-400 my-3 font-light drop-shadow-lg">&</span>
            <span className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 dark:from-rose-400 dark:via-red-300 dark:to-rose-400 bg-clip-text text-transparent block leading-tight drop-shadow-lg">
              {content.femaleName}
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl text-red-700 dark:text-red-300 italic mb-12 font-light tracking-wide"
        >
          {content.tagline}
        </motion.p>

        {/* Date & Counter */}
        <motion.div
          variants={itemVariants}
          className="mb-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-900/50"
        >
          <p className="text-sm md:text-base text-red-700 dark:text-red-300 uppercase tracking-widest mb-4 font-semibold">
            Together Since
          </p>
          <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-red-600 dark:from-red-300 dark:via-rose-300 dark:to-red-300 bg-clip-text text-transparent mb-8">
            {startDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          
          {/* Counter boxes */}
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 rounded-2xl px-8 py-4 border-2 border-red-200 dark:border-red-700/50">
              <p className="text-5xl md:text-6xl font-bold text-red-600 dark:text-red-400 mb-2">
                {daysCount}
              </p>
              <p className="text-sm md:text-base text-red-700 dark:text-red-300 uppercase font-semibold tracking-wide">
                Days Together
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/20 rounded-2xl px-8 py-4 border-2 border-rose-200 dark:border-rose-700/50">
              <p className="text-5xl md:text-6xl font-bold text-rose-600 dark:text-rose-400 mb-2">
                ∞
              </p>
              <p className="text-sm md:text-base text-rose-700 dark:text-rose-300 uppercase font-semibold tracking-wide">
                Forever Counting
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating hearts animation */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-end gap-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="text-4xl md:text-5xl"
            >
              ❤️
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 flex flex-col items-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Scroll to explore
          </p>
          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="w-1.5 h-1.5 bg-pink-600 dark:bg-pink-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
