import { Hero } from '@/components/Hero'
import { Mission } from '@/components/Mission'
import { ImpactSummary } from '@/components/ImpactSummary'
import { CallToAction } from '@/components/CallToAction'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
      <ImpactSummary />
      <CallToAction />
    </div>
  )
}
