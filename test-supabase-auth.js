// Simple Node.js script to test Supabase authentication
// Run this with: node test-supabase-auth.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rhtcaznrqdjelorptwqd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJodGNhem5ycWRqZWxvcnB0d3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzE2MzYsImV4cCI6MjA2NzgwNzYzNn0.f5-CPv745ccOxpUns6FZ4XakGtltiiPe1t-bS0EhLUU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAuth() {
  console.log('Testing Supabase authentication...')
  
  try {
    // Test 1: Check connection
    console.log('\n1. Testing connection...')
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    console.log('Session check result:', { sessionData, sessionError })
    
    // Test 2: Try to create a test user
    console.log('\n2. Creating test user...')
    const testEmail = 'test@hssl.com'
    const testPassword = 'testpassword123'
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword
    })
    
    console.log('Sign up result:', { 
      user: signUpData?.user ? 'User created' : 'No user',
      session: signUpData?.session ? 'Session created' : 'No session',
      error: signUpError?.message || 'No error'
    })
    
    // Test 3: Try to sign in
    console.log('\n3. Attempting sign in...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    })
    
    console.log('Sign in result:', {
      user: signInData?.user ? 'User authenticated' : 'No user',
      session: signInData?.session ? 'Session established' : 'No session',
      error: signInError?.message || 'No error'
    })
    
    if (signInData?.user) {
      console.log('✅ Authentication successful!')
      console.log('User ID:', signInData.user.id)
      console.log('User email:', signInData.user.email)
      console.log('Email confirmed:', signInData.user.email_confirmed_at ? 'Yes' : 'No')
    } else {
      console.log('❌ Authentication failed')
    }
    
  } catch (error) {
    console.error('Test error:', error)
  }
}

testAuth()
