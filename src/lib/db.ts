import { getAdminClient, ContentType } from "./supabase";

const TABLE_NAME = "content";

export const getContent = async (): Promise<ContentType | null> => {
  const admin = getAdminClient();
  const { data, error } = await admin
    .from(TABLE_NAME)
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching content:", error);
    return null;
  }

  if (!data) return null;

  // Map lowercase column names to camelCase
  return {
    id: data.id,
    maleName: data.malename || data.maleName,
    femaleName: data.femalename || data.femaleName,
    tagline: data.tagline,
    loveMessage: data.lovemessage || data.loveMessage,
    images: data.images || [],
    song: data.song,
    songCover: data.songcover || data.songCover,
    startDate: data.startdate || data.startDate,
    createdAt: data.createdat || data.createdAt,
    updatedAt: data.updatedat || data.updatedAt,
  } as ContentType;
};

export const updateContent = async (
  updates: Partial<ContentType>
): Promise<ContentType | null> => {
  const admin = getAdminClient();
  
  const updateData: any = {};
  
  // Convert camelCase to lowercase for Supabase
  if (updates.maleName) updateData.malename = updates.maleName;
  if (updates.femaleName) updateData.femalename = updates.femaleName;
  if (updates.tagline) updateData.tagline = updates.tagline;
  if (updates.loveMessage) updateData.lovemessage = updates.loveMessage;
  if (updates.images !== undefined) updateData.images = updates.images;
  if (updates.song) updateData.song = updates.song;
  if (updates.songCover) updateData.songcover = updates.songCover;
  if (updates.startDate) updateData.startdate = updates.startDate;
  
  updateData.updatedat = new Date().toISOString();

  const { data, error } = await admin
    .from(TABLE_NAME)
    .update(updateData)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error("Error updating content:", error);
    return null;
  }

  if (!data) return null;

  // Map back to camelCase
  return {
    id: data.id,
    maleName: data.malename || data.maleName,
    femaleName: data.femalename || data.femaleName,
    tagline: data.tagline,
    loveMessage: data.lovemessage || data.loveMessage,
    images: data.images || [],
    song: data.song,
    songCover: data.songcover || data.songCover,
    startDate: data.startdate || data.startDate,
    createdAt: data.createdat || data.createdAt,
    updatedAt: data.updatedat || data.updatedAt,
  } as ContentType;
};

export const initializeContent = async (): Promise<ContentType | null> => {
  const admin = getAdminClient();

  const defaultContent = {
    malename: "Ahmed",
    femalename: "Fatima",
    tagline: "Our Love Story",
    lovemessage: "Every moment with you is a treasure...",
    images: [],
    song: null,
    songcover: null,
    startdate: new Date().toISOString().split("T")[0],
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString(),
  };

  const { data, error } = await admin
    .from(TABLE_NAME)
    .insert([defaultContent])
    .select()
    .single();

  if (error && !error.message.includes("duplicate")) {
    console.error("Error initializing content:", error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    maleName: data.malename,
    femaleName: data.femalename,
    tagline: data.tagline,
    loveMessage: data.lovemessage,
    images: data.images || [],
    song: data.song,
    songCover: data.songcover,
    startDate: data.startdate,
    createdAt: data.createdat,
    updatedAt: data.updatedat,
  } as ContentType;
};
