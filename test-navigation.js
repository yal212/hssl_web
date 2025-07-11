// Simple test script to verify navigation behavior
// Run this in the browser console to test the navigation

console.log('Testing navigation behavior...');

// Test 1: Check if dashboard redirects to login when not authenticated
console.log('Test 1: Checking dashboard redirect...');
fetch('/dashboard', { method: 'GET', redirect: 'manual' })
  .then(response => {
    console.log('Dashboard response status:', response.status);
    console.log('Dashboard response type:', response.type);
    if (response.status === 0 && response.type === 'opaqueredirect') {
      console.log('✅ Dashboard correctly redirects when not authenticated');
    } else {
      console.log('❌ Dashboard does not redirect properly');
    }
  })
  .catch(error => console.log('Dashboard test error:', error));

// Test 2: Check if profile redirects to login when not authenticated
console.log('Test 2: Checking profile redirect...');
fetch('/profile', { method: 'GET', redirect: 'manual' })
  .then(response => {
    console.log('Profile response status:', response.status);
    console.log('Profile response type:', response.type);
    if (response.status === 0 && response.type === 'opaqueredirect') {
      console.log('✅ Profile correctly redirects when not authenticated');
    } else {
      console.log('❌ Profile does not redirect properly');
    }
  })
  .catch(error => console.log('Profile test error:', error));

// Test 3: Check navbar state
console.log('Test 3: Checking navbar state...');
setTimeout(() => {
  const dashboardLink = document.querySelector('a[href="/dashboard"]');
  const profileLink = document.querySelector('a[href="/profile"]');
  const loginButton = document.querySelector('a[href="/login"]');
  
  console.log('Dashboard link found:', !!dashboardLink);
  console.log('Profile link found:', !!profileLink);
  console.log('Login button found:', !!loginButton);
  
  if (!dashboardLink && !profileLink && loginButton) {
    console.log('✅ Navbar correctly shows login button when not authenticated');
  } else {
    console.log('❌ Navbar state is incorrect for unauthenticated user');
  }
}, 2000);

console.log('Navigation tests initiated. Check results above.');
