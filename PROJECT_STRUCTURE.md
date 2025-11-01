# 📁 LoveStory Project Structure

```
lovev1/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with theme provider
│   │   ├── page.tsx                # Home page (public site)
│   │   ├── globals.css             # Global styles
│   │   ├── api/
│   │   │   ├── content/
│   │   │   │   └── route.ts        # GET/PUT content endpoints
│   │   │   ├── auth/
│   │   │   │   └── login/
│   │   │   │       └── route.ts    # Login endpoint
│   │   │   └── upload/
│   │   │       ├── image/
│   │   │       │   └── route.ts    # Image upload
│   │   │       ├── song/
│   │   │       │   └── route.ts    # Song upload
│   │   │       └── cover/
│   │   │           └── route.ts    # Cover upload
│   │   └── admin/
│   │       ├── login/
│   │       │   └── page.tsx        # Admin login page
│   │       └── dashboard/
│   │           └── page.tsx        # Admin dashboard
│   │
│   ├── components/
│   │   ├── FloatingHearts.tsx      # Animated floating hearts
│   │   ├── HeroSection.tsx         # Hero section component
│   │   ├── GallerySection.tsx      # Gallery grid
│   │   ├── AudioPlayer.tsx         # Music player
│   │   ├── LoveMessage.tsx         # Message display
│   │   ├── Footer.tsx              # Footer with theme toggle
│   │   ├── ThemeProvider.tsx       # Theme provider wrapper
│   │   └── admin/
│   │       ├── DashboardTabs.tsx   # Dashboard tabs
│   │       └── tabs/
│   │           ├── BasicInfoTab.tsx      # Names & dates
│   │           ├── TextsTab.tsx          # Messages
│   │           └── MediaTab.tsx          # File uploads
│   │
│   └── lib/
│       ├── supabase.ts             # Supabase client setup
│       ├── auth.ts                 # JWT utilities
│       └── db.ts                   # Database queries
│
├── public/
│   └── robots.txt                  # SEO robots file
│
├── .env.local                      # Environment variables (NOT committed)
├── .gitignore                      # Git ignore rules
├── .eslintrc.json                  # ESLint config
├── tailwind.config.ts              # Tailwind CSS config
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── package.json                    # Dependencies
├── package-lock.json               # Lock file
├── README.md                       # Main documentation
├── SETUP_GUIDE.md                  # Detailed setup instructions
├── DEPLOYMENT.md                   # Deployment checklist
└── PROJECT_STRUCTURE.md            # This file
```

## 📦 Key Directories Explained

### `/src/app`
- **Entry point** for Next.js 15 App Router
- Contains page components and API routes
- Organized by feature/domain

### `/src/components`
- Reusable UI components
- Split into public and admin sections
- All use client-side rendering where needed

### `/src/lib`
- Utility functions and external service integrations
- Database queries
- Authentication logic
- Configuration

### `/public`
- Static files served directly
- SEO files (robots.txt, sitemap.xml)
- Public images/assets

## 🔧 Technology Stack

```
Frontend:
├── Next.js 15          # React framework
├── React 19            # UI library
├── TypeScript          # Type safety
├── TailwindCSS         # Styling
├── Framer Motion       # Animations
└── Lucide React        # Icons

Backend:
├── Next.js API Routes  # Serverless functions
├── JWT                 # Authentication
└── TypeScript          # Type safety

Database & Storage:
├── Supabase            # PostgreSQL
├── Supabase Storage    # File storage
└── HTTP APIs           # REST endpoints

Deployment:
├── Vercel              # Hosting
├── GitHub              # Version control
└── Edge Functions      # Serverless compute
```

## 📊 Component Hierarchy

```
App (layout.tsx)
├── Providers (ThemeProvider)
│   └── Home Page (page.tsx)
│       ├── FloatingHearts
│       ├── HeroSection
│       ├── GallerySection
│       ├── AudioPlayer
│       ├── LoveMessage
│       └── Footer
│
└── Admin Routes
    ├── Login Page
    │   └── Login Form
    └── Dashboard
        └── DashboardTabs
            ├── BasicInfoTab
            ├── TextsTab
            └── MediaTab
```

## 🔄 Data Flow

```
Public Site:
1. Page.tsx fetches from /api/content (GET)
2. Updates every 2 seconds
3. Displays hero, gallery, player, message
4. User sees updates in real-time

Admin Dashboard:
1. Login → /api/auth/login → JWT token
2. Token stored in localStorage
3. Update forms → /api/content (PUT with JWT)
4. Upload files → /api/upload/* (with JWT)
5. Files stored in Supabase Storage
6. Public site fetches and displays updates
```

## 🗄️ Database Schema

```sql
content table:
├── id (PK): Integer (1)
├── maleName: Text
├── femaleName: Text
├── tagline: Text
├── loveMessage: Text
├── images: JSON Array
├── song: JSON Object {url, title}
├── songCover: Text (URL)
├── startDate: Text (ISO date)
├── createdAt: Timestamp
└── updatedAt: Timestamp

Storage Buckets:
├── images/       (Gallery images)
├── songs/        (Audio files)
└── covers/       (Album art)
```

## 🔐 API Endpoints

```
Public Endpoints:
GET  /api/content                    # Fetch content

Admin Protected Endpoints (require JWT):
PUT  /api/content                    # Update content
POST /api/upload/image               # Upload image
POST /api/upload/song                # Upload song
POST /api/upload/cover               # Upload cover

Auth Endpoints:
POST /api/auth/login                 # Get JWT token
```

## 🎨 Styling Architecture

```
Global Styles (globals.css)
├── Tailwind Utilities
├── Custom CSS Variables
└── Font Imports

Component Styles (Tailwind Classes):
├── Pink/Purple Gradients
├── Dark Mode Support
├── Responsive Breakpoints
└── Animations

Custom Animations (Framer Motion):
├── Floating Hearts
├── Fade & Slide Effects
├── Hover Transforms
└── Loading States
```

## 🚀 Performance Optimizations

1. **Image Optimization**
   - Next.js Image component
   - Lazy loading
   - WebP format

2. **Code Splitting**
   - Route-based splitting
   - Dynamic imports
   - Vendor bundling

3. **Caching**
   - Static generation
   - Incremental updates
   - Browser caching headers

4. **Animations**
   - GPU acceleration
   - Optimized transitions
   - Reduced motion support

## 📝 File Naming Conventions

```
Components:     PascalCase.tsx
Utilities:      camelCase.ts
Pages:          kebab-case/page.tsx
Styles:         globals.css
Types:          types.ts (if needed)
```

## 🔄 Development Workflow

1. Create feature branch
2. Make changes to components/lib/pages
3. Test locally with `npm run dev`
4. Build with `npm run build`
5. Commit with clear messages
6. Push to GitHub
7. Vercel auto-deploys on main push

## 📚 Key Files

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Supabase client setup |
| `src/lib/auth.ts` | JWT token generation/verification |
| `src/lib/db.ts` | Database query functions |
| `src/app/page.tsx` | Main public page |
| `src/app/api/content/route.ts` | Content CRUD operations |

## 🛠️ Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL        # Public API URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Public API key
SUPABASE_SERVICE_ROLE_KEY       # Admin API key
JWT_SECRET                      # Token signing key
ADMIN_PASSWORD                  # Admin login password
```

---

Made with ❤️ for Valentine's Day 💖
