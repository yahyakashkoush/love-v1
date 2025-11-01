"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
      className="py-8 px-4 bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-rose-950 border-t border-red-200 dark:border-red-900/50"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2 font-medium">
          Made with{" "}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ❤️
          </motion.span>{" "}
          for Valentine&apos;s Day
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-red-900/50 border-2 border-red-200 dark:border-red-900/50 hover:shadow-lg transition-shadow"
        >
          {mounted && (
            <>
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-red-600" />
              )}
            </>
          )}
        </motion.button>

        <motion.p className="text-xs text-red-600 dark:text-red-400 font-medium">
          © {new Date().getFullYear()} LoveStory. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};
