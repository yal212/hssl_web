# Admin News Functionality Documentation

## Overview

This document describes the comprehensive admin functionality implemented for the news page, allowing admin users to create, edit, and delete news articles with proper authentication and authorization.

## Features Implemented

### 1. Admin Authentication & Authorization
- **Admin Role Check**: Users must have `role = 'admin'` in the profiles table
- **Middleware Protection**: Server-side route protection for `/admin/*` routes
- **Client-side Guards**: `AdminGuard` component and `useAdmin` hook for UI protection
- **Visual Indicators**: Admin mode indicator when logged in as admin

### 2. News Management Operations

#### Create News Articles
- **Location**: Available from news page hero section and admin management page
- **Features**:
  - Rich form with all news fields (title, content, excerpt, category, tags, etc.)
  - Real-time validation (title required, content minimum 50 characters)
  - Category selection from predefined options
  - Tag management with add/remove functionality
  - Featured article toggle
  - Publish immediately or save as draft
  - Image URL support

#### Edit News Articles
- **Access**: Via edit button on news cards (admin only) or admin management page
- **Features**:
  - Pre-populated form with existing data
  - Same validation and features as create form
  - Preserves existing data while allowing modifications

#### Delete News Articles
- **Access**: Via delete button on news cards (admin only) or admin management page
- **Features**:
  - Confirmation dialog to prevent accidental deletion
  - Shows article title in confirmation message
  - Permanent deletion with proper error handling

### 3. User Interface Enhancements

#### News Page (`/news`)
- **Admin Controls**: Only visible to admin users
  - "新增新聞" (Create News) button in hero section
  - "管理後台" (Admin Dashboard) link
  - Edit/Delete dropdown on each news card
- **Responsive Design**: Admin controls adapt to different screen sizes
- **Click-outside Handling**: Dropdown menus close when clicking outside

#### Admin Management Page (`/admin/news`)
- **Enhanced Interface**: Improved layout with better navigation
- **Bulk Operations**: View all news (published and unpublished)
- **Status Indicators**: Clear visual distinction between published and draft articles
- **Quick Actions**: Publish/unpublish toggle, edit, and delete buttons
- **Navigation**: Easy return to main news page

### 4. Security Implementation

#### Database Level (RLS Policies)
```sql
-- Admins can perform all operations on posts
-- Regular users can only see published posts and manage their own
-- Comprehensive policies in admin-news-policies.sql
```

#### Application Level
- **Middleware**: Checks admin role before allowing access to admin routes
- **API Protection**: News creation/editing/deletion requires admin privileges
- **Client Guards**: UI elements only shown to authorized users

### 5. Components Architecture

#### Core Components
- `NewsForm`: Reusable form for create/edit operations
- `CreateNewsModal`: Modal wrapper for news creation
- `EditNewsModal`: Modal wrapper for news editing
- `ConfirmDialog`: Reusable confirmation dialog for destructive actions
- `AdminGuard`: Protection wrapper for admin-only content

#### Enhanced Components
- `NewsCard`: Added admin controls with dropdown menu
- `useAdmin`: Custom hook for admin state management

## File Structure

```
src/
├── app/
│   ├── admin/news/page.tsx          # Admin management page
│   └── news/page.tsx                # Main news page with admin controls
├── components/
│   ├── news/
│   │   ├── NewsForm.tsx             # Reusable news form
│   │   ├── CreateNewsModal.tsx      # Create news modal
│   │   ├── EditNewsModal.tsx        # Edit news modal
│   │   └── NewsCard.tsx             # Enhanced with admin controls
│   ├── ui/
│   │   └── ConfirmDialog.tsx        # Confirmation dialog
│   └── AdminGuard.tsx               # Admin protection component
├── hooks/
│   └── useAdmin.ts                  # Admin authentication hook
└── lib/
    └── auth.ts                      # Enhanced with admin utilities
```

## Database Schema

### Required Tables
- `posts`: News articles with all necessary fields
- `profiles`: User profiles with role field

### Key Fields
```sql
-- posts table
id, title, content, excerpt, category, tags, featured, published, 
image_url, author_id, created_at, updated_at, published_at

-- profiles table  
id, email, full_name, role, avatar_url, bio, created_at, updated_at
```

## Setup Instructions

### 1. Database Setup
```bash
# Run the admin policies SQL script
# Execute admin-news-policies.sql in Supabase SQL Editor
```

### 2. Create Admin User
1. Sign up/login to your application
2. Go to Supabase Dashboard > Table Editor > profiles
3. Find your user record
4. Change `role` from 'member' to 'admin'
5. Save changes

### 3. Test Functionality
```bash
# Run the test script
node test-admin-news.js
```

## Usage Guide

### For Admin Users

#### Creating News
1. Visit `/news` page
2. Click "新增新聞" button in hero section
3. Fill out the form with required information
4. Choose to publish immediately or save as draft
5. Click "建立" to create the article

#### Editing News
1. On any news card, click the "⋮" menu button
2. Select "編輯" from dropdown
3. Modify the form fields as needed
4. Click "更新" to save changes

#### Deleting News
1. On any news card, click the "⋮" menu button
2. Select "刪除" from dropdown
3. Confirm deletion in the dialog
4. Article will be permanently removed

#### Admin Management
1. Visit `/admin/news` for comprehensive management
2. View all articles (published and unpublished)
3. Use quick actions for bulk operations
4. Monitor article status and performance

### For Regular Users
- Can view published news articles
- No admin controls visible
- Cannot access admin routes

## Error Handling

### Client-side
- Form validation with real-time feedback
- Network error handling with user-friendly messages
- Loading states during operations
- Success/failure notifications

### Server-side
- Database constraint validation
- Authentication/authorization checks
- Proper error responses
- Transaction rollback on failures

## Testing

### Automated Tests
- Database connection verification
- Schema validation
- RLS policy testing
- Data validation checks
- Admin role verification

### Manual Testing Checklist
- [ ] Admin user can create news articles
- [ ] Admin user can edit existing articles
- [ ] Admin user can delete articles
- [ ] Admin controls only visible to admin users
- [ ] Non-admin users cannot access admin features
- [ ] Form validation works correctly
- [ ] Confirmation dialogs prevent accidental actions
- [ ] Error handling provides helpful feedback

## Troubleshooting

### Common Issues

#### Admin Controls Not Visible
- Check user role in profiles table
- Verify admin authentication is working
- Clear browser cache and reload

#### Database Errors
- Ensure admin-news-policies.sql has been executed
- Check RLS policies are properly configured
- Verify table schema matches requirements

#### Permission Denied
- Confirm user has admin role
- Check middleware configuration
- Verify Supabase environment variables

### Debug Commands
```bash
# Test database connection and admin setup
node test-admin-news.js

# Check server logs for errors
npm run dev

# Verify environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Future Enhancements

### Potential Improvements
- Rich text editor for content
- Image upload functionality
- Bulk operations (delete multiple articles)
- Article scheduling for future publication
- Analytics and view tracking
- Comment moderation
- SEO optimization tools

### Performance Optimizations
- Pagination for large article lists
- Image optimization and CDN integration
- Caching strategies
- Search functionality
- Advanced filtering options

## Support

For issues or questions:
1. Check this documentation
2. Run the test script to verify setup
3. Check browser console for client-side errors
4. Review server logs for backend issues
5. Verify database configuration in Supabase dashboard
