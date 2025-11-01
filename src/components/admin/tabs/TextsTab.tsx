"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentType } from "@/lib/supabase";

interface TextsTabProps {
  content: ContentType;
  onSave: (updates: Partial<ContentType>) => Promise<void>;
  saving: boolean;
}

export const TextsTab = ({ content, onSave, saving }: TextsTabProps) => {
  const [loveMessage, setLoveMessage] = useState(content.loveMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ loveMessage });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Love Message */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Love Message
        </label>
        <textarea
          value={loveMessage}
          onChange={(e) => setLoveMessage(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all resize-none"
          placeholder="Write your love message here..."
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {loveMessage.length} characters
        </p>
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
