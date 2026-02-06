import { Hero } from "@/components/home/Hero";
import { HypeStream } from "@/components/home/HypeStream";
import { MarketList } from "@/components/home/MarketList";
import { Arcade } from "@/components/home/Arcade";
import { TradingActors } from "@/components/home/TradingActors";
import { FluxCash } from "@/components/home/FluxCash";
import { TrustSection } from "@/components/home/TrustSection";
import { WhyFlux } from "@/components/home/WhyFlux";
import { Community } from "@/components/home/Community";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CreatorShowcase } from "@/components/home/CreatorShowcase";
import { Tokenomics } from "@/components/home/Tokenomics";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-20 overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <CreatorShowcase />
      <HypeStream />
      <MarketList />
      <Tokenomics />
      <TrustSection />
      <TradingActors />
      <FluxCash />
      <WhyFlux />
      <Arcade />
      <Community />
    </div>
  );
}
