# 🚀 حل نهائي لـ "Bucket Not Found"

## ✅ الحل الدقيق - انسخ والصق هذا الكود

في Supabase SQL Editor (https://supabase.com/dashboard/project/pvypwdmottanxpdmevah/sql/new)

انسخ هذا الكود:

```sql
-- Create Storage Buckets for LoveStory
INSERT INTO storage.buckets (id, name, public, file_size_limit, owner, created_at, updated_at)
VALUES ('songs', 'songs', true, 52428800, NULL, now(), now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, owner, created_at, updated_at)
VALUES ('covers', 'covers', true, 10485760, NULL, now(), now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, owner, created_at, updated_at)
VALUES ('images', 'images', true, 10485760, NULL, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow public insert" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update" ON storage.objects;

CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON storage.objects
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON storage.objects
FOR UPDATE USING (true) WITH CHECK (true);

-- Verify
SELECT id, name, public FROM storage.buckets 
WHERE id IN ('songs', 'covers', 'images');
```

## الخطوات:

1. ✅ انسخ الكود أعلاه
2. ✅ اذهب إلى: https://supabase.com/dashboard/project/pvypwdmottanxpdmevah/sql/new
3. ✅ الصق الكود
4. ✅ اضغط **Execute**
5. ✅ يجب أن ترى 3 صفوف في النتيجة

## بعد التنفيذ مباشرة:

```
http://localhost:3000/admin/login
admin@example.com / admin123
Media Tab
اختر صورة
رفع
```

يجب أن ترى: ✅ Image uploaded successfully!

---

## إذا حدث خطأ "policy already exists":

استخدم هذا الكود بدلاً منه:

```sql
-- Create buckets only
INSERT INTO storage.buckets (id, name, public, file_size_limit, owner, created_at, updated_at)
VALUES 
  ('songs', 'songs', true, 52428800, NULL, now(), now()),
  ('covers', 'covers', true, 10485760, NULL, now(), now()),
  ('images', 'images', true, 10485760, NULL, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT id, name, public FROM storage.buckets 
WHERE id IN ('songs', 'covers', 'images');
```

---

**الآن الرفع يجب أن يعمل بشكل تام! 🎉**
