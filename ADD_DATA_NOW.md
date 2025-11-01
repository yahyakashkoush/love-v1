# ⚡ Add Sample Data RIGHT NOW (30 Seconds!)

## 🎯 Quick Steps

1. **Open this link in your browser:**
   https://app.supabase.com/project/pvypwdmottanxpdmevah/sql/new

2. **Copy ALL the SQL from this file:**
   `CREATE_DATABASE.sql` (in your project folder)

3. **Paste it into Supabase SQL Editor**

4. **Click the green "Run" button**

5. **Wait for: "Query executed successfully"**

6. **Then refresh your website:**
   http://localhost:3000

---

## ✅ What Will Happen

After running the SQL, you'll see:

✅ Names: **James & Emma**
✅ Tagline: **Together Forever**
✅ Love Message: Beautiful romantic text
✅ **5 Sample Images** from Unsplash (couples)
✅ **Sample Song** with waveform player
✅ **Album Cover** image
✅ Date: February 14, 2023
✅ Floating hearts animation
✅ Everything working! 🎉

---

## 📋 The SQL Code

Copy this entire SQL:

```sql
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
);
```

---

## 🧪 Then Test It

### Test 1: API
```bash
curl http://localhost:3000/api/content
```

Should return JSON with James & Emma ✅

### Test 2: Website
Go to: http://localhost:3000

Should show:
- ✅ James & Emma
- ✅ Together Forever
- ✅ Love message
- ✅ 5 couple photos
- ✅ Music player with song
- ✅ Album cover
- ✅ Floating hearts
- ✅ Dark mode toggle

### Test 3: Admin Dashboard
Go to: http://localhost:3000/admin/login

Login:
- Email: `admin@example.com`
- Password: `admin123`

Should show all your data! ✅

---

## ⏱️ Timeline

- **30 seconds**: Copy & run SQL
- **5 seconds**: Wait for confirmation
- **5 seconds**: Refresh website
- **Total: 40 seconds!**

---

## ❌ If Something Goes Wrong

**"Query failed"?**
→ Copy the SQL again carefully
→ Make sure you're in SQL Editor

**"Still loading"?**
→ The SQL might not have run
→ Check Supabase → Data Editor → See "content" table?

**"No data showing"?**
→ Close browser completely
→ Clear cache (Ctrl+Shift+Delete)
→ Open http://localhost:3000 again

---

## 🎉 Success!

When you see James & Emma with photos and music playing, you're done! 

**Next: Customize with your own photos and song!**

Made with ❤️ for Valentine's Day 💖
