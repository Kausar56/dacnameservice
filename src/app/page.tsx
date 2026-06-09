import { HeroSection } from "@/components/hero";
import {
  DomainCategoriesSection,
  EcosystemSection,
  FAQSection,
  Footer,
  HowItWorksSection,
  IdentityFeaturesSection,
  QERewardsSection,
  TrustBar,
  WhyDacnsSection,
} from "@/components/home";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-dac-bg">
      <HeroSection />
      <TrustBar />
      <WhyDacnsSection />
      <HowItWorksSection />
      <IdentityFeaturesSection />
      <EcosystemSection />
      <DomainCategoriesSection />
      <QERewardsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
