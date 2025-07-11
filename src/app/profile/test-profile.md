# Profile Page Testing Guide

## Manual Testing Checklist

### 1. Authentication Flow
- [ ] Navigate to `/profile` without being logged in
- [ ] Verify redirect to `/login` page
- [ ] Log in with valid credentials
- [ ] Verify successful redirect to dashboard or profile

### 2. Profile Page Display
- [ ] Profile page loads correctly after authentication
- [ ] User information displays properly:
  - [ ] Email address
  - [ ] Full name (or fallback to email username)
  - [ ] Member since date
  - [ ] Role/access level
  - [ ] Bio section (with placeholder if empty)
  - [ ] Profile picture (default avatar if none uploaded)

### 3. Navigation Integration
- [ ] Profile icon appears in navbar when authenticated
- [ ] Profile link works in desktop navigation
- [ ] Profile link works in mobile navigation
- [ ] Dashboard link still functions correctly

### 4. Logout Functionality
- [ ] Logout button is prominently displayed
- [ ] Clicking logout clears authentication state
- [ ] User is redirected to home page after logout
- [ ] Attempting to access `/profile` after logout redirects to login

### 5. Profile Editing Modal
- [ ] "Edit Profile" button opens the modal
- [ ] Modal displays current profile information
- [ ] Modal can be closed with X button or Cancel
- [ ] Form validation works for required fields
- [ ] Character limits are enforced (name: 100 chars, bio: 500 chars)

### 6. Profile Picture Upload
- [ ] Camera icon opens file picker
- [ ] Only image files are accepted (JPEG, PNG, WebP)
- [ ] File size validation (5MB limit)
- [ ] Image preview shows selected image
- [ ] Image is resized to 400x400 pixels
- [ ] Upload progress indicator works
- [ ] Profile picture updates after successful upload
- [ ] Old profile picture is replaced

### 7. Profile Information Updates
- [ ] Full name can be updated
- [ ] Bio can be updated
- [ ] Form validation prevents empty names
- [ ] Character count displays correctly
- [ ] Save button shows loading state
- [ ] Success feedback after save
- [ ] Profile page reflects changes immediately
- [ ] Changes persist after page refresh

### 5. Responsive Design
- [ ] Profile page displays correctly on desktop
- [ ] Profile page displays correctly on tablet
- [ ] Profile page displays correctly on mobile
- [ ] All buttons and links are accessible on touch devices

### 6. Visual Design
- [ ] Eco-friendly color scheme (greens, blues)
- [ ] Youthful and modern design aesthetic
- [ ] Proper spacing and typography
- [ ] Icons and visual elements enhance usability
- [ ] Animations and transitions work smoothly

### 8. Error Handling
- [ ] Loading states display appropriately
- [ ] Error messages are user-friendly
- [ ] Network errors are handled gracefully
- [ ] Profile data missing scenarios are handled
- [ ] Image upload errors show specific messages
- [ ] Form validation errors are clear
- [ ] Storage quota exceeded errors are handled

## Test Scenarios

### Scenario 1: New User Profile Setup
1. Create a new account
2. Navigate to profile page
3. Verify default values are displayed correctly
4. Click "Edit Profile" and add profile information
5. Upload a profile picture
6. Save changes and verify updates

### Scenario 2: Existing User Profile Updates
1. Log in with an account that has profile data
2. Verify all profile information displays correctly
3. Edit profile information
4. Change profile picture
5. Test form validation with invalid data
6. Save valid changes and verify updates

### Scenario 3: Image Upload Testing
1. Test with various image formats (JPEG, PNG, WebP)
2. Test with oversized images (>5MB)
3. Test with non-image files
4. Test with corrupted image files
5. Test upload cancellation
6. Test multiple rapid uploads

### Scenario 4: Route Protection
1. Open browser in incognito/private mode
2. Navigate directly to `/profile`
3. Verify immediate redirect to login
4. Log in and verify redirect back to profile

### Scenario 5: Session Management
1. Log in and navigate to profile
2. Open developer tools and clear cookies/localStorage
3. Refresh the page
4. Verify redirect to login page

### Scenario 6: Concurrent Editing
1. Open profile in two browser tabs
2. Edit profile in one tab
3. Try to edit in the other tab
4. Verify data consistency

## Expected Behavior

- **Unauthenticated users**: Immediate redirect to `/login`
- **Authenticated users**: Full profile page with user data
- **Loading states**: Smooth loading indicators
- **Logout**: Clean session termination and redirect
- **Navigation**: Seamless integration with existing navbar
- **Mobile**: Fully responsive design
- **Accessibility**: Keyboard navigation and screen reader friendly

## Technical Implementation Notes

- **Authentication**: Uses custom `useAuth` hook for consistent state management
- **Route Protection**: Middleware handles server-side security
- **Storage**: Supabase Storage with RLS policies for security
- **Image Processing**: Client-side resizing to 400x400 pixels
- **Design**: Eco-friendly, youthful aesthetic with green color scheme
- **Animations**: Framer Motion for smooth transitions
- **Form Validation**: Real-time validation with user-friendly error messages
- **Optimistic Updates**: UI updates immediately, then syncs with server

## Performance Considerations

- Images are resized client-side to reduce upload time
- Optimistic UI updates provide immediate feedback
- Profile data is cached in the auth hook
- Storage policies prevent unauthorized access
- File size limits prevent abuse

## Security Features

- **RLS Policies**: Users can only access their own files
- **File Validation**: Type and size restrictions
- **Authentication Required**: All operations require valid session
- **CSRF Protection**: Built into Supabase client
- **Input Sanitization**: Form data is validated and sanitized

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Modal focus trapping
- **Color Contrast**: Meets WCAG guidelines
- **Alternative Text**: Images have descriptive alt text
