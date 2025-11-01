# 🚀 Your Next Steps (5 Minutes!)

Your Supabase project is connected! Follow these **3 simple steps** to complete setup.

---

## 📋 Step 1: Setup Database (2 min)

1. Go to: **https://app.supabase.com/projects**
2. Open your project: **pvypwdmottanxpdmevah**
3. Click **SQL Editor** on left sidebar
4. Click **New Query** button
5. Copy-paste the SQL from **SUPABASE_SETUP.md**
6. Click **Run** (green button)

✅ Done! Your table is created.

---

## 📦 Step 2: Create Storage Buckets (2 min)

1. In Supabase, click **Storage** on left sidebar
2. Click **Create a new bucket**
3. Create these 3 buckets (all PUBLIC):
   - `images`
   - `songs`
   - `covers`

✅ Done! Your storage is ready.

---

## 🔑 Step 3: Update Service Role Key (1 min)

1. In Supabase: **Settings** → **API**
2. Copy the **Service Role Key** (the secret one)
3. Open your project's `.env.local` file
4. Find: `SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here`
5. Replace with your copied key
6. Save the file

✅ Done! You're connected!

---

## ✨ Test It!

Run your app:
```bash
npm run dev
```

Visit:
- **Public Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login
  - Email: `admin@example.com`
  - Password: `admin123`

---

## 🎉 Ready to Deploy?

When everything works locally, follow **DEPLOYMENT.md** to launch on Vercel!

---

**Questions?** Check **SUPABASE_SETUP.md** for detailed instructions.

Made with ❤️ for Valentine's Day 💖
