"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User2, FileText, Image } from "lucide-react";
import { ContentType } from "@/lib/supabase";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { TextsTab } from "./tabs/TextsTab";
import { MediaTab } from "./tabs/MediaTab";

interface DashboardTabsProps {
  content: ContentType;
  onSave: (updates: Partial<ContentType>) => Promise<void>;
  token: string;
  saving: boolean;
}

type TabType = "basic" | "texts" | "media";

export const DashboardTabs = ({
  content,
  onSave,
  token,
  saving,
}: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("basic");

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "basic", label: "Basic Info", icon: <User2 size={20} /> },
    { id: "texts", label: "Texts", icon: <FileText size={20} /> },
    { id: "media", label: "Media", icon: <Image size={20} /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-500 dark:to-purple-500 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-8"
      >
        {activeTab === "basic" && (
          <BasicInfoTab content={content} onSave={onSave} saving={saving} />
        )}
        {activeTab === "texts" && (
          <TextsTab content={content} onSave={onSave} saving={saving} />
        )}
        {activeTab === "media" && (
          <MediaTab
            content={content}
            onSave={onSave}
            token={token}
            saving={saving}
          />
        )}
      </motion.div>
    </div>
  );
};
