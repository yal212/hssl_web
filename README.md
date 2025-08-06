# High School Soap Lab Website

A modern, responsive website for High School Soap Lab - a student-led initiative creating eco-friendly soaps to raise money for charity.

## 🌱 About

High School Soap Lab is a group of passionate high school students who make and sell eco-friendly soap to raise money for charity. Our mission is "Making clean, green soap for a cleaner planet and a better world."

## ✨ Features

- **Modern Design**: Clean, eco-friendly design with smooth animations
- **Authentication**: Email/password authentication via Supabase
- **Product Showcase**: Dynamic product listings with search and filtering
- **Team Profiles**: Meet our student team members
- **Dashboard**: Protected member area for managing content
- **Mobile Responsive**: Optimized for all device sizes
- **Accessibility**: Built with accessibility best practices

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (Database, Auth, Storage)
- **Authentication**: Email/password authentication via Supabase
- **Icons**: Lucide React

## 📱 Pages

- **Home** (`/`) - Hero section, mission, featured products
- **Shop** (`/shop`) - Product catalog with search and filtering
- **About** (`/about`) - Team member profiles and our story
- **Support** (`/support`) - Ways to help and donation information
- **Login** (`/login`) - Email/password authentication
- **Dashboard** (`/dashboard`) - Protected member area
- **Admin Setup** (`/admin/setup`) - Database initialization

## 🎨 Design System

### Colors
- Primary: Green (eco-friendly theme)
- Secondary: Light green, yellow accents
- Background: Green-50 to white gradients

### Typography
- Font: Inter (clean, modern)
- Headings: Bold, large sizes
- Body: Regular weight, good contrast

### Components
- Cards with hover effects
- Animated buttons
- Responsive navigation
- Loading states
- Error handling

## 🔐 Authentication

The app uses Supabase Auth with email/password authentication:

1. Users sign up with email and password
2. Email confirmation required for account activation
3. Profile created automatically in `profiles` table
4. Role-based access (admin, member, volunteer)
5. Protected routes via middleware

## 📊 Database Schema

### Tables
- `profiles` - User profiles and roles
- `products` - Soap products with details
- `posts` - Blog posts and updates
- `events` - Community events and workshops

### Security
- Row Level Security (RLS) enabled
- Users can only edit their own content
- Admins have elevated permissions

## 🤝 Contributing (not supported yet)

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

custom

## 🙏 Acknowledgments

- Built with love by the High School Soap Lab team
- Inspired by our mission to create positive change
- Thanks to all our supporters and customers

## 📞 Contact

- Email:  
- Website: [High School Soap Lab](https://hssl-web.vercel.app)

---

*Making clean, green soap for a cleaner planet and a better world.* 🌍🧼
