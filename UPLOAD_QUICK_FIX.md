# ⚡ حل سريع لمشاكل الرفع (3 دقائق فقط!)

## 🔴 المشاكل
```
Failed to upload song
Failed to upload cover
Failed to upload image
```

## ✅ الحل السريع

### 1️⃣ في Supabase Dashboard (1 دقيقة)

اذهب إلى: https://supabase.com/dashboard/project/pvypwdmottanxpdmevah/sql/new

انسخ والصق هذا الكود:

```sql
CREATE POLICY "Allow all storage uploads"
ON storage.objects
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
USING (true);
```

اضغط **Execute** ✅

### 2️⃣ اختبر الرفع (2 دقيقة)

1. اذهب إلى: http://localhost:3000/admin/login
2. سجّل دخول: `admin@example.com` / `admin123`
3. انتقل إلى **Media Tab**
4. اختر صورة وحاول رفعها
5. يجب أن ترى: `✅ Image uploaded successfully!`

---

## إذا لم تنجح الخطوات البسيطة:

### استخدم الطريقة اليدوية في Dashboard

1. اذهب إلى Supabase Storage
2. انقر على folder `songs`
3. انقر على **Policies** (في الأعلى)
4. انقر **New Policy**
5. اختر **For full customization**
6. اكتب:
   ```
   Name: Allow uploads
   SQL: true
   ```
7. اضغط **Save**

كرر للـ `covers` و `images`

---

## 📝 ملاحظات

- التغييرات في الكود تم تطبيقها ✅
- الخادم جاهز ✅
- فقط ننتظر تفعيل Supabase Policies 🔑

---

## 🆘 إذا مازال لا يعمل

1. تحقق من الإنترنت
2. أعد تحميل الصفحة (Cmd+Shift+R)
3. سجّل دخول مرة أخرى
4. افتح DevTools (F12) وشاهد الأخطاء الفعلية

---

**الآن يجب أن يعمل! 🎉**
