"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { ApartmentDetail } from "./ApartmentDetail";
import { Footer } from "./Footer";
import { GoToTop } from "./GoToTop";

interface ApartmentPageClientProps {
  apartmentId: string;
}

export function ApartmentPageClient({ apartmentId }: ApartmentPageClientProps) {
  const router = useRouter();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [apartmentId]);

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleNavigateToCommercial = () => {
    router.push("/commercial");
  };

  return (
    <div className="inter-thin">
      <Header onNavigateToCommercial={handleNavigateToCommercial} />
      <ApartmentDetail apartmentId={apartmentId} onBack={handleBackToHome} />
      <Footer />
      <GoToTop />
    </div>
  );
}

