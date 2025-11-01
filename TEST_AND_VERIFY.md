# ✅ Test & Verify Your Setup

This guide will help you add test data and verify everything is working correctly!

---

## 🗄️ Step 1: Add Test Data to Supabase

### Go to Supabase and create the table:

1. Open: https://app.supabase.com
2. Select project: **pvypwdmottanxpdmevah**
3. Click **SQL Editor**
4. Click **New Query**
5. **Copy and paste this SQL**, then click **Run**:

```sql
-- Create the table
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

-- Insert test data
INSERT INTO content (id, maleName, femaleName, tagline, loveMessage, startDate)
VALUES (
  1,
  'محمد',
  'فاطمة',
  'قصتنا الجميلة',
  'كل لحظة معك هي كنز لا يُقدّر بثمن. أحبك أكثر مع كل يوم يمر! ❤️',
  '2023-02-14'
)
ON CONFLICT (id) DO UPDATE SET 
  maleName = 'محمد',
  femaleName = 'فاطمة',
  tagline = 'قصتنا الجميلة',
  loveMessage = 'كل لحظة معك هي كنز لا يُقدّر بثمن. أحبك أكثر مع كل يوم يمر! ❤️',
  startDate = '2023-02-14',
  updatedAt = now();
```

✅ **Expected Result**: Query completed successfully

---

## 📦 Step 2: Create Storage Buckets

1. In Supabase, click **Storage**
2. Click **Create a new bucket**
3. Create these 3 buckets (ALL MUST BE PUBLIC):

**Bucket 1: images**
- Name: `images`
- Uncheck "Private bucket" ✓
- Click Create

**Bucket 2: songs**
- Name: `songs`  
- Uncheck "Private bucket" ✓
- Click Create

**Bucket 3: covers**
- Name: `covers`
- Uncheck "Private bucket" ✓
- Click Create

✅ **You should have 3 public buckets now**

---

## 🧪 Step 3: Test API Connection

Run these curl commands in your terminal:

```bash
# Test 1: Get content from database
curl http://localhost:3000/api/content

# Expected output should show your data:
# {
#   "id": 1,
#   "maleName": "محمد",
#   "femaleName": "فاطمة",
#   "tagline": "قصتنا الجميلة",
#   ...
# }
```

If you see your data printed, the database is connected! ✅

---

## 🌐 Step 4: Verify Frontend Display

1. Open: http://localhost:3000
2. **Check these:**

- [ ] Page loads without errors
- [ ] Your names appear (محمد & فاطمة)
- [ ] Tagline shows (قصتنا الجميلة)
- [ ] Love message displays (the Arabic text)
- [ ] Date shows as "February 14, 2023"
- [ ] Days counter appears (e.g., "XXX days of happiness")
- [ ] Floating hearts animate
- [ ] Dark mode toggle works
- [ ] No red errors in browser console (F12)

**If all checked ✅ → Your database is connected!**

---

## 🔐 Step 5: Test Admin Dashboard

1. Go to: http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`

3. **Check these:**
   - [ ] Login page loads
   - [ ] Can click username/password fields
   - [ ] Login button is clickable
   - [ ] No errors when clicking login
   - [ ] Dashboard loads after login
   - [ ] Can see your data in the form fields
   - [ ] Can edit fields
   - [ ] Can submit the form

**If all work ✅ → Admin dashboard is connected!**

---

## 🔄 Step 6: Test Real-time Updates

1. On admin dashboard, change the name:
   - In "His Name" field, change to: `علي`
   - Click "Save Changes"

2. Wait a few seconds, then:
   - Go back to home page: http://localhost:3000
   - Refresh the page (F5)
   - **Check:** Does the name change to `علي`?

**If yes ✅ → Real-time sync works!**

---

## 📋 Troubleshooting Checklist

### "API returns null or error"
```bash
# Check if table exists
curl http://localhost:3000/api/content
```
- If error: Go to Supabase SQL Editor and run the CREATE TABLE query again
- Make sure query says "success"

### "Page loads but no data shows"
- Check browser console (F12) for errors
- Check `.env.local` has correct Supabase URL
- Verify table was created in SQL Editor

### "Login fails"
- Check email is exactly: `admin@example.com`
- Check password is exactly: `admin123` (from `.env.local`)
- Clear browser cache (Ctrl+Shift+Delete)

### "Can't update data"
- Make sure you're logged in
- Check token is valid (should be auto-stored)
- Try logging out and back in

### "Images/Songs won't upload"
- Check buckets are PUBLIC (not private)
- Go to Supabase Storage → Check each bucket settings
- Verify Service Role Key is set in `.env.local`

---

## ✨ Success Criteria

Your setup is working if:

✅ Database table created
✅ Test data inserted
✅ Storage buckets created (3 public buckets)
✅ API returns data
✅ Homepage displays names & message
✅ Admin dashboard loads & displays data
✅ Can login & edit data
✅ Changes sync to homepage
✅ No errors in console

---

## 🎉 You're All Set!

When everything passes, you're ready to:
1. Add real photos
2. Add your favorite song
3. Personalize the message
4. Deploy to Vercel!

---

## 📞 Still Having Issues?

1. **Check logs**: Browser F12 → Console tab
2. **Check Supabase**: Go to SQL Editor → Run test query
3. **Read SUPABASE_SETUP.md**: More detailed instructions
4. **Check HEALTH_CHECK.md**: More tests to run

---

**Next Step**: Run the tests above and let me know if everything passes! ✅

Made with ❤️ for Valentine's Day 💖
