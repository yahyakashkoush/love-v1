"use client";

import { motion } from "framer-motion";

interface LoveMessageProps {
  message: string;
}

export const LoveMessage = ({ message }: LoveMessageProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 1 }}
      className="py-24 px-4 bg-gradient-to-b from-red-50 via-rose-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-rose-950 relative overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-300 to-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-pulse" />
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-gradient-to-tr from-rose-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl mb-8"
        >
          💌
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl leading-relaxed bg-gradient-to-r from-red-700 to-rose-700 dark:from-red-300 dark:to-rose-300 bg-clip-text text-transparent italic font-light"
          style={{
            fontFamily: '"Brush Script MT", cursive',
            letterSpacing: "0.05em",
          }}
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex justify-center gap-3"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="text-4xl"
            >
              ❤️
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
