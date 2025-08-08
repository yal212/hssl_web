# Contact Form Troubleshooting Guide

## 🔧 Quick Fixes

### 1. Navigation Animation Issue ✅ FIXED
**Problem**: Profile icon animation was broken due to conflicting CSS transitions and Framer Motion animations.

**Solution**: Removed conflicting CSS transitions and used only Framer Motion animations.

**Status**: ✅ Fixed in the latest update

### 2. Admin Navigation Not Showing
**Problem**: Admin settings icon not appearing for admin users.

**Solution**: Fixed role checking from `user?.user_metadata?.role` to `profile?.role`.

**Status**: ✅ Fixed in the latest update

## 🚨 Common Message System Issues

### Issue 1: Contact Form Not Submitting

**Symptoms:**
- Form shows loading state but never completes
- No success/error message appears
- Console shows database errors

**Likely Cause:** Database table doesn't exist

**Solution:**
1. Go to your Supabase SQL Editor
2. Copy and paste the contents of `contact-messages-migration.sql`
3. Run the SQL script
4. Verify the table was created in Table Editor

**Test:** Visit `/admin/contact-test` to run diagnostics

### Issue 2: Emails Not Sending

**Symptoms:**
- Form submits successfully
- Message appears in database
- No emails received

**Likely Cause:** Email service not configured

**Solution:**
1. Sign up for [Resend](https://resend.com) (free tier available)
2. Get your API key from Resend dashboard
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   FROM_EMAIL=noreply@yourdomain.com
   ADMIN_EMAIL=your-admin-email@gmail.com
   ```
4. Restart your development server

**Test:** Submit a test message and check both admin and user emails

### Issue 3: Admin Dashboard Not Accessible

**Symptoms:**
- Can't access `/admin/contact-messages`
- Gets redirected to login or home page
- Admin settings icon not visible in navigation

**Likely Cause:** User doesn't have admin role

**Solution:**
1. Go to Supabase SQL Editor
2. Run this query to make yourself admin:
   ```sql
   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE email = 'your-email@gmail.com';
   ```
3. Refresh the page and check navigation

**Test:** Look for settings icon in top navigation when logged in

### Issue 4: Database Connection Errors

**Symptoms:**
- API returns 500 errors
- Console shows Supabase connection errors
- Form submission fails immediately

**Likely Cause:** Environment variables not configured

**Solution:**
1. Check your `.env.local` file has:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
2. Restart development server
3. Verify keys are correct in Supabase dashboard

## 🔍 Diagnostic Tools

### 1. Contact Test Page
Visit `/admin/contact-test` to run automated system tests:
- Database connectivity
- Email configuration
- Admin API access
- Environment variables

### 2. Browser Console
Open browser developer tools (F12) and check:
- Network tab for API request/response details
- Console tab for JavaScript errors
- Application tab for authentication status

### 3. Supabase Dashboard
Check your Supabase project:
- **Table Editor**: Verify `contact_messages` table exists
- **Authentication**: Check user sessions and profiles
- **Logs**: Look for API errors and database issues

### 4. Server Logs
Check your terminal running `npm run dev` for:
- API route errors
- Database connection issues
- Email service errors

## 📝 Step-by-Step Testing

### Test 1: Basic Form Submission
1. Go to `/about/contact`
2. Fill out the form with test data
3. Submit and look for success message
4. Check Supabase Table Editor for new row in `contact_messages`

### Test 2: Email Notifications
1. Submit a test message
2. Check admin email for notification
3. Check user email for auto-reply confirmation
4. Verify emails have correct content and formatting

### Test 3: Admin Dashboard
1. Login as admin user
2. Look for settings icon in navigation
3. Go to `/admin/contact-messages`
4. Verify messages appear in list
5. Test marking as read/replied
6. Test sending custom reply

## 🛠️ Environment Setup Checklist

### Required Environment Variables
```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Service (Optional but recommended)
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Site Configuration (Optional)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Database Requirements
- `contact_messages` table created
- RLS policies applied
- Admin user with `role = 'admin'` in profiles table

### Email Service Requirements
- Resend account created
- API key generated
- Domain verified (or using test domain)

## 🚀 Quick Start Commands

### 1. Database Setup
```sql
-- Run in Supabase SQL Editor
-- Copy contents from contact-messages-migration.sql
```

### 2. Make User Admin
```sql
-- Replace with your email
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-email@gmail.com';
```

### 3. Test System
```bash
# Visit these URLs to test
http://localhost:3001/about/contact          # Test form
http://localhost:3001/admin/contact-test     # Run diagnostics
http://localhost:3001/admin/contact-messages # Admin dashboard
```

## 📞 Still Having Issues?

If you're still experiencing problems:

1. **Run the diagnostic test** at `/admin/contact-test`
2. **Check browser console** for JavaScript errors
3. **Check server terminal** for API errors
4. **Verify environment variables** are loaded correctly
5. **Test each component individually** using the steps above

The most common issues are:
- Missing database table (run migration)
- Missing admin role (update user profile)
- Missing environment variables (check .env.local)
- Email service not configured (set up Resend)

Each issue has a specific fix outlined above. Follow the diagnostic steps to identify which component is causing problems.
