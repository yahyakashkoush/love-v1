# ⚡ Setup Database RIGHT NOW (3 Steps)

Let's get your database working in 2 minutes!

---

## 🎯 Step 1: Create Table & Add Data

**Open this link in your browser:**
https://app.supabase.com/project/pvypwdmottanxpdmevah/sql/new

**Copy this SQL (العربي مدعوم ✅):**

```sql
-- Create table
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

-- Insert test data (بيانات تجريبية عربي)
INSERT INTO content (id, maleName, femaleName, tagline, loveMessage, startDate)
VALUES (
  1,
  'محمد',
  'فاطمة',
  'قصتنا الجميلة 💕',
  'كل لحظة معك هي كنز لا يُقدّر بثمن. أحبك أكثر مع كل يوم يمر! ❤️',
  '2023-02-14'
)
ON CONFLICT (id) DO UPDATE SET 
  maleName = 'محمد',
  femaleName = 'فاطمة',
  tagline = 'قصتنا الجميلة 💕',
  loveMessage = 'كل لحظة معك هي كنز لا يُقدّر بثمن. أحبك أكثر مع كل يوم يمر! ❤️',
  startDate = '2023-02-14',
  updatedAt = now();
```

**Then:**
1. Click the green **"Run"** button
2. Wait for "Query completed successfully"
3. ✅ **Done!**

---

## 📦 Step 2: Create Storage Buckets

**In Supabase:**
1. Click **Storage** on left sidebar
2. Click **Create a new bucket**

**Create 3 buckets (IMPORTANT: Uncheck "Private bucket"):**

| Name | Private? |
|------|----------|
| images | ❌ NO |
| songs | ❌ NO |
| covers | ❌ NO |

✅ **Done!**

---

## 🧪 Step 3: Test It!

Run in terminal:
```bash
curl http://localhost:3000/api/content
```

**You should see:**
```json
{
  "id": 1,
  "maleName": "محمد",
  "femaleName": "فاطمة",
  "tagline": "قصتنا الجميلة 💕",
  "loveMessage": "كل لحظة معك هي كنز...",
  "startDate": "2023-02-14",
  ...
}
```

**If yes ✅ → YOU'RE CONNECTED!**

---

## 🌐 Then Check Your Website

Visit: http://localhost:3000

**You should see:**
- ✅ Names: محمد & فاطمة
- ✅ Tagline: قصتنا الجميلة 💕
- ✅ Message: كل لحظة معك...
- ✅ Date: February 14, 2023
- ✅ Days counter: XXX days of happiness
- ✅ Floating hearts animation
- ✅ Dark mode toggle

---

## 🔐 Test Admin Dashboard

Go to: http://localhost:3000/admin/login

Login:
- Email: `admin@example.com`
- Password: `admin123`

You should see your data in the forms! ✅

---

## ❌ If It's Not Working

### API returns null/error?
- Check the SQL query ran successfully in Supabase
- Wait 5 seconds and try again
- Check `.env.local` has the right Supabase URL

### Website shows default names instead of your names?
- The SQL query didn't run properly
- Go back to Supabase SQL Editor
- Run the query again

### Can't login?
- Email must be: `admin@example.com` (exact)
- Password must be: `admin123` (exact)
- Clear browser cache (Ctrl+Shift+Delete)

### Login works but no data shows?
- The database query failed
- Try running the SQL again
- Check table was created: Go to Supabase → Data Editor → See "content" table?

---

## 🎉 Success Indicators

✅ Everything is working if:

1. **API Test**
   ```bash
   curl http://localhost:3000/api/content
   ```
   Returns JSON with your data (محمد, فاطمة, etc.)

2. **Website**
   - Shows your names
   - Shows your tagline
   - Shows your message
   - No console errors (F12)

3. **Admin Dashboard**
   - Can login
   - Can see your data
   - Can edit and save

---

## ⏱️ Timeline

- Step 1 (SQL): 1 minute
- Step 2 (Buckets): 2 minutes  
- Step 3 (Test): 1 minute
- **Total: 4 minutes!**

---

## 🚀 Next After This Works

1. ✅ Database setup
2. → Upload your real photos
3. → Upload your favorite song
4. → Personalize the message
5. → Deploy to Vercel

---

**Let's go! Follow the 3 steps above now! 💖**

Made with ❤️ for Valentine's Day 💖
