"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/app/components/Header";
import { NewsDetail } from "@/app/components/NewsDetail";
import { Footer } from "@/app/components/Footer";
import { GoToTop } from "@/app/components/GoToTop";

export default function NewsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleNavigateToCommercial = () => {
    router.push("/commercial");
  };

  return (
    <div className="inter-thin">
      <Header onNavigateToCommercial={handleNavigateToCommercial} />
      <NewsDetail id={id} onBack={handleBackToHome} />
      <Footer />
      <GoToTop />
    </div>
  );
}

