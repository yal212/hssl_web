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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hssl-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. Set up the database:
   - Go to your Supabase project
   - Run the SQL from `supabase-schema.sql` in the SQL Editor
   - Email authentication is configured by default

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Setup

1. Visit `/admin/setup` to initialize sample data
2. Test the database connection
3. Run the setup to populate products

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

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with love by the High School Soap Lab team
- Inspired by our mission to create positive change
- Thanks to all our supporters and customers

## 📞 Contact

- Email: contact@hssoapllab.org  
- Website: [High School Soap Lab](https://hssoapllab.org)

---

*Making clean, green soap for a cleaner planet and a better world.* 🌍🧼
