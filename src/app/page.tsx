import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Vsl from "@/components/Vsl";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Mission from "@/components/Mission";
import Industries from "@/components/Industries";
import Offers from "@/components/Offers";
import Timeline from "@/components/Timeline";
import InstallGrid from "@/components/InstallGrid";
import WhyUs from "@/components/WhyUs";
import Faqs from "@/components/Faqs";
import FinalCta from "@/components/FinalCta";
import Booking from "@/components/Booking";
import { hasLogoRevealVideo } from "@/lib/media";

// One page, in-page anchors: #offers #how-it-works #modules #why #faqs #book.
export default function Home() {
  const hasVideo = hasLogoRevealVideo();

  return (
    <>
      <Preloader hasVideo={hasVideo} />
      <Hero />
      <Vsl />
      <Marquee />
      <Stats />
      <Mission />
      <Industries />
      <Offers />
      <Timeline />
      <InstallGrid />
      <WhyUs />
      <Faqs />
      <FinalCta />
      <Booking />
    </>
  );
}
