# 🚀 LoveStory Setup Guide

## Step-by-Step Setup Instructions

### 1️⃣ Initial Setup

```bash
# Navigate to project
cd /Users/yahyaemad/Desktop/lovev1

# Install dependencies (already done ✓)
npm install

# Verify Node version (18+)
node --version
```

### 2️⃣ Create Supabase Project

#### Option A: Using Supabase Dashboard

1. Go to [Supabase Console](https://app.supabase.com)
2. Click "New Project"
3. Fill in details:
   - Name: `lovev1`
   - Database Password: (strong password)
   - Region: Closest to you
4. Wait for project creation (~2 min)

#### Option B: Using Supabase CLI

```bash
npx supabase link
# Follow the prompts to create project
```

### 3️⃣ Create Database Schema

**Go to SQL Editor in Supabase and run:**

```sql
-- Create content table
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
INSERT INTO content (id, maleName, femaleName, tagline, loveMessage, startDate)
VALUES (1, 'Ahmed', 'Fatima', 'Our Love Story', 'Every moment with you is a treasure...', '2024-01-01')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (Optional but recommended)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policy for public read
CREATE POLICY "Enable read access for all users" ON content
FOR SELECT USING (true);
```

### 4️⃣ Create Storage Buckets

In Supabase Storage Tab:

1. **Create Bucket: `images`**
   - Make it Public
   - Click Create

2. **Create Bucket: `songs`**
   - Make it Public
   - Click Create

3. **Create Bucket: `covers`**
   - Make it Public
   - Click Create

4. **Set Bucket Policies** (for each bucket):

Go to Bucket Settings → Policies → Click "New Policy"

```sql
-- Allow public read
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'images' OR bucket_id = 'songs' OR bucket_id = 'covers');

-- Allow authenticated upload
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' OR bucket_id = 'songs' OR bucket_id = 'covers');
```

### 5️⃣ Get Your API Keys

In Supabase Settings:

1. Go to **Settings → API**
2. Copy these values:

```
Project URL: https://xxxxx.supabase.co
Anon Key: eyJhbGc...
Service Role Key: eyJhbGc...
```

### 6️⃣ Configure Environment Variables

**Create/Update `.env.local`:**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Auth
JWT_SECRET=your-very-long-random-secret-key-min-32-chars
ADMIN_PASSWORD=admin123

# For production, change these!
# Generate JWT_SECRET: openssl rand -base64 32
```

### 7️⃣ Run Local Development

```bash
npm run dev
```

Visit:
- **Public Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login
- **Login Credentials**:
  - Email: `admin@example.com`
  - Password: `admin123`

### 8️⃣ Test the Application

1. Go to dashboard at `/admin/login`
2. Login with demo credentials
3. Update names in "Basic Info" tab
4. Add love message in "Texts" tab
5. Upload images in "Media" tab
6. Return to homepage to see changes

## 🔒 Security Checklist

Before Deploying to Production:

- [ ] Change `ADMIN_PASSWORD` to something strong
- [ ] Generate new `JWT_SECRET` (32+ chars)
- [ ] Configure Supabase RLS policies
- [ ] Enable HTTPS
- [ ] Use environment variables for sensitive data
- [ ] Test all upload endpoints
- [ ] Verify storage bucket permissions
- [ ] Review admin login flow

## 📤 Deployment to Vercel

### 1. Initialize Git Repository

```bash
cd /Users/yahyaemad/Desktop/lovev1
git init
git add .
git commit -m "Initial LoveStory commit"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create repository: `lovev1`
3. Follow instructions to push code:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lovev1.git
git push -u origin main
```

### 3. Deploy on Vercel

1. Go to [Vercel](https://vercel.com/import)
2. Click "Import Project"
3. Select your GitHub repository
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
   - `ADMIN_PASSWORD`
5. Click Deploy

### 4. Add Custom Domain (Optional)

1. In Vercel Project Settings
2. Go to Domains
3. Add your domain
4. Follow DNS setup instructions

## 🧪 Testing Checklist

- [ ] **Public Site**:
  - [ ] Page loads without errors
  - [ ] Names display correctly
  - [ ] Floating hearts animate
  - [ ] Gallery displays images
  - [ ] Audio player works
  - [ ] Love message shows
  - [ ] Dark mode works
  - [ ] Mobile responsive

- [ ] **Admin Dashboard**:
  - [ ] Login works
  - [ ] Can update names
  - [ ] Can update messages
  - [ ] Image upload works
  - [ ] Song upload works
  - [ ] Cover upload works
  - [ ] Logout works

- [ ] **API Endpoints**:
  - [ ] GET /api/content returns data
  - [ ] PUT /api/content updates data
  - [ ] POST /api/auth/login returns token
  - [ ] Upload endpoints work with JWT

## 📝 Environment Variable Format

### Development (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your-secret-key-at-least-32-characters-long
ADMIN_PASSWORD=admin123
```

### Production (Vercel)

Add same variables in:
Vercel Dashboard → Project Settings → Environment Variables

## 🆘 Common Issues & Solutions

### Issue: "Cannot find module '@supabase/supabase-js'"
**Solution**: Run `npm install`

### Issue: "Supabase connection failed"
**Solution**:
- Check `NEXT_PUBLIC_SUPABASE_URL` format
- Verify project is running in Supabase
- Check network connection

### Issue: "JWT token invalid"
**Solution**:
- Ensure `JWT_SECRET` is set in `.env.local`
- Clear browser localStorage
- Login again

### Issue: "Upload fails with 403"
**Solution**:
- Check storage bucket is public
- Verify Supabase policies
- Check file size limits

### Issue: "Images not loading"
**Solution**:
- Check bucket name in storage
- Verify bucket is public
- Check CORS settings in Supabase

## 📞 Support Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🎉 Next Steps

After setup:
1. Customize colors in `tailwind.config.ts`
2. Update branding and text
3. Add your own images and song
4. Deploy to Vercel
5. Share with your loved one! 💕

---

Made with ❤️ for Valentine's Day 💖
