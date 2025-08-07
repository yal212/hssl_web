import { Hero } from '@/components/Hero'
import { Mission } from '@/components/Mission'
import { CTAStrip } from '@/components/CTAStrip'
import { NewsTeaser } from '@/components/NewsTeaser'
import { CallToAction } from '@/components/CallToAction'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced with nature-inspired elements */}
      <Hero />

      {/* Mission Statement Block - Three cards layout */}
      <Mission />

      {/* Quick Call-to-Action Strip - New component */}
      <CTAStrip />

      {/* News Teaser Module - Enhanced with filters and hover effects */}
      <NewsTeaser />

      {/* Final Call to Action - Enhanced engagement */}
      <CallToAction />
    </div>
  )
}
