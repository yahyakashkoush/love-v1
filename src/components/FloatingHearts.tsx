"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface HeartConfig {
  id: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  startX: number;
  endX: number;
}

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartConfig[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const colors = [
      "text-red-500 fill-red-500",
      "text-rose-500 fill-rose-500",
      "text-red-600 fill-red-600",
      "text-rose-600 fill-rose-600",
      "text-red-400 fill-red-400",
    ];

    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;

    const generatedHearts = Array.from({ length: 25 }, (_, i) => {
      const startX = Math.random() * windowWidth;
      return {
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 30 + 20,
        duration: Math.random() * 4 + 5,
        delay: Math.random() * 3,
        startX,
        endX: startX + (Math.random() * 300 - 150),
      };
    });

    setHearts(generatedHearts);
  }, []);

  if (!mounted || hearts.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            opacity: 0,
            y: typeof window !== "undefined" ? window.innerHeight + 100 : 800,
            x: heart.startX,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0.6, 0],
            y: -200,
            x: heart.endX,
            scale: [0, 1, 0.8],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
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
              delay: heart.delay,
            }}
          >
            <Heart
              size={heart.size}
              className={`${heart.color} drop-shadow-lg`}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
