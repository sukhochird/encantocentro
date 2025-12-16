"use client";

const apartBFloorPlan = "/assets/060e4d6e1f6099be3ad5c5041599c304c4940ff5.png";
const apartCFloorPlan = "/assets/a88ca38dca4f2dada6b4740fd40d3e0983df1f72.png";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  ArrowLeft,
  Calculator,
  Phone,
  Mail,
  MapPin,
  X,
  Maximize,
  Eye,
  Home,
  DoorOpen,
  Building,
  Bath,
  ChevronLeft,
  ChevronRight,
  Play,
  RotateCcw,
  MousePointer2,
  ExternalLink,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const golomtBankLogo = "/assets/522610c4c218c793e228baca803a214b83a12545.png";
import { useRouter } from "next/navigation";

// Pannellum.js 360° Panorama Viewer Component
interface PanoramaViewerProps {
  imageUrl: string;
  title: string;
  season: string;
}

function PanoramaViewer({
  imageUrl,
  title,
  season,
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pannellumViewerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Pannellum library
  useEffect(() => {
    // Check if already loaded
    if (window.pannellum) {
      setIsLibraryLoaded(true);
      return;
    }

    const loadPannellum = async () => {
      try {
        // Add CSS via style injection to avoid CORS issues
        if (!document.querySelector("#pannellum-css")) {
          const css = document.createElement("link");
          css.id = "pannellum-css";
          css.rel = "stylesheet";
          css.href =
            "https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.css";
          css.crossOrigin = "anonymous";
          css.onload = () => {
            console.log("Pannellum CSS loaded successfully");
          };
          css.onerror = () => {
            console.error("Failed to load Pannellum CSS");
            // Try to continue without CSS
          };
          document.head.appendChild(css);
        }

        // Add JS to head
        if (
          !document.querySelector('script[src*="pannellum.js"]')
        ) {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.js";
          script.crossOrigin = "anonymous";
          script.onload = () => {
            console.log("Pannellum JS loaded successfully");
            setIsLibraryLoaded(true);
          };
          script.onerror = () => {
            console.error("Failed to load Pannellum JS");
            setError("Failed to load 360° viewer library");
          };
          document.head.appendChild(script);
        } else {
          setIsLibraryLoaded(true);
        }
      } catch (err) {
        console.error("Error loading Pannellum:", err);
        setError("Failed to load 360° viewer");
      }
    };

    loadPannellum();
  }, []);

  // Initialize Pannellum viewer
  useEffect(() => {
    if (
      !isLibraryLoaded ||
      !containerRef.current ||
      !window.pannellum
    ) {
      return;
    }

    try {
      // Clear container
      containerRef.current.innerHTML = "";

      // Destroy existing viewer if exists
      if (pannellumViewerRef.current) {
        try {
          pannellumViewerRef.current.destroy();
        } catch (e) {
          console.log("Error destroying previous viewer:", e);
        }
      }

      // Create new panorama viewer
      pannellumViewerRef.current = window.pannellum.viewer(
        containerRef.current,
        {
          type: "equirectangular",
          panorama: imageUrl,
          autoLoad: true,

          pitch: 0,
          yaw: 0,
          hfov: 100,
          minHfov: 60,
          maxHfov: 120,
          showControls: true,
          showFullscreenCtrl: true,
          showZoomCtrl: true,
          mouseZoom: true,
          keyboardZoom: true,
          compass: false,
          northOffset: 0,
          preview: imageUrl,
        },
      );

      // Event listeners
      pannellumViewerRef.current.on("load", () => {
        console.log("Panorama loaded successfully");
        setIsLoaded(true);
        setError(null);
      });

      pannellumViewerRef.current.on("error", (err: any) => {
        console.error("Pannellum error:", err);
        setError("Failed to load panoramic image");
        setIsLoaded(false);
      });

      pannellumViewerRef.current.on("mousedown", () => {
        // Stop auto rotation on interaction
        if (pannellumViewerRef.current) {
          pannellumViewerRef.current.stopAutoRotate();
        }
      });
    } catch (err) {
      console.error("Error initializing Pannellum:", err);
      setError("Failed to initialize 360° viewer");
    }
  }, [isLibraryLoaded, imageUrl, title, season]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pannellumViewerRef.current) {
        try {
          pannellumViewerRef.current.destroy();
        } catch (e) {
          console.log("Cleanup error:", e);
        }
      }
    };
  }, []);

  if (!isLibraryLoaded || error) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[21/9] bg-gradient-to-b from-sky-200 to-green-200 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                {error ? (
                  <>
                    <RotateCcw className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-white text-sm">
                      {error}
                    </p>
                    <p className="text-white text-xs mt-1">
                      Ерөнхий зураг харуулж байна
                    </p>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-8 h-8 text-white mx-auto mb-2 animate-spin" />
                    <p className="text-white text-sm">
                      360° харагдац ачаалж байна...
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-md z-10">
              <p className="text-sm font-medium">{title}</p>
            </div>

            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full z-10">
              <span className="text-sm">{season}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[21/9]">
          <div
            ref={containerRef}
            className="w-full h-full min-h-[400px] bg-gradient-to-b from-sky-200 to-green-200"
            style={{ minHeight: "400px" }}
          />

          {!isLoaded && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <RotateCcw className="w-8 h-8 text-white mx-auto mb-2 animate-spin" />
                <p className="text-white text-sm">
                  360° панорам ачаалж байна...
                </p>
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-md z-30">
            <p className="text-sm font-medium">{title}</p>
          </div>

          {season && (
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full z-30">
              <span className="text-sm">{season}</span>
            </div>
          )}

          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded-md z-30">
            <div className="flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              <span className="text-sm">
                360° харагдац - чирж, томруулах боломжтой
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Global declaration for pannellum
declare global {
  interface Window {
    pannellum: any;
  }
}

// Kuula 360° Virtual Tour Component
interface VirtualTourProps {
  url: string;
}

function VirtualTour({ url }: VirtualTourProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative w-full overflow-hidden" style={{ height: "620px", minHeight: "620px" }}>
          <iframe
            src={url}
            className="w-full h-full border-0"
            style={{ height: "620px", minHeight: "620px" }}
            allow="fullscreen; vr"
            allowFullScreen
            title="360° Виртуал аялал"
            loading="lazy"
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Using a reliable working panoramic image
const panoramaImage = "https://i.imgur.com/EINnfH0.jpeg";

interface ApartmentDetailProps {
  apartmentId: string;
  onBack?: () => void;
}

export function ApartmentDetail({
  apartmentId,
  onBack,
}: ApartmentDetailProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);
  const [isPanoramicModalOpen, setIsPanoramicModalOpen] =
    useState(false);
  const [isFullscreenSliderOpen, setIsFullscreenSliderOpen] =
    useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] =
    useState(0);

  // URL to old key mapping function
  const getOldApartmentKey = (urlId: string): string => {
    const reverseMapping: { [key: string]: string } = {
      "apart-A": "studio",
      "apart-B": "1bedroom",
      "apart-C": "2bedroom",
      "apart-D": "deluxe",
      "apart-E": "premium",
      "apart-F": "family",
      "apart-G": "penthouse",
    };
    return reverseMapping[urlId] || "studio";
  };

  // Generate image URLs for A model (45 images)
  const generateAModelImages = () => {
    const images = [];
    const roomDescriptions = [
      "Өргөн мастер унтлагын өрөө, панорам харагдацтай",
      "Тансаг мастер ариун цэврийн өрөө, спа мэт орчинтай",
      "Том Walk-in хувцасны өрөө, зохион байгуулалт сайтай",
      "Тав тухтай зочны унтлагын өрөө, гэрэл их ордог",
      "Орчин үеийн зочны ариун цэврийн өрөө",
      "Дэд зочны унтлагын өрөө, балконтой холбоотой",
      "Хоёр дахь зочны ариун цэврийн өрөө",
      "Өргөн гэр бүлийн амралтын өрөө",
      "Том амьдрах өрөө, панорам цонхтой",
      "Тансаг хоолны өрөө, том ширээтэй",
    ];

    for (let i = 1; i <= 45; i++) {
      const descriptionIndex =
        (i - 1) % roomDescriptions.length;
      images.push({
        url: `https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-a/A-${i}.jpg`,
        title: `А загвар - ${253.44}м² - Зураг ${i}`,
        description:
          roomDescriptions[descriptionIndex] +
          `. 253.44м² талбайтай А загварын тансаг байрны дотоод засал чимэглэл.`,
      });
    }
    return images;
  };

  // Generate image URLs for B model
  const generateBModelImages = () => {
    const images: Array<{ url: string; title: string; description: string }> = [];
    const roomDescriptions = [
      "Өргөн мастер унтлагын өрөө, панорам харагдацтай",
      "Тансаг мастер ариун цэврийн өрөө, спа мэт орчинтай",
      "Том Walk-in хувцасны өрөө, зохион байгуулалт сайтай",
      "Тав тухтай зочны унтлагын өрөө, гэрэл их ордог",
      "Орчин үеийн зочны ариун цэврийн өрөө",
      "Дэд зочны унтлагын өрөө, балконтой холбоотой",
      "Хоёр дахь зочны ариун цэврийн өрөө",
      "Өргөн гэр бүлийн амралтын өрөө",
      "Том амьдрах өрөө, панорам цонхтой",
      "Тансаг хоолны өрөө, том ширээтэй",
    ];

    // List of all B model image filenames based on the actual files
    const bImageFilenames = [
      "B-1.jpg", "B-2.jpg", "B-3-1.jpg", "B-3-2.jpg", "B-3-3.jpg",
      "B-4.jpg", "B-5.jpg", "B-6.jpg", "B-6-1.jpg", "B-7.jpg",
      "B-7-1.jpg", "B-8.jpg", "B-9-1.jpg", "B-10-1.jpg", "B-11.jpg",
      "B-12.jpg", "B-12-1.jpg", "B-13.jpg", "B-14.jpg", "B-14-1.jpg",
      "B-15.jpg", "B-16.jpg", "B-17.jpg", "B-18.jpg", "B-19.jpg",
      "B-20.jpg", "B-21.jpg", "B-22.jpg", "B-23.jpg", "B-24.jpg",
      "B-25.jpg", "B-26.jpg", "B-27.jpg", "B-28.jpg", "B-29.jpg",
      "B-30.jpg", "B-31.jpg", "B-32.jpg", "B-33.jpg", "B-34.jpg",
      "B-35.jpg", "B-36.jpg", "B-37.jpg", "B-38.jpg", "B-39.jpg",
    ];

    bImageFilenames.forEach((filename, index) => {
      const descriptionIndex = index % roomDescriptions.length;
      images.push({
        url: `https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-b/${filename}`,
        title: `B загвар - 209.75м² - Зураг ${index + 1}`,
        description:
          roomDescriptions[descriptionIndex] +
          `. 209.75м² талбайтай B загварын тансаг байрны дотоод засал чимэглэл.`,
      });
    });

    return images;
  };

  // Generate image URLs for C model
  const generateCModelImages = () => {
    const images: Array<{ url: string; title: string; description: string }> = [];
    const roomDescriptions = [
      "Өргөн мастер унтлагын өрөө, панорам харагдацтай",
      "Тансаг мастер ариун цэврийн өрөө, спа мэт орчинтай",
      "Том Walk-in хувцасны өрөө, зохион байгуулалт сайтай",
      "Тав тухтай зочны унтлагын өрөө, гэрэл их ордог",
      "Орчин үеийн зочны ариун цэврийн өрөө",
      "Дэд зочны унтлагын өрөө, балконтой холбоотой",
      "Хоёр дахь зочны ариун цэврийн өрөө",
      "Өргөн гэр бүлийн амралтын өрөө",
      "Том амьдрах өрөө, панорам цонхтой",
      "Тансаг хоолны өрөө, том ширээтэй",
    ];

    // List of all C model image filenames based on the actual files
    const cImageFilenames = [
      "C-01.jpg", "C-02.jpg", "C-03.jpg", "C-04.jpg", "C-05.jpg",
      "C-06.jpg", "C-07.jpg", "C-08.jpg", "C-09.jpg", "C-10.jpg",
      "C-11.jpg", "C-12.jpg", "C-13.jpg", "C-14.jpg", "C-15.jpg",
      "C-16.jpg", "C-16a.jpg", "C-17.jpg", "C-18.jpg", "C-19.jpg",
      "C-20.jpg", "C-21.jpg", "C-22.jpg", "C-23.jpg", "C-24.jpg",
      "C-25.jpg", "C-26.jpg", "C-27.jpg", "C-28.jpg", "C-29.jpg",
    ];

    cImageFilenames.forEach((filename, index) => {
      const descriptionIndex = index % roomDescriptions.length;
      images.push({
        url: `https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/${filename}`,
        title: `C загвар - 144.18м² - Зураг ${index + 1}`,
        description:
          roomDescriptions[descriptionIndex] +
          `. 144.18м² талбайтай C загварын тансаг байрны дотоод засал чимэглэл.`,
      });
    });

    return images;
  };

  // Generate A model images for the studio apartment
  const aModelImages = generateAModelImages();
  
  // Generate B model images for the 1bedroom apartment
  const bModelImages = generateBModelImages();
  
  // Generate C model images for the 2bedroom apartment
  const cModelImages = generateCModelImages();

  // Mock apartment data - in real app this would come from API
  const apartmentData = {
    studio: {
      title: "253.44м² А загвар",
      subtitle: "4 унтлагын өрөө",
      price: "₮750,000,000 - ₮820,000,000",
      specs: {
        area: "253.44м²",
        rooms: "5",
        floors: "17-24",
        bathrooms: "4",
        view: "Урд, Баруун, Хойд",
      },
      roomList: [
        { name: "Мастер унтлагын өрөө", area: "35 м²" },
        { name: "Мастер ариун цэврийн өрөө", area: "12 м²" },
        { name: "Walk-in хувцасны өрөө", area: "8 м²" },
        { name: "Зочны унтлагын өрөө 1", area: "18 м²" },
        { name: "Зочны ариун цэврийн өрөө 1", area: "6 м²" },
        { name: "Зочны унтлагын өрөө 2", area: "16 м²" },
        { name: "Зочны ариун цэврийн өрөө 2", area: "5 м²" },
        { name: "Гэр бүлийн өрөө", area: "25 м²" },
        { name: "Амьдрах өрөө", area: "45 м²" },
        { name: "Хоолны өрөө", area: "28 м²" },
        { name: "Гал тогоо", area: "20 м²" },
        { name: "Scullery", area: "8 м²" },
        { name: "Угаалгын өрөө", area: "10 м²" },
        { name: "Restroom", area: "4 м²" },
        { name: "Lobby", area: "15 м²" },
      ],
      floorPlan:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/floorplan/apart-a.png?v=1",
      heroImage:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-a/A-1.jpg",
      interiorImages: aModelImages,
      panoramicView: panoramaImage,
      virtualTourUrl: "https://kuula.co/share/collection/7HvsZ?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&autorotate=0.02&thumbs=3&alpha=0.87",
    },
    "1bedroom": {
      title: "209.75м² B Загвар",
      subtitle: "3 өрөө",
      price: "₮450,000,000 - ₮490,000,000",
      specs: {
        area: "209.75м²",
        rooms: "5",
        floors: "17-24",
        bathrooms: "3+1",
        view: "Урд, Зүүн",
      },
      roomList: [
        { name: "Амьдрах өрөө", area: "32 м²" },
        { name: "Хоолны өрөө", area: "22 м²" },
        { name: "Гал тогоо", area: "15 м²" },
        { name: "Унтлагын өрөө", area: "24 м²" },
        { name: "Хүүхдийн өрөө", area: "18 м²" },
        { name: "Унтлагын өрөө 2", area: "16 м²" },
        { name: "Угаалгын өрөө", area: "8 м²" },
        { name: "Ариун цэврийн өрөө", area: "5 м²" },
        { name: "Ариун цэврийн өрөө 2", area: "4 м²" },
        { name: "Тагт", area: "7 м²" },
        { name: "Агуулах", area: "3 м²" },
      ],
      floorPlan: apartBFloorPlan,
      heroImage:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-b/B-4.jpg",
      interiorImages: bModelImages,
      panoramicView: panoramaImage,
      virtualTourUrl: "https://kuula.co/share/collection/7HkKb?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&autorotate=0.02&thumbs=3&alpha=0.87",
    },
    "2bedroom": {
      title: "144,18м² С загвар",
      subtitle: "3 өрөө",
      price: "₮430,000,000 - ₮470,000,000",
      specs: {
        area: "144,18м²",
        rooms: "3",
        floors: "17-24",
        bathrooms: "3",
        view: "Зүүн, хойд",
      },
      roomList: [
        { name: "Мастер унтлагын өрөө", area: "22 м²" },
        { name: "Мастер ариун цэврийн өрөө", area: "8 м²" },
        { name: "Зочны унтлагын өрөө", area: "17 м²" },
        { name: "Зочны ариун цэврийн өрөө", area: "5 м²" },
        { name: "Амьдрах өрөө", area: "30 м²" },
        { name: "Хоолны өрөө", area: "20 м²" },
        { name: "Гал тогоо", area: "14 м²" },
        { name: "Scullery", area: "6 м²" },
        { name: "Угаалгын өрөө", area: "7 м²" },
        { name: "Ариун цэврийн өрөө", area: "4 м²" },
        { name: "Танхим", area: "8 м²" },
      ],
      floorPlan: apartCFloorPlan,
      heroImage:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-05.jpg",
      interiorImages: cModelImages,
      panoramicView: panoramaImage,
      virtualTourUrl: "https://kuula.co/share/collection/7HkKN?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&autorotate=0.02&thumbs=3&alpha=0.87",
    },
    deluxe: {
      title: "159,5м² D загвар",
      subtitle: "4 өрөө",
      price: "₮520,000,000 - ₮560,000,000",
      specs: {
        area: "159,5м²",
        rooms: "4",
        floors: "6-16",
        bathrooms: "2+1",
        view: "Зүүн, Урд",
      },
      roomList: [
        { name: "Амьдрах өрөө", area: "35 м²" },
        { name: "Хоолны өрөө", area: "25 м²" },
        { name: "Гал тогоо", area: "16 м²" },
        { name: "Унтлагын өрөө", area: "25 м²" },
        { name: "Хүүхдийн өрөө", area: "18 м²" },
        { name: "Унтлагын өрөө 2", area: "16 м²" },
        { name: "Ажлын өрөө", area: "12 м²" },
        { name: "Угаалгын өрөө", area: "8 м²" },
        { name: "Ариун цэврийн өрөө", area: "6 м²" },
        { name: "Ариун цэ��рийн өрөө 2", area: "4 м²" },
        { name: "Тагт", area: "8 м²" },
        { name: "Агуулах", area: "4 м²" },
      ],
      floorPlan:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/floorplan/apart-d.png?v=1",
      heroImage:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-06.jpg",
      interiorImages: [
        {
          url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
          title: "Амьдрах өрөө",
          description:
            "Делюкс байрны том амьдрах өрөө, тансаг материал ашигласан.",
        },
        {
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          title: "Хоолны өрөө",
          description:
            "Өргөн хоолны өрөө, зочид угтахад тохиромжтой.",
        },
        {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
          title: "Гал тогооны өрөө",
          description: "Шилдэг техник хэрэгслээр тоноглогдсон.",
        },
        {
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
          title: "Унтлагын өрөө",
          description: "Том унтлагын өрөө, тансаг орчинтой.",
        },
        {
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
          title: "Ариун цэврийн өрөө",
          description:
            "Тансаг материалаар чимэглэсэн, том талбайтай.",
        },
      ],
      panoramicView: panoramaImage,
      virtualTourUrl: "#virtual-tour",
    },
    premium: {
      title: "158,86м² E загвар",
      subtitle: "4 өрөө",
      price: "₮580,000,000 - ₮620,000,000",
      specs: {
        area: "158,86м²",
        rooms: "4",
        floors: "6-16",
        bathrooms: "2+1",
        view: "Баруун, Урд",
      },
      roomList: [
        { name: "Амьдрах өрөө", area: "38 м²" },
        { name: "Хоолны өрөө", area: "28 м²" },
        { name: "Гал тогоо", area: "18 м²" },
        { name: "Унтлагын өрөө", area: "28 м²" },
        { name: "Хүүхдийн өрөө", area: "20 м²" },
        { name: "Унтлагын өрөө 2", area: "18 м²" },
        { name: "Ажлын өрөө", area: "15 м²" },
        { name: "Угаалгын өрөө", area: "10 м²" },
        { name: "Ариун цэврийн өрөө", area: "8 м²" },
        { name: "Ариун цэврийн өрөө 2", area: "6 м²" },
        { name: "Зочны ариун цэврийн өрөө", area: "4 м²" },
        { name: "Тагт", area: "10 м²" },
        { name: "Агуулах", area: "5 м²" },
      ],
      floorPlan:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/floorplan/apart-e.png?v=1",
      heroImage:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-10.jpg",
      interiorImages: [
        {
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          title: "Амьдрах өрөө",
          description:
            "Премиум байрны тансаг амьдрах өрөө, дээд зэргийн материал ашигласан.",
        },
        {
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
          title: "Хоолны өрөө",
          description:
            "Том хоолны өрөө, зочид угтах болон гэр бүлийн баяр ёслолд тохиромжтой.",
        },
        {
          url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
          title: "Гал тогооны өрөө",
          description:
            "Дээд зэргийн техник хэрэгслээр тоноглогдсон, мэргэжлийн хоол хийхэд тохиромжтой.",
        },
        {
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
          title: "Унтлагын өрөө",
          description: "Том мастер унтлагын өрөө, балконтой.",
        },
        {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
          title: "Ариун цэврийн өрөө",
          description:
            "Спа мэт ариун цэврийн өрөө, дээд зэргийн керамик ашигласан.",
        },
      ],
      panoramicView: panoramaImage,
      virtualTourUrl: "#virtual-tour",
    },
    family: {
      title: "129,1м² F загвар",
      subtitle: "3 өрөө",
      price: "₮720,000,000 - ₮780,000,000",
      specs: {
        area: "129,1м²",
        rooms: "3",
        floors: "6-16",
        bathrooms: "2",
        view: "Баруун, Хойд",
      },
      roomList: [
        { name: "Амьдрах өрөө", area: "45 м²" },
        { name: "Хоолн�� өрөө", area: "35 м²" },
        { name: "Гал тогоо", area: "22 м²" },
        { name: "Унтлагын өрөө", area: "32 м²" },
        { name: "Хүүхдийн өрөө", area: "22 м²" },
        { name: "Унтлагын өрөө 2", area: "20 м²" },
        { name: "Хүүхдийн өрөө 2", area: "18 м²" },
        { name: "Ажлын өрөө", area: "18 м²" },
        { name: "Угаалгын өрөө", area: "12 м²" },
        { name: "Ариун цэврийн өрөө", area: "10 м²" },
        { name: "Ариун цэврийн өрөө 2", area: "8 м²" },
        { name: "Зочны ариун цэврийн өрөө", area: "5 м²" },
        { name: "Тагт", area: "12 м²" },
        { name: "Агуулах", area: "8 м²" },
      ],
      floorPlan:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/floorplan/apart-f.png?v=1",
      heroImage:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-11.jpg",
      interiorImages: [
        {
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
          title: "Амьдрах өрөө",
          description:
            "Том гэр бүлд тохиромжтой өргөн амьдрах өрөө.",
        },
        {
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          title: "Хоолны өрөө",
          description:
            "Их хүний цуглаанд тохиромжтой том хоолны өрөө.",
        },
        {
          url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
          title: "Гал тогооны өрөө",
          description:
            "Том гэр бүлийн хэрэгцээг бүрэн хангасан гал тогооны өрөө.",
        },
        {
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
          title: "Унтлагын өрөө",
          description: "Том мастер унтлагын өрөө, гардеробтой.",
        },
        {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
          title: "Хүүхдийн өрөө",
          description:
            "Хүүхдүүдэд тохиромжтой тоглоомын талбайтай өрөө.",
        },
      ],
      panoramicView: panoramaImage,
      virtualTourUrl: "#virtual-tour",
    },
    penthouse: {
      title: "147.26м² G загвар",
      subtitle: "3 өрөө",
      price: "₮950,000,000 - ₮1,200,000,000",
      specs: {
        area: "147.26м²",
        rooms: "3",
        floors: "6-16",
        bathrooms: "4",
        view: "Зүүн, Хойд",
      },
      roomList: [
        { name: "Амьдрах өрөө", area: "55 м²" },
        { name: "Хоолны өрөө", area: "42 м²" },
        { name: "Гал тогоо", area: "28 м²" },
        { name: "Унтлагын өрөө", area: "38 м²" },
        { name: "Хүүхдийн өрөө", area: "25 м²" },
        { name: "Унтлагын өрөө 2", area: "22 м²" },
        { name: "Хүүхдийн өрөө 2", area: "20 м²" },
        { name: "Ажлын өрөө", area: "22 м²" },
        { name: "Зочны өрөө", area: "18 м²" },
        { name: "Угаалгын өрөө", area: "15 м²" },
        { name: "Ариун цэврийн өрөө", area: "12 м²" },
        { name: "Ариун цэврийн өрөө 2", area: "10 м²" },
        { name: "Ариун цэврийн өрөө 3", area: "8 м²" },
        { name: "Зочны ариун цэврийн өрөө", area: "6 м²" },
        { name: "Тагт", area: "15 м²" },
        { name: "Агуулах", area: "12 м²" },
        { name: "Дэнж", area: "35 м²" },
      ],
      floorPlan:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/floorplan/apart-g.png?v=1",
      heroImage:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-19.jpg",
      interiorImages: [
        {
          url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
          title: "Амьдрах өрөө",
          description:
            "Пентхаусын тансаг амьдрах өрөө, бүх чиглэлийн панорам харагдацтай.",
        },
        {
          url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
          title: "Хоолны өрөө",
          description:
            "VIP зочид угтахад тохиромжтой том хоолны өрөө.",
        },
        {
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          title: "Гал тогооны өрөө",
          description:
            "Мэргэжлийн шефийн техник хэрэгслээр тоноглогдсон.",
        },
        {
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
          title: "Мастер унтлагын өрөө",
          description:
            "Хотын дээд давхрын тансаг унтлагын өрөө.",
        },
        {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
          title: "Дэнж",
          description:
            "Хувийн дэн��, гадна хоол хийх боломжтой.",
        },
      ],
      panoramicView: panoramaImage,
      virtualTourUrl: "#virtual-tour",
    },
  };

  // Map the URL apartmentId to the old key format
  const oldApartmentKey = getOldApartmentKey(apartmentId);
  const apartment =
    apartmentData[
    oldApartmentKey as keyof typeof apartmentData
    ] || apartmentData.studio;

  // Handle fullscreen slider navigation
  const handlePrevImage = () => {
    setFullscreenImageIndex((prev) =>
      prev === 0
        ? apartment.interiorImages.length - 1
        : prev - 1,
    );
  };

  const handleNextImage = () => {
    setFullscreenImageIndex((prev) =>
      prev === apartment.interiorImages.length - 1
        ? 0
        : prev + 1,
    );
  };

  const openFullscreenSlider = (index: number) => {
    setFullscreenImageIndex(index);
    setIsFullscreenSliderOpen(true);
  };

  // Calculate remaining images count for studio apartment (45 total - 8 shown = 37)
  const remainingImagesCount =
    apartment.interiorImages.length - 8;

  // Handle loan calculator click
  const handleLoanCalculatorClick = () => {
    window.open(
      "https://leasing.golomtbank.com/?pld=eyJ0eXBlIjoiSE9VU0lORyJ9",
      "_blank",
    );
  };

  // Keyboard navigation for fullscreen slider and body scroll lock
  useEffect(() => {
    if (!isFullscreenSliderOpen) return;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlePrevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNextImage();
          break;
        case "Escape":
          e.preventDefault();
          setIsFullscreenSliderOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Unlock body scroll
      document.body.style.overflow = "unset";
    };
  }, [
    isFullscreenSliderOpen,
    fullscreenImageIndex,
    apartment.interiorImages.length,
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <ImageWithFallback
          src={apartment.heroImage}
          alt={apartment.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-24 left-6 bg-background/90 backdrop-blur-sm rounded-full p-3 hover:bg-background transition-all shadow-lg border border-border"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>

        {/* Apartment Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-white">
              <h1 className="text-4xl mb-2">
                {apartment.title}
              </h1>
              <p className="text-xl mb-4">
                {apartment.subtitle}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {apartment.specs.area}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {apartment.specs.rooms} өрөө
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  Давхар: {apartment.specs.floors}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* 1. Overview / Ерөнхий мэдээлэл */}
        <section>
          <h2 className="text-3xl text-foreground mb-8">
            Ерөнхий мэдээлэл
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-card rounded-lg p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Home className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground mb-1">
                    Нийт талбай
                  </h3>
                  <p className="text-muted-foreground">
                    {apartment.specs.area}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DoorOpen className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground mb-1">
                    Өрөөний тоо
                  </h3>
                  <p className="text-muted-foreground">
                    {apartment.specs.rooms} өрөө
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground mb-1">
                    Давхар
                  </h3>
                  <p className="text-muted-foreground">
                    {apartment.specs.floors}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bath className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground mb-1">
                    Ариун цэврийн өрөө
                  </h3>
                  <p className="text-muted-foreground">
                    {apartment.specs.bathrooms}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground mb-1">
                    Харагдац
                  </h3>
                  <p className="text-muted-foreground">
                    {apartment.specs.view}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Floor Plan / Байрны төлөвлөгөө */}
        <section>
          <h2 className="text-3xl text-foreground mb-8">
            Байрны төлөвлөгөө
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Room List - Left Side */}
                <div>
                  <h3 className="text-lg text-foreground mb-6">
                    Өрөөний төлөвлөлт
                  </h3>
                  <div className="overflow-hidden rounded-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/30">
                          <th className="text-left py-3 px-4 text-sm text-muted-foreground">
                            Өрөөний нэр
                          </th>
                          <th className="text-right py-3 px-4 text-sm text-muted-foreground">
                            Талбай
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {apartment.roomList.map(
                          (room, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0
                                  ? "bg-background"
                                  : "bg-muted/20"
                              }
                            >
                              <td className="py-3 px-4 text-foreground">
                                {room.name}
                              </td>
                              <td className="py-3 px-4 text-right text-muted-foreground">
                                {room.area}
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Floor Plan Image - Right Side */}
                <div className="flex justify-center">
                  <div className="max-w-full">
                    <h3 className="text-lg text-foreground mb-6">
                      Байрны зураг
                    </h3>
                    <ImageWithFallback
                      src={apartment.floorPlan}
                      alt={`${apartment.title} floor plan`}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. Interior Images / Дотоод зурагууд */}
        <section>
          <h2 className="text-3xl text-foreground mb-8">
            Дотоод засал чимэглэл
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {apartment.interiorImages
              .slice(0, 8)
              .map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer rounded-lg overflow-hidden bg-muted aspect-[4/3]"
                  onClick={() => openFullscreenSlider(index)}
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Maximize className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-sm">
                      {image.title}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Show more images button for apartments with more than 8 images */}
          {apartment.interiorImages.length > 8 && (
            <div className="text-center mt-6">
              <Button
                onClick={() => openFullscreenSlider(8)}
                variant="outline"
                className="px-8 py-3"
              >
                <Eye className="w-4 h-4 mr-2" />+
                {remainingImagesCount} зураг үзэх
              </Button>
            </div>
          )}
        </section>

        {/* 4. 360° Panoramic View / 360° Панорам харагдац */}
        <section>
          <h2 className="text-3xl text-foreground mb-8">
            360° Панорам харагдац
          </h2>

          <PanoramaViewer
            imageUrl={panoramaImage}
            title="Панорам харагдац"
            season=""
          />
        </section>

        {/* 4.5. 360° Virtual Tour / 360° Виртуал аялал */}
        <section>
          <h2 className="text-3xl text-foreground mb-8">
            360° Виртуал аялал
          </h2>
          <VirtualTour url={apartment.virtualTourUrl} />
        </section>

        {/* 5. Loan Calculator CTA / Зээлийн тооцоолуур */}
        <section>
          <div
            className="rounded-lg p-8 text-white relative overflow-hidden"
            style={{ backgroundColor: "#05357e" }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-2">
                  <ImageWithFallback
                    src={golomtBankLogo}
                    alt="Golomt Bank Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2">
                    Голомт банкны зээлийн тооцоолуур
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Таны сонгосон байрны зээлийн төлбөрийг
                    урьдчилан тооцоолж үзээрэй
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <Button
                  onClick={handleLoanCalculatorClick}
                  className="bg-white text-[#05357e] hover:bg-white/90 px-8 py-4 text-lg h-auto min-w-[220px] shadow-lg transform transition-all hover:scale-105"
                >
                  <Calculator className="w-5 h-5 mr-3" />
                  Зээлийн тооцоолуур
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Contact Information / Холбоо барих мэдээлэл */}
        <section>
          <h2 className="text-3xl text-foreground mb-8 text-center">
            Борлуулалтын алба
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Sales Representative 1 */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <ImageWithFallback
                      src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/sales/hetbold.jpg"
                      alt="А.Хэтболд"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg text-foreground mb-1">
                    А.Хэтболд
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    Ерөнхий менежер
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Үйлчилгээ түрээсийн талбай
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">
                      99191522
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">
                      khetbold@orgil.mn
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <span className="text-foreground">
                      Улаанбаатар хот, Баянзүрх дүүрэг, <br />
                      26-р хороо Их Монгол Улсын гудамж <br />
                      Энканто оффис 4 давхар
                    </span>
                  </div>
                </div>
                <a href="tel:99191522" className="w-full">
                  <Button className="w-full mt-6">
                    <Phone className="w-4 h-4 mr-2" />
                    Холбогдох
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Sales Representative 2 */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <ImageWithFallback
                      src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/sales/nomin.jpg"
                      alt="Т.Номин-Эрдэнэ"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg text-foreground mb-1">
                    Т.Номин-Эрдэнэ
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    Борлуулалтын менежер
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Байрны борлуулалт
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">
                      94058858
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">
                      nominerdene@orgil.mn
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <span className="text-foreground">
                      Улаанбаатар хот, Баянзүрх дүүрэг, <br />
                      26-р хороо Их Монгол Улсын гудамж <br />
                      Энканто оффис 4 давхар
                    </span>
                  </div>
                </div>
                <a href="tel:94058858" className="w-full">
                  <Button className="w-full mt-6">
                    <Phone className="w-4 h-4 mr-2" />
                    Холбогдох
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Sales Representative 3 */}
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <ImageWithFallback
                      src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/sales/rolomjav.jpg"
                      alt="Роломжав"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg text-foreground mb-1">
                    Роломжав
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    Борлуулалтын менежер
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Байрны борлуулалт
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">
                      94018858
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">
                      encantotown1@gmail.com
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <span className="text-foreground">
                      Улаанбаатар хот, Баянзүрх дүүрэг, <br />
                      26-р хороо Их Монгол Улсын гудамж <br />
                      Энканто оффис 4 давхар
                    </span>
                  </div>
                </div>
                <a href="tel:94018858" className="w-full">
                  <Button className="w-full mt-6">
                    <Phone className="w-4 h-4 mr-2" />
                    Холбогдох
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Fullscreen Image Slider Modal */}
      {isFullscreenSliderOpen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setIsFullscreenSliderOpen(false)}
            className="absolute top-6 right-6 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image */}
          <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center">
            <ImageWithFallback
              src={
                apartment.interiorImages[fullscreenImageIndex]
                  ?.url || ""
              }
              alt={
                apartment.interiorImages[fullscreenImageIndex]
                  ?.title || ""
              }
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Image info */}
            <div className="mt-4 text-center px-6 max-w-2xl">
              <h3 className="text-white text-xl mb-2">
                {
                  apartment.interiorImages[fullscreenImageIndex]
                    ?.title
                }
              </h3>
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 rounded-full px-4 py-2">
            <span className="text-white text-sm">
              {fullscreenImageIndex + 1} /{" "}
              {apartment.interiorImages.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}