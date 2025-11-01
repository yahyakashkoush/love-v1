"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const FloatingHearts = () => {
  const hearts = Array.from({ length: 25 }, (_, i) => i);

  const colors = [
    "text-red-500 fill-red-500",
    "text-rose-500 fill-rose-500",
    "text-red-600 fill-red-600",
    "text-rose-600 fill-rose-600",
    "text-red-400 fill-red-400",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = Math.random() * 30 + 20;
        const randomDuration = Math.random() * 4 + 5;
        const randomDelay = Math.random() * 3;
        const startX = Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800);

        return (
          <motion.div
            key={heart}
            initial={{
              opacity: 0,
              y: typeof window !== "undefined" ? window.innerHeight + 100 : 800,
              x: startX,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0.6, 0],
              y: -200,
              x: startX + (Math.random() * 300 - 150),
              scale: [0, 1, 0.8],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: "easeOut",
            }}
            className="absolute will-change-transform"
            style={{
              filter: "drop-shadow(0 0 4px rgba(220, 38, 38, 0.4))",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: randomDelay,
              }}
            >
              <Heart
                size={randomSize}
                className={`${randomColor} drop-shadow-lg`}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};
