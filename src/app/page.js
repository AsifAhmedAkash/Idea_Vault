import Image from "next/image";
import Banner from "./components/Banner";
import NewsComponent from "./components/NewsComponent";
import OurMissionComponent from "./components/OurMissionComponent";
import TrendingIdeasSection from "./components/TrendingIdeasSection";
import TopInvestorSection from "./components/TopInvestorSection";

export default function Home() {
  return (
    <div>
      <Banner>  </Banner>
      <TrendingIdeasSection></TrendingIdeasSection>
      <NewsComponent></NewsComponent>
      <OurMissionComponent></OurMissionComponent>
      <TopInvestorSection></TopInvestorSection>
    </div>
  );
}
