"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

export function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll position-г ажиглах
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Дээш scroll хийх функц
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md text-gray-900 border border-gray-200/50 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-200 hover:scale-105"
        aria-label="Дээш буцах"
      >
        <ChevronUp size={20} />
      </Button>
    </div>
  );
}