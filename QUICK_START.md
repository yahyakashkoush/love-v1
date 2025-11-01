# ⚡ LoveStory — Quick Start Guide

Welcome! This is your complete romantic website. Let's get it running in 5 minutes! 💖

## 🎯 What You're Getting

✅ Beautiful, fully animated romantic website
✅ Admin dashboard to manage content
✅ Gallery, music player, love message
✅ Dark mode support
✅ Ready to deploy on Vercel
✅ No database setup needed (Supabase handles it)

## 🚀 5-Minute Setup

### 1. Create Supabase Project (2 min)

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Name it `lovev1`
4. Set a strong password
5. Wait for it to create
6. Go to Settings → API → Copy your **Project URL** and **Anon Key**

### 2. Create Database Table (1 min)

In Supabase, go to SQL Editor and paste this:

```sql
CREATE TABLE content (
  id BIGINT PRIMARY KEY DEFAULT 1,
  maleName TEXT DEFAULT 'Ahmed',
  femaleName TEXT DEFAULT 'Fatima',
  tagline TEXT DEFAULT 'Our Love Story',
  loveMessage TEXT DEFAULT 'Every moment with you is a treasure...',
  images JSONB DEFAULT '[]'::jsonb,
  song JSONB DEFAULT NULL,
  songCover TEXT DEFAULT NULL,
  startDate TEXT DEFAULT '2024-01-01',
  createdAt TIMESTAMP DEFAULT now(),
  updatedAt TIMESTAMP DEFAULT now()
);

INSERT INTO content (id) VALUES (1) ON CONFLICT DO NOTHING;
```

Click Run!

### 3. Create Storage Buckets (1 min)

In Supabase, go to Storage:

1. Create 3 buckets: `images`, `songs`, `covers`
2. Make them all **Public**

### 4. Update Environment Variables (1 min)

Open `.env.local` in the project folder:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=change-this-to-something-random-123456789
ADMIN_PASSWORD=admin123
```

Replace the values with yours from Supabase.

### 5. Run It!

```bash
npm run dev
```

Visit http://localhost:3000 ✨

## 🔐 Admin Dashboard

**URL**: http://localhost:3000/admin/login

**Credentials**:
- Email: `admin@example.com`
- Password: `admin123` (from `.env.local`)

### Update Your Story:

1. **Basic Info** tab → Change names, date, tagline
2. **Texts** tab → Write your love message
3. **Media** tab → Upload photos, music, cover art
4. Return to home to see updates!

## 📸 What to Upload

- **Images**: Your couple photos
- **Song**: Your special song (MP3, WAV)
- **Cover**: Album cover art

## 🌐 Deploy to Vercel

Once everything works locally:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Add same environment variables
   - Click Deploy!

Done! Your site is live! 🎉

## 💡 Tips

### Customize Colors
Edit `tailwind.config.ts` to change pink/purple theme

### Add Custom Domain
In Vercel, go to Settings → Domains → Add your domain

### Auto-Update Content
Homepage refreshes every 2 seconds from database

### Secure Admin Area
JWT tokens protect the admin dashboard

## 🆘 Common Issues

**Issue**: Images not showing
- Solution: Make sure Supabase storage buckets are **Public**

**Issue**: Login failing
- Solution: Check `ADMIN_PASSWORD` in `.env.local`

**Issue**: Upload fails
- Solution: Check JWT token validity and bucket permissions

**Issue**: Supabase connection error
- Solution: Verify `NEXT_PUBLIC_SUPABASE_URL` is correct

## 📁 Important Files

| File | What to Edit |
|------|-------------|
| `.env.local` | Environment variables |
| `tailwind.config.ts` | Colors and theme |
| `src/app/page.tsx` | Homepage content |
| `src/app/admin/dashboard/page.tsx` | Admin page |

## 🎨 Customization Ideas

- [ ] Change colors to match your theme
- [ ] Add more fields (anniversary story, photos, etc.)
- [ ] Customize welcome message
- [ ] Add countdown timer
- [ ] Create social media links

## 📚 Full Documentation

- **README.md** - Complete feature list
- **SETUP_GUIDE.md** - Detailed setup with screenshots
- **DEPLOYMENT.md** - Production deployment checklist
- **PROJECT_STRUCTURE.md** - Code architecture

## 🎯 Next Steps

1. ✅ Setup Supabase
2. ✅ Run locally
3. ✅ Test admin dashboard
4. ✅ Upload photos
5. ✅ Deploy to Vercel
6. ✅ Share with your loved one! 💕

---

## ❓ Questions?

- Check the detailed guides above
- Review Supabase docs: https://supabase.com/docs
- Check Next.js docs: https://nextjs.org/docs

---

**Made with ❤️ for Valentine's Day 💖**

Give it a star! ⭐
