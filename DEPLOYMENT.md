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
```

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

## Post-Deployment Checklist

### Test Core Functionality

- [ ] Home page loads correctly
- [ ] Navigation works on all pages
- [ ] Shop page displays products
- [ ] About page shows team information
- [ ] Support page renders properly
- [ ] Login redirects to Google OAuth
- [ ] Authentication callback works
- [ ] Dashboard is accessible after login
- [ ] Database operations work (products load)

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
```

### Production
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
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

## Maintenance

### Regular Updates

1. Update dependencies monthly
2. Monitor for security patches
3. Test updates in development first

### Content Management

1. Use the dashboard to manage products
2. Regular backup of important data
3. Monitor user feedback and issues

## Support

If you encounter issues during deployment:

1. Check the Vercel deployment logs
2. Review Supabase logs
3. Test locally with production environment variables
4. Contact support if needed

---

**Remember**: Always test thoroughly in a staging environment before deploying to production!
