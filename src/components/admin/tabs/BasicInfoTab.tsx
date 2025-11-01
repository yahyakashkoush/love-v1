"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentType } from "@/lib/supabase";

interface BasicInfoTabProps {
  content: ContentType;
  onSave: (updates: Partial<ContentType>) => Promise<void>;
  saving: boolean;
}

export const BasicInfoTab = ({
  content,
  onSave,
  saving,
}: BasicInfoTabProps) => {
  const [maleName, setMaleName] = useState(content.maleName);
  const [femaleName, setFemaleName] = useState(content.femaleName);
  const [tagline, setTagline] = useState(content.tagline);
  const [startDate, setStartDate] = useState(content.startDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      maleName,
      femaleName,
      tagline,
      startDate,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Male Name */}
        <motion.div whileHover={{ scale: 1.01 }}>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            His Name
          </label>
          <input
            type="text"
            value={maleName}
            onChange={(e) => setMaleName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all"
            required
          />
        </motion.div>

        {/* Female Name */}
        <motion.div whileHover={{ scale: 1.01 }}>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Her Name
          </label>
          <input
            type="text"
            value={femaleName}
            onChange={(e) => setFemaleName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all"
            required
          />
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Tagline
        </label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all"
          required
        />
      </motion.div>

      {/* Start Date */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all"
          required
        />
      </motion.div>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={saving}
        className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-500 dark:to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </motion.button>
    </motion.form>
  );
};
