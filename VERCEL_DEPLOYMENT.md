# 🚀 نشر الموقع على Vercel

## الخطوات السريعة:

### 1️⃣ الذهاب إلى Vercel
- افتح: https://vercel.com
- سجل دخول بحساب GitHub

### 2️⃣ إنشاء مشروع جديد
- انقر على **"Add New Project"**
- اختر **"Import Git Repository"**
- ابحث عن: `yahyakashkoush/love-v1`
- انقر **"Import"**

### 3️⃣ إعدادات المشروع
Vercel سيكتشف Next.js تلقائياً، لا تغير شيء في:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4️⃣ إضافة Environment Variables
انقر على **"Environment Variables"** وأضف:

```bash
NEXT_PUBLIC_SUPABASE_URL
https://pvypwdmottanxpdmevah.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eXB3ZG1vdHRhbnhwZG1ldmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDk1NDksImV4cCI6MjA3NzU4NTU0OX0.DwTQMHsPgagsSyJg2cCoFcCdF4d3ZDxpLWlH1OUb0Ig

SUPABASE_SERVICE_ROLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eXB3ZG1vdHRhbnhwZG1ldmFoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjAwOTU0OSwiZXhwIjoyMDc3NTg1NTQ5fQ.mSzHsEe-SHG8_zQzQFN8cGt6dKJ-_9yE7GuFdCQvSQ4

JWT_SECRET
lovestorey-secret-key-2024-valentine-edition-12345

ADMIN_PASSWORD
admin123
```

**ملاحظة**: اختر **"All Environments"** (Production, Preview, Development)

### 5️⃣ النشر
- انقر على **"Deploy"**
- انتظر 2-3 دقائق
- ✅ تم! 🎉

---

## 🔐 معلومات الدخول:

### Splash Screen:
```
Password: love@123
```

### Admin Panel:
```
URL: https://your-domain.vercel.app/admin/login
Email: admin@example.com
Password: admin123
```

---

## 📊 بعد النشر:

### ✅ التحقق من الموقع:
1. افتح الرابط الذي أعطاك Vercel
2. جرب دخول Splash Screen بـ `love@123`
3. جرب Admin Panel
4. تأكد من الصور والأغنية تعمل

### 🔄 التحديثات المستقبلية:
كل ما تعمل `git push` على GitHub، Vercel سيحدث الموقع تلقائياً!

---

## 🎨 الميزات المنشورة:

✅ Splash Screen مع Password
✅ Hero Section مع العداد
✅ Gallery مع Carousel
✅ Audio Player
✅ Love Message
✅ Admin Panel
✅ Floating Hearts
✅ Dark Mode
✅ Responsive Design

---

## 🆘 في حالة وجود مشاكل:

### Build Failed?
- تحقق من Environment Variables
- تأكد أن جميع المتغيرات مكتوبة بشكل صحيح

### Database Connection Error?
- تحقق من Supabase URL و Keys
- تأكد أن الجدول `content` موجود

### Images/Audio Not Loading?
- تحقق من Supabase Storage Buckets
- تأكد أن Policies مفعلة (public read)

---

## 🎉 مبروك!

موقعك الآن على الإنترنت! 💕✨

**GitHub**: https://github.com/yahyakashkoush/love-v1
**Vercel**: https://your-domain.vercel.app

---

*Created with ❤️ for Valentine's Day*

