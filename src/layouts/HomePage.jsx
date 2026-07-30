import Banner from "../pages/Banner";
import Developments from "../pages/Developments";
import StatsSection from "../pages/StatsSection";
import LatestProjects from "../pages/LatestProjects";
import PropertyCategories from "../pages/PropertyCategories";
import WhyChoose from "../pages/WhyChoose";
import MapSection from "../pages/MapSection";
import FAQSection from "../pages/FAQSection";
import SideBar from "../pages/SideBar";
import BuilderLogos from "../pages/alllogo";

// ✅ Import your popup component here
import ContactPopup from "../pages/PopupContact";

export default function HomePage() {
  // Order tells a deliberate story: hook → trust → credibility → flagship
  // portfolio → why us → location thesis → fresh listings → browse more →
  // people → reassurance. Each component/data source is unchanged — only
  // the sequence they render in has moved.
  return (
    <>
      <Banner />
      <BuilderLogos />
      <StatsSection />
      <Developments />
      <WhyChoose />
      <MapSection />
      <LatestProjects />
      <PropertyCategories />
      <FAQSection />

      <SideBar />

      {/* ✅ Add popup component at the bottom */}
      <ContactPopup/>
    </>
  );
}
