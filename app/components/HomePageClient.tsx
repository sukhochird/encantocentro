"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { HeroSlider } from "./HeroSlider";
import { Introduction } from "./Introduction";
import { ApartmentSelection } from "./ApartmentSelection";
import { InteriorDesign } from "./InteriorDesign";
import { ExteriorDesign } from "./ExteriorDesign";
import { Amenities } from "./Amenities";
import { FullImageSection } from "./FullImageSection";
import { KeyAdvantages } from "./KeyAdvantages";
import { News } from "./News";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { GoToTop } from "./GoToTop";

export function HomePageClient() {
  const router = useRouter();

  // Add viewport meta tag to disable zoom on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const metaViewport = document.querySelector(
        'meta[name="viewport"]',
      );
      if (metaViewport) {
        metaViewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        );
      } else {
        const newMetaViewport = document.createElement("meta");
        newMetaViewport.name = "viewport";
        newMetaViewport.content =
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.head.appendChild(newMetaViewport);
      }
    }
  }, []);

  const handleViewApartmentDetail = (apartmentId: string) => {
    router.push(`/apartment/${apartmentId}`);
  };

  const handleNavigateToCommercial = () => {
    router.push("/commercial");
  };

  return (
    <div className="inter-thin">
      <Header onNavigateToCommercial={handleNavigateToCommercial} />
      <HeroSlider />
      <Introduction />
      <ApartmentSelection onViewDetail={handleViewApartmentDetail} />
      <InteriorDesign />
      <ExteriorDesign />
      <Amenities />
      <FullImageSection />
      <KeyAdvantages />
      <News />
      <ContactSection />
      <Footer />
      <GoToTop />
    </div>
  );
}

