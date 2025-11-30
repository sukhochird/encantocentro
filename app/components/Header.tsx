"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";

interface HeaderProps {
  onNavigateToCommercial?: () => void;
}

export function Header({
  onNavigateToCommercial,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = [
        { id: "танилцуулга" },
        { id: "орон-сууц" },
        { id: "уулзалт" },
      ];
      
      // Find the section that is most visible in the viewport
      let currentSection = "";
      let maxVisibility = 0;
      
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.max(0, rect.bottom - viewportHeight);
          const visibleHeight = rect.height - visibleTop - visibleBottom;
          const visibility = Math.max(0, visibleHeight) / rect.height;
          
          // If this section is more visible and is in the viewport, make it active
          if (visibility > maxVisibility && rect.top < viewportHeight * 0.5 && rect.bottom > 0) {
            maxVisibility = visibility;
            currentSection = section.id;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      // Check on mount and after a short delay to ensure DOM is ready
      setTimeout(handleScroll, 100);
      handleScroll();
      
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  const handleNavigation = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (pathname !== '/') {
      router.push('/');
      // Small delay to allow navigation to complete
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Rounded Container for entire header */}
        <div
          className={`bg-background/95 backdrop-blur-md rounded-full border border-border transition-all duration-300 ${
            isScrolled ? "shadow-lg bg-background/98" : "shadow-sm"
          }`}
        >
          <div className="px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="font-medium text-xl text-black hover:text-primary transition-colors cursor-pointer"
            >
              ENCANTO CENTRO
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleNavigation('танилцуулга')}
                  className={`font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    activeSection === 'танилцуулга'
                      ? 'text-primary bg-primary/10'
                      : 'text-black hover:bg-accent'
                  }`}
                >
                  Танилцуулга
                </button>
                <button
                  onClick={onNavigateToCommercial}
                  className={`font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    pathname === '/commercial'
                      ? 'text-primary bg-primary/10'
                      : 'text-black hover:bg-accent'
                  }`}
                >
                  Үйлчилгээний талбай
                </button>
                <button
                  onClick={() => handleNavigation('орон-сууц')}
                  className={`font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    activeSection === 'орон-сууц'
                      ? 'text-primary bg-primary/10'
                      : 'text-black hover:bg-accent'
                  }`}
                >
                  Орон сууц
                </button>
                <button
                  onClick={() => handleNavigation('уулзалт')}
                  className={`font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    activeSection === 'уулзалт'
                      ? 'text-primary bg-primary/10'
                      : 'text-black hover:bg-accent'
                  }`}
                >
                  Холбоо барих
                </button>
              </div>
            </nav>

            {/* Dark Mode Toggle & CTA Button */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-black hover:bg-accent transition-all duration-200 cursor-pointer"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* CTA Button */}
              <Button
                onClick={() => handleNavigation('уулзалт')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                Уулзалт товлох
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Dark Mode Toggle Mobile */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-black hover:bg-accent transition-colors cursor-pointer"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black hover:bg-accent p-2 rounded-full transition-colors cursor-pointer"
              >
                {isMenuOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 bg-background/95 backdrop-blur-md rounded-2xl border border-border shadow-lg">
            <nav className="px-6 py-6 space-y-2">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleNavigation('танилцуулга');
                }}
                className={`block w-full text-left font-medium px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'танилцуулга'
                    ? 'text-primary bg-primary/10'
                    : 'text-black hover:bg-accent'
                }`}
              >
                Танилцуулга
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigateToCommercial?.();
                }}
                className={`block w-full text-left font-medium px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  pathname === '/commercial'
                    ? 'text-primary bg-primary/10'
                    : 'text-black hover:bg-accent'
                }`}
              >
                Үйлчилгээний талбай
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleNavigation('орон-сууц');
                }}
                className={`block w-full text-left font-medium px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'орон-сууц'
                    ? 'text-primary bg-primary/10'
                    : 'text-black hover:bg-accent'
                }`}
              >
                Орон сууц
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleNavigation('уулзалт');
                }}
                className={`block w-full text-left font-medium px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  activeSection === 'уулзалт'
                    ? 'text-primary bg-primary/10'
                    : 'text-black hover:bg-accent'
                }`}
              >
                Холбоо барих
              </button>
              <div className="pt-4">
                <Button
                  className="w-full bg-primary text-primary-foreground font-medium rounded-xl py-3"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleNavigation('уулзалт');
                  }}
                >
                  Уулзалт товлох
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}