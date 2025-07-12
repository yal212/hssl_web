# Deployment Guide

This guide will help you deploy the High School Soap Lab website to production.

## Prerequisites

- Supabase project set up and configured
- Google OAuth configured in Supabase
- Database schema applied
- GitHub repository with your code

## Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository

1. Ensure all your code is committed and pushed to GitHub
2. Make sure your `.env.local` file is NOT committed (it should be in `.gitignore`)
3. Test your application locally one more time

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `./` (or `./hssl-web` if you have the project in a subdirectory)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Environment Variables

In the Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Note**: The `NEXT_PUBLIC_SITE_URL` is used for RSS feed generation and should match your production domain.

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be available at `https://your-project-name.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## Supabase Production Setup

### Update OAuth Redirect URLs

1. Go to your Supabase dashboard
2. Navigate to Authentication > URL Configuration
3. Add your production URL to:
   - Site URL: `https://your-domain.com`
   - Redirect URLs: `https://your-domain.com/auth/callback`

### Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth 2.0 Client
3. Add your production domain to Authorized redirect URIs:
   - `https://your-project-ref.supabase.co/auth/v1/callback`

### Set Up Storage Buckets

1. Go to Storage in your Supabase dashboard
2. Create a bucket named `avatars` for profile pictures:
   - Make it public
   - Set file size limit to 5MB
   - Allow JPEG, PNG, WebP formats
3. Configure appropriate RLS policies for the bucket

### Database Schema and Initial Data

1. **Apply Database Schema**:
   - Go to SQL Editor in your Supabase dashboard
   - Run the contents of `supabase-schema.sql` to create all tables and policies

2. **Set Up Initial Data**:
   - After deployment, visit `https://your-domain.com/admin/setup`
   - Run the setup to populate sample products and data
   - This creates initial products, team members, and test data

3. **Configure Admin User**:
   - Sign in with Google OAuth
   - In Supabase dashboard, go to Table Editor > profiles
   - Find your user and change the `role` field to `admin`
   - This gives you access to admin features

## Post-Deployment Checklist

### Test Core Functionality

- [ ] Home page loads correctly
- [ ] Navigation works on all pages
- [ ] Shop page displays products
- [ ] About page shows team information
- [ ] Support page renders properly
- [ ] News page displays articles
- [ ] RSS feed works (`/api/rss`)
- [ ] Login redirects to Google OAuth
- [ ] Authentication callback works
- [ ] Profile page is accessible after login
- [ ] Profile editing and image upload works
- [ ] Dashboard is accessible after login
- [ ] Database operations work (products load)
- [ ] Admin setup page works (`/admin/setup`)

### Test Responsive Design

- [ ] Mobile view (320px - 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (1024px+)
- [ ] Navigation menu works on mobile
- [ ] All buttons are clickable on touch devices

### Test Performance

- [ ] Page load times are acceptable
- [ ] Images load properly
- [ ] Animations are smooth
- [ ] No console errors

### Test Accessibility

- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Color contrast is sufficient
- [ ] Screen reader compatibility

## Environment-Specific Configuration

### Development
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_dev_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_prod_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Monitoring and Analytics

### Set Up Error Monitoring

1. Consider adding Sentry for error tracking
2. Monitor Vercel Analytics for performance
3. Set up Supabase monitoring for database issues

### Performance Monitoring

1. Use Vercel Analytics
2. Monitor Core Web Vitals
3. Set up alerts for downtime

## Backup and Security

### Database Backups

1. Supabase automatically backs up your database
2. Consider setting up additional backups for critical data
3. Test restore procedures

### Security Best Practices

1. Keep dependencies updated
2. Monitor for security vulnerabilities
3. Use environment variables for all secrets
4. Enable HTTPS (automatic with Vercel)

## Troubleshooting Common Issues

### Build Failures

1. Check for TypeScript errors
2. Verify all dependencies are installed
3. Ensure environment variables are set

### Authentication Issues

1. Verify OAuth redirect URLs
2. Check Supabase configuration
3. Ensure environment variables are correct

### Database Connection Issues

1. Verify Supabase URL and keys
2. Check database permissions
3. Ensure RLS policies are correct
4. Run `node debug-supabase.js` to test connection

### Profile/Image Upload Issues

1. Verify `avatars` storage bucket exists and is public
2. Check storage policies allow authenticated users to upload
3. Ensure file size limits are set correctly (5MB max)
4. Verify supported file types: JPEG, PNG, WebP

### RSS Feed Issues

1. Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
2. Check that news table exists and has data
3. Verify RSS endpoint at `/api/rss` returns valid XML

### Admin Access Issues

1. Sign in with Google OAuth first
2. Update your profile role to `admin` in Supabase dashboard
3. Visit `/admin/setup` to initialize data
4. Check that you have proper permissions in RLS policies

## Maintenance

### Regular Updates

1. Update dependencies monthly
2. Monitor for security patches
3. Test updates in development first

### Content Management

1. Use the dashboard to manage products
2. Use `/admin/news` to manage news articles
3. Regular backup of important data
4. Monitor user feedback and issues
5. Update team member information in the about page
6. Keep product catalog updated through admin interface

## Support

If you encounter issues during deployment:

1. Check the Vercel deployment logs
2. Review Supabase logs
3. Test locally with production environment variables
4. Contact support if needed

## Quick Start Checklist

After successful deployment, follow these steps in order:

1. **✅ Test Basic Functionality**
   - [ ] Visit your deployed site
   - [ ] Check all pages load correctly
   - [ ] Test navigation and responsive design

2. **✅ Set Up Authentication**
   - [ ] Test Google OAuth login
   - [ ] Verify profile creation works
   - [ ] Update your role to `admin` in Supabase

3. **✅ Initialize Data**
   - [ ] Visit `/admin/setup` and run setup
   - [ ] Verify products appear on shop page
   - [ ] Test news functionality

4. **✅ Configure Content**
   - [ ] Update team information if needed
   - [ ] Create your first news article
   - [ ] Test RSS feed at `/api/rss`

5. **✅ Final Testing**
   - [ ] Test profile editing and image upload
   - [ ] Verify all admin functions work
   - [ ] Check mobile responsiveness
   - [ ] Test performance and loading times

---

**Remember**: Always test thoroughly in a staging environment before deploying to production!
