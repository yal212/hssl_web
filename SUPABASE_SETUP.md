# Supabase Setup Guide for High School Soap Lab

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: "High School Soap Lab"
   - Database Password: (generate a strong password)
   - Region: Choose closest to your location
5. Click "Create new project"

## 2. Configure Environment Variables

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values to your `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## 3. Set Up Database Schema

1. In your Supabase dashboard, go to SQL Editor
2. Copy the contents of `supabase-schema.sql` and run it
3. This will create all necessary tables, policies, and triggers

## 4. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Configure OAuth consent screen if needed
6. For Application type, choose "Web application"
7. Add authorized redirect URIs:
   - `https://your-project-ref.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for development)
8. Copy Client ID and Client Secret

## 5. Configure Supabase Auth

1. In Supabase dashboard, go to Authentication > Providers
2. Enable Google provider
3. Enter your Google Client ID and Client Secret
4. Save configuration

## 6. Set Up Storage (Optional)

1. Go to Storage in Supabase dashboard
2. Create a new bucket called "images"
3. Set it to public if you want direct image access
4. Configure policies as needed

## 7. Test Authentication

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Try signing in with Google
4. Check if user profile is created in the profiles table

## 8. Database Policies

The schema includes Row Level Security (RLS) policies:

- **Profiles**: Public read, users can only edit their own
- **Products**: Public read, only admins can create/edit/delete
- **Posts**: Public read for published posts, users can manage their own
- **Events**: Public read, authenticated users can create, users can manage their own

## 9. Admin Setup

To make a user an admin:

1. Go to Table Editor > profiles
2. Find the user's row
3. Change the `role` field from 'member' to 'admin'
4. Save changes

## 10. Sample Data

The schema includes sample soap products. You can modify or add more in the Table Editor.

## Troubleshooting

- **Auth not working**: Check redirect URIs match exactly
- **Database errors**: Verify RLS policies are set correctly
- **Environment variables**: Make sure they're properly set and the app is restarted

## Next Steps

After setup:
1. Test all authentication flows
2. Verify database operations work
3. Upload product images to storage
4. Create your first admin user
5. Test the dashboard functionality
