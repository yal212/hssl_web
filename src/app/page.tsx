import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { Mission } from '@/components/Mission'
import { CallToAction } from '@/components/CallToAction'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
      <FeaturedProducts />
      <CallToAction />
    </div>
  )
}
