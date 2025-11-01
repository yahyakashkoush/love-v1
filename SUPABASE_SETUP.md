# 🗄️ Supabase Setup Instructions

Your Supabase project is now connected! Follow these steps to complete the setup.

## ✅ Step 1: Create Database Table

1. Go to: https://app.supabase.com
2. Select your project: **pvypwdmottanxpdmevah**
3. Click **SQL Editor** on the left sidebar
4. Click **New Query**
5. Paste this SQL and click **Run**:

```sql
CREATE TABLE IF NOT EXISTS content (
  id BIGINT PRIMARY KEY DEFAULT 1,
  maleName TEXT NOT NULL DEFAULT 'Ahmed',
  femaleName TEXT NOT NULL DEFAULT 'Fatima',
  tagline TEXT NOT NULL DEFAULT 'Our Love Story',
  loveMessage TEXT NOT NULL DEFAULT 'Every moment with you is a treasure...',
  images JSONB DEFAULT '[]'::jsonb,
  song JSONB DEFAULT NULL,
  songCover TEXT DEFAULT NULL,
  startDate TEXT NOT NULL DEFAULT '2024-01-01',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default row
INSERT INTO content (id) VALUES (1) ON CONFLICT DO NOTHING;

-- Enable Row Level Security (optional)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Enable read access for all users" ON content
FOR SELECT USING (true);
```

✅ **Expected Result**: Query executed successfully

---

## ✅ Step 2: Create Storage Buckets

1. In Supabase, click **Storage** in the left sidebar
2. Click **Create a new bucket**

**Create 3 buckets:**

### Bucket 1: images
- Name: `images`
- Uncheck "Private bucket"
- Click **Create bucket**

### Bucket 2: songs
- Name: `songs`
- Uncheck "Private bucket"
- Click **Create bucket**

### Bucket 3: covers
- Name: `covers`
- Uncheck "Private bucket"
- Click **Create bucket**

✅ **Expected Result**: 3 public buckets created

---

## ✅ Step 3: Get Service Role Key

1. Go to **Settings** → **API** (in Supabase)
2. Find **Service Role Key** (labeled as "secret" key)
3. Copy it
4. Open `.env.local` in your project
5. Replace `SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here` with your key
6. Save the file

---

## ✅ Step 4: Verify Connection

Run this command:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

**Check these:**
- [ ] Page loads without errors
- [ ] Names display (Ahmed & Fatima by default)
- [ ] No red errors in browser console
- [ ] Can access admin login at /admin/login

---

## 🔒 Set Storage Policies (Optional but Recommended)

1. In Supabase, go to **Storage** → **Policies**
2. For each bucket (images, songs, covers), add these policies:

**For public read access:**
```sql
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'images' OR bucket_id = 'songs' OR bucket_id = 'covers');
```

**For authenticated uploads:**
```sql
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' OR bucket_id = 'songs' OR bucket_id = 'covers');
```

---

## ✨ You're All Set!

Your Supabase is now connected and ready!

**Next steps:**
1. ✅ Tables created
2. ✅ Buckets created
3. 👉 **Run the app**: `npm run dev`
4. 👉 **Test admin**: http://localhost:3000/admin/login
5. 👉 **Deploy**: Follow DEPLOYMENT.md

---

## 🆘 Troubleshooting

### "Connection refused"
- Check `.env.local` has correct Supabase URL
- Verify internet connection

### "Table doesn't exist"
- Run the SQL table creation query again
- Check the query executed without errors

### "Storage bucket not found"
- Create all 3 buckets (images, songs, covers)
- Make sure they are PUBLIC

### "Can't upload files"
- Verify bucket policies are set
- Check bucket is PUBLIC

---

## 📞 Need Help?

- Supabase Docs: https://supabase.com/docs
- Check HEALTH_CHECK.md for more tests

---

**Made with ❤️ for Valentine's Day 💖**
