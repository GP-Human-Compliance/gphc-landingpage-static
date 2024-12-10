import { CallToAction } from '@/components/CallToAction'
import { Container } from '@/components/Container'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Reviews } from '@/components/Reviews'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'

export default function Home() {
  return (
    <>
      <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Dem Menschen verpflichtet.</h2>
          <p className="mt-2 text-lg text-gray-600">
            Unser Ziel ist, dass die Gesellschaft als Ganzes und jeder Einzelne für sich und mit Anderen die Risiken einer globalisierten Welt erkennt und informiert, selbstbestimmt und verantwortlich damit umgehen kann.
          </p>
        </Container>
      </div>  
      {/* <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Reviews />
      <Pricing />
      <Faqs /> */}
    </>
  )
}
