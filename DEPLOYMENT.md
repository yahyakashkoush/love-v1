# 📋 LoveStory Deployment Checklist

## Pre-Deployment Checklist

### 1. Code Quality
- [ ] No console.log statements left in production code
- [ ] No TODO comments in critical code
- [ ] TypeScript passes without errors
- [ ] ESLint passes without errors
- [ ] All imports are used

### 2. Security
- [ ] Changed `ADMIN_PASSWORD` from default
- [ ] Generated new strong `JWT_SECRET` (32+ characters)
- [ ] Environment variables are never committed
- [ ] CORS is properly configured
- [ ] API endpoints validate JWT tokens
- [ ] Supabase RLS policies are configured
- [ ] Storage buckets have proper permissions

### 3. Functionality Testing

#### Public Site (/)
- [ ] Page loads without errors
- [ ] No broken images or links
- [ ] Animations work smoothly
- [ ] Responsive on mobile (320px+)
- [ ] Dark mode works correctly
- [ ] Page load time < 3 seconds
- [ ] SEO meta tags present

#### Admin Dashboard
- [ ] Login page works
- [ ] Form validation works
- [ ] File uploads work
- [ ] Image deletion works
- [ ] Content updates reflect on public site
- [ ] Logout works properly
- [ ] Token expiration handled

#### API Endpoints
- [ ] GET /api/content returns correct data
- [ ] PUT /api/content with invalid token returns 401
- [ ] POST /api/auth/login returns valid JWT
- [ ] File uploads return correct URLs
- [ ] Error responses are handled

### 4. Performance
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.5s
- [ ] Images are optimized
- [ ] Fonts are properly loaded

### 5. Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS 12+)
- [ ] Chrome Mobile (Android 5+)

### 6. Supabase Configuration
- [ ] Database connection string is correct
- [ ] Table schema matches codebase
- [ ] Storage buckets are created
- [ ] Bucket policies are configured
- [ ] RLS is properly configured
- [ ] CORS is set up correctly

### 7. Documentation
- [ ] README.md is complete
- [ ] SETUP_GUIDE.md is accurate
- [ ] API documentation is clear
- [ ] Environment variables are documented
- [ ] Known issues are documented

## Deployment Steps

### Step 1: Prepare Production Build

```bash
cd /Users/yahyaemad/Desktop/lovev1

# Clean install
rm -rf node_modules package-lock.json
npm install

# Build production version
npm run build

# Check for build errors
echo "Build completed with no errors ✓"
```

### Step 2: Run Production Tests

```bash
# Test production build locally
npm run start

# Visit http://localhost:3000 in browser
# Test all functionality
```

### Step 3: Push to GitHub

```bash
git status
git add .
git commit -m "Production ready - version 1.0"
git push origin main
```

### Step 4: Configure Vercel

1. **Create Vercel Account** (if needed)
   - Go to https://vercel.com
   - Sign up with GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - Click "Environment Variables"
   - Add each variable:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
     JWT_SECRET=<YOUR_STRONG_SECRET_KEY>
     ADMIN_PASSWORD=<YOUR_STRONG_PASSWORD>
     ```
   - Ensure "Production" checkbox is checked

4. **Configure Build Settings**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your URL

### Step 5: Verify Deployment

```bash
# Check if site is live
curl https://your-vercel-domain.com

# Test public site
# Test admin dashboard
# Test file uploads
# Test API endpoints
```

### Step 6: Configure Custom Domain (Optional)

1. In Vercel Project Settings
2. Go to "Domains"
3. Add your domain
4. Follow DNS configuration
5. Wait for SSL certificate (can take 24 hours)

### Step 7: Set Up Monitoring

1. **Enable Vercel Analytics**
   - Project Settings → Analytics
   - Enable Web Vitals

2. **Set Up Error Tracking**
   - Consider using Sentry or similar
   - Add monitoring to critical endpoints

## Post-Deployment

### Monitor Performance
- Check Vercel Analytics daily
- Monitor error logs
- Check Supabase logs for issues
- Review user feedback

### Maintenance
- Keep dependencies updated
- Regular security audits
- Backup database regularly
- Monitor storage usage

### Scaling (if needed)
- Monitor function execution time
- Increase Supabase plan if needed
- Consider caching strategies
- Monitor bandwidth usage

## Rollback Plan

If deployment goes wrong:

```bash
# View previous deployments
vercel list

# Rollback to previous version
vercel promote <DEPLOYMENT_URL>

# Or redeploy from GitHub
git revert <COMMIT_HASH>
git push origin main
# Vercel will automatically redeploy
```

## Security Reminders

🔒 **Production Security Checklist**

- [ ] Never commit `.env.local` file
- [ ] Use strong, unique passwords
- [ ] Rotate JWT_SECRET periodically
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Review Supabase security settings
- [ ] Set up rate limiting if needed
- [ ] Monitor for suspicious activity
- [ ] Keep dependencies updated
- [ ] Regular security audits
- [ ] Backup important data

## Troubleshooting

### Build Fails on Vercel
- Check all dependencies are installed
- Verify environment variables are set
- Check for TypeScript errors
- Review build logs

### Site Shows 500 Error
- Check Supabase connection
- Verify database table exists
- Check storage buckets are public
- Review function logs

### Uploads Fail
- Check bucket permissions
- Verify JWT token validity
- Check file size limits
- Review CORS settings

### Performance Issues
- Optimize images
- Enable caching
- Review bundle size
- Check database queries

## Contact & Support

- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/docs
- **Next.js Discord**: https://discord.gg/bUC2YeJ6Wq

---

Made with ❤️ for Valentine's Day 💖
