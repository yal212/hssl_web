# Contact Form Setup Guide

This guide will help you set up the complete contact form system with email notifications, admin dashboard, and auto-reply functionality.

## 🚀 Features Implemented

✅ **Functional Contact Form** - Users can submit messages through the website  
✅ **Database Storage** - All messages stored securely in Supabase  
✅ **Email Notifications** - Admins receive email alerts for new messages  
✅ **Auto-Reply** - Users get confirmation emails when they submit  
✅ **Admin Dashboard** - View, manage, and reply to contact messages  
✅ **Custom Replies** - Send personalized email responses to users  
✅ **Rate Limiting** - Prevents spam and abuse  
✅ **Data Sanitization** - Protects against XSS attacks  

## 📋 Setup Steps

### Step 1: Database Setup

Run the contact messages migration in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of contact-messages-migration.sql
-- OR run the updated supabase-schema.sql
```

This creates:
- `contact_messages` table
- Row Level Security policies
- Triggers for automatic timestamps

### Step 2: Email Service Setup (Resend)

1. **Sign up for Resend**
   - Go to [resend.com](https://resend.com)
   - Create a free account (100 emails/day free tier)
   - Verify your domain or use their test domain

2. **Get API Key**
   - Go to API Keys section in Resend dashboard
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Configure Environment Variables**
   
   Add these to your `.env.local` file:
   ```env
   # Email Configuration
   RESEND_API_KEY=re_your_api_key_here
   FROM_EMAIL=noreply@yourdomain.com
   ADMIN_EMAIL=your-admin-email@gmail.com
   ```

   **Important Notes:**
   - Replace `yourdomain.com` with your actual domain
   - Use your real admin email address
   - For testing, you can use Resend's test domain: `onboarding@resend.dev`

### Step 3: Admin User Setup

Make sure you have an admin user in your database:

```sql
-- Update an existing user to admin
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-admin-email@gmail.com';

-- Check admin users
SELECT id, email, full_name, role, created_at
FROM public.profiles
WHERE role = 'admin';
```

### Step 4: Test the System

1. **Test Contact Form**
   - Go to `/about/contact`
   - Fill out and submit the form
   - Check for success message

2. **Verify Database Storage**
   - Check Supabase Table Editor
   - Look for your message in `contact_messages` table

3. **Test Email Notifications**
   - Submit a test message
   - Check admin email for notification
   - Check user email for auto-reply

4. **Test Admin Dashboard**
   - Login as admin user
   - Go to `/admin/contact-messages`
   - View and manage messages

## 📧 Email Templates

The system includes three types of emails:

### 1. Admin Notification
- Sent to admin when new message received
- Contains full message details
- Includes sender information

### 2. Auto-Reply Confirmation
- Sent to user immediately after submission
- Confirms message received
- Includes message summary

### 3. Custom Reply
- Sent by admin through dashboard
- Personalized response to user
- Includes original message context

## 🔧 Configuration Options

### Email Settings

```env
# Required
RESEND_API_KEY=your_api_key
ADMIN_EMAIL=admin@yourdomain.com

# Optional (with defaults)
FROM_EMAIL=noreply@yourdomain.com  # Default sender
NEXT_PUBLIC_SITE_URL=https://yourdomain.com  # For links in emails
```

### Rate Limiting

The system includes built-in rate limiting:
- Contact form: 5 submissions per hour per IP
- Admin API: 100 requests per hour per IP

## 🛠️ Admin Dashboard Features

### Message Management
- **View All Messages** - Paginated list with filters
- **Status Tracking** - Unread, Read, Replied
- **Search & Filter** - Find messages by name, email, or subject
- **Message Details** - Full message content and metadata

### Reply System
- **Mark as Read** - Update message status
- **Send Custom Replies** - Email responses directly to users
- **Admin Notes** - Internal notes for message tracking
- **Email Integration** - Automatic email sending with templates

### Access Control
- **Admin Only** - Dashboard restricted to admin users
- **Secure API** - All endpoints require admin authentication
- **Role-Based** - Uses profile role system

## 🔍 Troubleshooting

### Common Issues

1. **Emails Not Sending**
   - Check RESEND_API_KEY is correct
   - Verify domain configuration in Resend
   - Check console logs for error messages

2. **Admin Dashboard Not Accessible**
   - Ensure user has `role = 'admin'` in profiles table
   - Check authentication status
   - Verify API endpoints are working

3. **Form Submission Fails**
   - Check database connection
   - Verify contact_messages table exists
   - Check browser console for errors

4. **Rate Limiting Issues**
   - Wait for rate limit to reset
   - Check IP address restrictions
   - Adjust rate limits if needed

### Debug Steps

1. **Check Database**
   ```sql
   SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5;
   ```

2. **Check Admin Users**
   ```sql
   SELECT email, role FROM profiles WHERE role = 'admin';
   ```

3. **Test API Endpoints**
   - POST `/api/contact` - Submit message
   - GET `/api/admin/contact-messages` - Fetch messages (admin only)
   - POST `/api/admin/contact-messages/reply` - Send reply (admin only)

## 🚀 Next Steps

### Optional Enhancements

1. **Email Templates Customization**
   - Modify templates in `src/lib/email.ts`
   - Add company branding
   - Customize styling

2. **Advanced Admin Features**
   - Message categories/tags
   - Bulk actions
   - Export functionality
   - Analytics dashboard

3. **Integration Options**
   - Slack notifications
   - Discord webhooks
   - CRM integration
   - Ticket system

4. **Performance Optimizations**
   - Email queue system
   - Background job processing
   - Caching for admin dashboard

## 📞 Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all environment variables are set
3. Test each component individually
4. Check Supabase logs for database issues
5. Review Resend dashboard for email delivery status

The contact form system is now fully functional and ready for production use!
