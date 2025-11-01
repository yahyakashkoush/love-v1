import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Use anon key for all operations - it has full access to public data
export const getAdminClient = () => {
  return supabase;
};

export type ContentType = {
  id: number;
  maleName: string;
  femaleName: string;
  tagline: string;
  loveMessage: string;
  images: string[];
  song: { url: string; title: string } | null;
  songCover: string | null;
  startDate: string;
  createdAt: string;
  updatedAt: string;
};
