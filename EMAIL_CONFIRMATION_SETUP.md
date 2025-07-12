# Email Confirmation Template Setup Guide

This guide explains how to improve the email confirmation template in your Supabase project for a better user experience.

## Overview

By default, Supabase sends basic email confirmation messages. You can customize these templates to match your brand and provide a better user experience for High School Soap Lab.

## Accessing Email Templates

1. **Go to your Supabase Dashboard**
   - Navigate to [supabase.com](https://supabase.com)
   - Select your High School Soap Lab project

2. **Navigate to Authentication Settings**
   - In the left sidebar, click on "Authentication"
   - Click on "Email Templates"

## Available Email Templates

You can customize the following email templates:

### 1. Confirm Signup Template
This is sent when users register for a new account.

### 2. Magic Link Template  
This is sent when users request a magic link login.

### 3. Change Email Address Template
This is sent when users change their email address.

### 4. Reset Password Template
This is sent when users request a password reset.

## Recommended Email Confirmation Template

Here's an improved template for the **Confirm Signup** email:

### Subject Line
```
歡迎加入 High School Soap Lab - 請確認您的電子郵件
```

### HTML Template
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>歡迎加入 High School Soap Lab</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fdf8;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            width: 60px;
            height: 60px;
            background-color: #16a34a;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
        }
        .title {
            color: #16a34a;
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
        .subtitle {
            color: #666;
            margin: 10px 0 0 0;
        }
        .content {
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            background-color: #16a34a;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 20px 0;
        }
        .button:hover {
            background-color: #15803d;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
        .highlight {
            background-color: #f0fdf4;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #16a34a;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🧼</div>
            <h1 class="title">歡迎加入 High School Soap Lab！</h1>
            <p class="subtitle">感謝您加入我們的環保手工皂社群</p>
        </div>
        
        <div class="content">
            <p>親愛的朋友，</p>
            
            <p>歡迎加入 High School Soap Lab！我們是一群熱愛環保的高中學生，致力於製作天然手工皂，為地球和慈善事業貢獻一份力量。</p>
            
            <div class="highlight">
                <strong>請點擊下方按鈕確認您的電子郵件地址：</strong>
            </div>
            
            <div style="text-align: center;">
                <a href="{{ .ConfirmationURL }}" class="button">確認電子郵件地址</a>
            </div>
            
            <p><strong>確認後您將可以：</strong></p>
            <ul>
                <li>🛍️ 瀏覽並購買我們的環保手工皂產品</li>
                <li>📰 獲得最新的產品資訊和環保知識</li>
                <li>👥 了解我們的團隊和使命</li>
                <li>💚 支持我們的慈善活動</li>
            </ul>
            
            <p>如果您無法點擊上方按鈕，請複製以下連結到瀏覽器中：</p>
            <p style="word-break: break-all; color: #16a34a; font-size: 14px;">{{ .ConfirmationURL }}</p>
        </div>
        
        <div class="footer">
            <p><strong>High School Soap Lab</strong></p>
            <p>製作清潔環保手工皂，創造更美好的世界</p>
            <p style="font-size: 12px; margin-top: 15px;">
                如果您沒有註冊此帳戶，請忽略此電子郵件。<br>
                此確認連結將在24小時後過期。
            </p>
        </div>
    </div>
</body>
</html>
```

### Text Template (Fallback)
```
歡迎加入 High School Soap Lab！

感謝您註冊我們的環保手工皂社群。

請點擊以下連結確認您的電子郵件地址：
{{ .ConfirmationURL }}

確認後您將可以：
- 瀏覽並購買我們的環保手工皂產品
- 獲得最新的產品資訊和環保知識  
- 了解我們的團隊和使命
- 支持我們的慈善活動

如果您沒有註冊此帳戶，請忽略此電子郵件。
此確認連結將在24小時後過期。

High School Soap Lab
製作清潔環保手工皂，創造更美好的世界
```

## How to Apply the Template

1. **Copy the HTML Template**
   - Copy the HTML template code above

2. **Paste in Supabase Dashboard**
   - In Authentication > Email Templates
   - Select "Confirm Signup"
   - Paste the HTML code in the "Body (HTML)" field
   - Paste the text version in the "Body (Text)" field
   - Update the subject line

3. **Test the Template**
   - Create a test user account
   - Check the email you receive
   - Verify the styling and links work correctly

## Important Variables

Supabase provides these variables you can use in your templates:

- `{{ .ConfirmationURL }}` - The confirmation link
- `{{ .Email }}` - The user's email address
- `{{ .SiteURL }}` - Your site URL
- `{{ .RedirectTo }}` - Redirect URL after confirmation

## Additional Customizations

### Brand Colors
- Primary Green: `#16a34a`
- Light Green: `#f0fdf4`
- Background: `#f8fdf8`

### Logo
Consider uploading your actual logo to a CDN and replacing the emoji with:
```html
<img src="your-logo-url" alt="High School Soap Lab" style="width: 60px; height: 60px;">
```

### Mobile Responsiveness
The template is already mobile-responsive, but you can test it on different devices.

## Testing Checklist

- [ ] Email displays correctly in Gmail
- [ ] Email displays correctly in Outlook
- [ ] Email displays correctly on mobile devices
- [ ] Confirmation link works properly
- [ ] Text fallback version is readable
- [ ] All Chinese characters display correctly
- [ ] Brand colors match your website

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check your Supabase project settings
   - Verify SMTP configuration if using custom SMTP

2. **Styling not working**
   - Some email clients strip CSS
   - Use inline styles for critical styling

3. **Links not working**
   - Verify the `{{ .ConfirmationURL }}` variable is included
   - Check redirect URL configuration

### Support

If you encounter issues:
1. Check Supabase documentation
2. Test with different email providers
3. Contact Supabase support if needed

## Next Steps

After setting up the email template:
1. Test the complete registration flow
2. Monitor email delivery rates
3. Gather user feedback on the email experience
4. Consider setting up custom SMTP for better deliverability
