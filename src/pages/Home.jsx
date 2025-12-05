import HeroSection from '../components/organisms/HeroSection'
import SectionLead from '../components/organisms/SectionLead'
import VideoSection from '../components/organisms/VideoSection'
import BenefitsSection from '../components/organisms/BenefitsSection'
import CTASection from '../components/organisms/CTASection'
import MapSection from '../components/organisms/MapSection'


export default function Home(){
  return (
    <>
      <HeroSection />
      <SectionLead />
      <MapSection />
      <VideoSection />
      <BenefitsSection />
      <CTASection />
    </>
  )
}
