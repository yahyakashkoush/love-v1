# 🆘 حل مشكلة Bucket Not Found

## المشكلة
```
❌ Upload failed: Bucket not found
```

## السبب
الـ Buckets لم تُنشأ في Supabase Storage

---

## ✅ الحل - إنشاء الـ Buckets

### الطريقة 1️⃣: عبر Supabase Dashboard (سهلة)

1. اذهب إلى: https://supabase.com/dashboard/project/pvypwdmottanxpdmevah
2. من القائمة الجانبية: **Storage**
3. اضغط: **New Bucket**

**أنشئ الـ Bucket الأول - "songs":**
```
Name: songs
Privacy: Public
```
اضغط: Create Bucket

**أنشئ الـ Bucket الثاني - "covers":**
```
Name: covers
Privacy: Public
```
اضغط: Create Bucket

**أنشئ الـ Bucket الثالث - "images":**
```
Name: images
Privacy: Public
```
اضغط: Create Bucket

---

### الطريقة 2️⃣: عبر API (أسرع)

في Supabase SQL Editor، نفذ:

```sql
-- First, ensure the storage schema exists
-- This is usually pre-created in Supabase

-- Create buckets via storage functions
-- Note: Buckets are created via the API, not SQL directly

-- You need to create them via the Dashboard or API
-- Follow Method 1 above
```

---

## ⚠️ تأكد من:

✅ أنت داخل المشروع الصحيح (pvypwdmottanxpdmevah)
✅ عدد الـ Buckets = 3 (songs, covers, images)
✅ Privacy = Public (للقراءة العامة)

---

## بعد إنشاء الـ Buckets:

### أضف Policies:

اذهب إلى: **Storage → Policies**

اختر كل Bucket وأضف Policy:

```sql
-- Allow uploads and reads
CREATE POLICY "Allow public operations"
ON storage.objects
FOR ALL
USING (true)
WITH CHECK (true);
```

---

## ✅ الآن اختبر:

1. http://localhost:3000/admin/login
2. admin@example.com / admin123
3. Media Tab
4. اختر صورة
5. يجب أن ترى: ✅ Image uploaded successfully!

---

## 🆘 إذا مازلت تواجه مشاكل:

1. تحقق من اسم الـ Bucket (يجب أن يكون بالضبط: `songs`, `covers`, `images`)
2. تأكد من Privacy = Public
3. أضف Policies للسماح بالعمليات
4. أعد تحميل الصفحة (Cmd+Shift+R)

---

**بعد إنشاء الـ Buckets ستعمل الرفوع بشكل سليم! ✅**
