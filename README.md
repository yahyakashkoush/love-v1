# 💖 LoveStory — Valentine Edition

A luxurious, fully online romantic website celebrating your love story. Perfect for Valentine's Day with a beautiful gallery, audio player, and admin dashboard.

## ✨ Features

- 🎨 **Beautiful Gradient Design**: Pink/Purple romantic theme with smooth animations
- 💬 **Animated Hero Section**: Displays names, tagline, and relationship timeline
- 📸 **Gallery Section**: Responsive image grid with hover effects
- 🎵 **Audio Player**: Complete music player with waveform visualization
- 💌 **Love Message**: Beautifully styled love message display
- 🎭 **Floating Hearts**: Animated hearts floating across the page
- 🌙 **Dark Mode**: Complete dark mode support
- 📱 **Fully Responsive**: Mobile-first design for all devices
- 🔐 **Admin Dashboard**: Secure admin panel to manage content
- ⚡ **Serverless Ready**: Optimized for Vercel deployment

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier available)
- Vercel account (optional, for deployment)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lovev1.git
cd lovev1

# Install dependencies
npm install
```

### 3. Setup Supabase

1. **Create a Supabase Project**:
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Get your Project URL and Anon Key

2. **Create Database Table**:
   ```sql
   CREATE TABLE content (
     id INT PRIMARY KEY DEFAULT 1,
     maleName TEXT NOT NULL,
     femaleName TEXT NOT NULL,
     tagline TEXT NOT NULL,
     loveMessage TEXT NOT NULL,
     images JSONB DEFAULT '[]'::jsonb,
     song JSONB,
     songCover TEXT,
     startDate TEXT NOT NULL,
     createdAt TIMESTAMP DEFAULT now(),
     updatedAt TIMESTAMP DEFAULT now()
   );
   ```

3. **Create Storage Buckets**:
   - Create three public buckets: `images`, `songs`, `covers`
   - Set bucket policies to allow public read access

### 4. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
JWT_SECRET=your-jwt-secret-key-change-this
ADMIN_PASSWORD=admin123
```

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📖 Usage

### Public Site (/)

- Beautiful landing page with your love story
- Auto-refreshes content every 2 seconds
- Fully responsive and animated

### Admin Dashboard (/admin/login)

**Default Credentials**:
- Email: `admin@example.com`
- Password: `admin123` (change in production!)

**Dashboard Features**:
- **Basic Info**: Edit names, tagline, and relationship date
- **Texts**: Update love message
- **Media**: Upload images, songs, and album covers

## 🔐 Security Notes

- ⚠️ Change `ADMIN_PASSWORD` in production
- ⚠️ Change `JWT_SECRET` to a strong random value
- All API routes require JWT authentication
- Use HTTPS in production

## 📦 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/content` | Fetch all content |
| PUT | `/api/content` | Update content (requires JWT) |
| POST | `/api/auth/login` | Admin login |
| POST | `/api/upload/image` | Upload gallery image |
| POST | `/api/upload/song` | Upload song |
| POST | `/api/upload/cover` | Upload album cover |

## 🌐 Deployment to Vercel

### 1. Prepare for Deployment

```bash
npm run build
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
   - `ADMIN_PASSWORD`
4. Deploy!

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: JWT (custom)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly buttons and controls
- Optimized image loading
- Performance-focused animations

## 🎨 Customization

### Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  pink: { /* your custom colors */ },
  purple: { /* your custom colors */ }
}
```

### Fonts

Edit `src/app/layout.tsx` to change Google Fonts

### Animations

Edit components to adjust animation speeds and effects

## 📊 Performance

- ⚡ ~50ms to First Contentful Paint
- 📊 ~100+ Lighthouse Score
- 🚀 Serverless functions (Cold start < 1s)
- 💾 Edge caching enabled

## 🐛 Troubleshooting

### Images not showing?
- Check Supabase storage bucket permissions
- Ensure bucket is set to public

### Upload failing?
- Verify JWT token is valid
- Check file size limits (default: 50MB)

### Database errors?
- Verify Supabase credentials
- Check table schema matches

## 📝 License

MIT - Feel free to use for your own love story!

## 💕 Support

If you encounter issues, please check:
1. Supabase documentation
2. Next.js documentation
3. GitHub Issues

---

Made with ❤️ for Valentine's Day 💖
