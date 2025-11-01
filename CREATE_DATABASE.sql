-- Create table
CREATE TABLE IF NOT EXISTS content (
  id BIGINT PRIMARY KEY DEFAULT 1,
  maleName TEXT NOT NULL DEFAULT 'John',
  femaleName TEXT NOT NULL DEFAULT 'Sarah',
  tagline TEXT NOT NULL DEFAULT 'Our Love Story',
  loveMessage TEXT NOT NULL DEFAULT 'Every moment with you is a treasure beyond measure.',
  images JSONB DEFAULT '[]'::jsonb,
  song JSONB DEFAULT NULL,
  songCover TEXT DEFAULT NULL,
  startDate TEXT NOT NULL DEFAULT '2020-02-14',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert test data with sample images and song
INSERT INTO content (
  id, 
  maleName, 
  femaleName, 
  tagline, 
  loveMessage, 
  images,
  song,
  songCover,
  startDate
)
VALUES (
  1,
  'James',
  'Emma',
  'Together Forever',
  'Every moment with you fills my heart with joy. You are my greatest blessing, my love, my everything. I cannot wait to spend the rest of my life loving you more with each passing day. You make me believe in forever.',
  '["https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500", "https://images.unsplash.com/photo-1519741497674-611481863552?w=500", "https://images.unsplash.com/photo-1523438097801-512763cf6138?w=500", "https://images.unsplash.com/photo-1502078062413-8620ae50b61c?w=500", "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=500"]'::jsonb,
  '{"url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "title": "Our Love Story"}'::jsonb,
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
  '2023-02-14'
)
ON CONFLICT (id) DO UPDATE SET
  maleName = 'James',
  femaleName = 'Emma',
  tagline = 'Together Forever',
  loveMessage = 'Every moment with you fills my heart with joy. You are my greatest blessing, my love, my everything. I cannot wait to spend the rest of my life loving you more with each passing day. You make me believe in forever.',
  images = '["https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500", "https://images.unsplash.com/photo-1519741497674-611481863552?w=500", "https://images.unsplash.com/photo-1523438097801-512763cf6138?w=500", "https://images.unsplash.com/photo-1502078062413-8620ae50b61c?w=500", "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=500"]'::jsonb,
  song = '{"url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "title": "Our Love Story"}'::jsonb,
  songCover = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
  startDate = '2023-02-14',
  updatedAt = now();
