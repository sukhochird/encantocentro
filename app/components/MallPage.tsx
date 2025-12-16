"use client";

const image_d21dceb4c080eb6e243c85f06e3aa44523400894 = "/assets/d21dceb4c080eb6e243c85f06e3aa44523400894.png";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Header } from "./Header";
import { GoToTop } from "./GoToTop";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { fetchFloorPlans, fetchBrands, type FloorPlan, type Brand } from "@/app/services/commercialApi";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import {
  ShoppingBag,
  Building2,
  Car,
  Users,
  Play,
  Wifi,
  Baby,
  Crown,
  Globe,
  Shield,
  Coffee,
  Smartphone,
  Square,
} from "lucide-react";

// Animated Counter Component
function AnimatedCounter({
  value,
  duration = 2000,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1,
      );

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <div
      ref={countRef}
      className="text-4xl md:text-5xl font-light text-foreground mb-2"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export function MallPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  // Remove pagination state as we'll show all brands
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  // State for floors and brands from API
  const [floors, setFloors] = useState<FloorPlan[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoadingFloors, setIsLoadingFloors] = useState(true);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [floorsError, setFloorsError] = useState<string | null>(null);
  const [brandsError, setBrandsError] = useState<string | null>(null);

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleNavigateToCommercial = () => {
    // Already on mall page
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch floor plans from API
  useEffect(() => {
    const loadFloors = async () => {
      try {
        setIsLoadingFloors(true);
        setFloorsError(null);
        const data = await fetchFloorPlans();
        setFloors(data);
      } catch (error) {
        console.error("Failed to load floors from API, using fallback data:", error);
        setFloorsError(error instanceof Error ? error.message : "Unknown error");
        // Fallback to hardcoded data
        setFloors([
          {
            id: 1,
            title: "1-р давхар",
            subtitle: "Дэлгүүр & Үйлчилгээ",
            image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/mallplan/1.png",
            order: 1,
          },
          {
            id: 2,
            title: "2-р давхар",
            subtitle: "Загвар & Амьдралын хэв маяг",
            image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/mallplan/2.png",
            order: 2,
          },
          {
            id: 3,
            title: "3-р давхар",
            subtitle: "Хоол & Зугаа цэнгэл",
            image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/mallplan/3.png",
            order: 3,
          },
          {
            id: 4,
            title: "4-р давхар",
            subtitle: "Кино & Амралт",
            image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/mallplan/4.png",
            order: 4,
          },
        ]);
      } finally {
        setIsLoadingFloors(false);
      }
    };

    loadFloors();
  }, []);

  // Fetch brands from API
  useEffect(() => {
    const loadBrands = async () => {
      try {
        setIsLoadingBrands(true);
        setBrandsError(null);
        const data = await fetchBrands();
        setBrands(data);
      } catch (error) {
        console.error("Failed to load brands from API, using fallback data:", error);
        setBrandsError(error instanceof Error ? error.message : "Unknown error");
        // Fallback to hardcoded data
        setBrands([
          { id: 1, name: "Megacoffee", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/megacoffee.jpg", order: 1 },
          { id: 2, name: "Kumo Bakery", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/kumobakery.jpg", order: 2 },
          { id: 3, name: "Leo Patisserie", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/leopatisserie.jpg", order: 3 },
          { id: 4, name: "Bites Co", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/bites.jpg", order: 4 },
          { id: 5, name: "Arig Anya", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/ariganya.jpg", order: 5 },
          { id: 6, name: "Original Marines", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/originalmarines.png", order: 6 },
          { id: 7, name: "Miniso", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/miniso.jpg", order: 7 },
          { id: 8, name: "Bishrelt beauty", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/bishrelt.jpg", order: 8 },
          { id: 9, name: "Ази фарм", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/asiapharma.jpg", order: 9 },
          { id: 10, name: "Focus Optical", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/focusoptical.jpg", order: 10 },
          { id: 11, name: "Techsquad", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/techsquad.jpg", order: 11 },
          { id: 12, name: "Technozone", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/technozone.jpg", order: 12 },
          { id: 13, name: "Monos Ulaanbaatar", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/monos.jpg", order: 13 },
          { id: 14, name: "Bala Bala", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/balabala.jpg", order: 14 },
          { id: 15, name: "Semir", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/semir.jpg", order: 15 },
          { id: 16, name: "Asahi", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/asahi.jpg", order: 16 },
          { id: 17, name: "Ecovax", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/ecovacs.png", order: 17 },
          { id: 18, name: "Astoria", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/astoria.jpg", order: 18 },
          { id: 19, name: "TDB", image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/brands/tdb.jpg", order: 19 },
        ]);
      } finally {
        setIsLoadingBrands(false);
      }
    };

    loadBrands();
  }, []);

  // Statistics data
  const statistics = [
    {
      value: 50,
      suffix: "+",
      label: "Брэнд",
      icon: ShoppingBag,
    },
    { value: 4, suffix: "", label: "Давхар", icon: Building2 },
    {
      value: 24000,
      suffix: "",
      label: "м² Талбай",
      icon: Square,
    },
    {
      value: 950,
      suffix: "+",
      label: "Машины зогсоол",
      icon: Car,
    },
  ];

  // Use floors and brands from state (loaded from API or fallback)

  return (
    <div className="inter-thin">
      <Header
        onNavigateToCommercial={handleNavigateToCommercial}
      />

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <ImageWithFallback
            src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/14.jpg"
            alt="Shopping mall exterior facade"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* 2. Introduction Section - Redesigned */}
      <section className="relative py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />

          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/60 rounded-full blur-3xl" />
          </div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left side - Enhanced Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 px-4 py-2"
                >
                  Luxury Residences & Mall
                </Badge>
              </motion.div>

              {/* Title with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-tight">
                  <span className="shine-text">ENCANTO</span>
                  <br />
                  <span className="text-primary/80">
                    CENTRO MALL
                  </span>
                </h2>
              </motion.div>

              {/* Content cards */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-none bg-white/50 dark:bg-black/20 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-lg text-foreground/90 leading-relaxed">
                        <span className="font-medium text-primary">
                          Улаанбаатар хотын А бүсэд,{" "}
                        </span>{" "}
                        Сүхбаатарын талбайгаас баруун урагшаа
                        900м зайд, СБД-ийн 3-р хороо, Аса
                        циркийн чанх урд, Сант сургуулийн баруун
                        талд, нарны зам дагуу 3.5 га газрыг
                        хамран байрлах бөгөөд их хотын түгжрэл
                        хамгийн багатай, төрийн болон хувийн
                        өмчийн томоохон байгууллага, худалдаа,
                        үйлчилгээний төвүүд, Ерөнхий боловсролын
                        сургууль, цэцэрлэгүүдтэй хамгийн ойр
                        байрлаж байгаа гэдгээрээ давуу талтай
                        юм.{" "}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-none bg-white/50 dark:bg-black/20 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-lg text-foreground/90 leading-relaxed">
                        <span className="font-medium text-primary">
                          100 гаруй олон улсын брэнд
                        </span>
                        , олон төрлийн хоолны сонголт, дэвшилтэт
                        тоног төхөөрөмжөөр танд хэрэгтэй бүх
                        зүйлийг нэг дор олж авах боломжийг
                        бидний өгдөг.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Enhanced Video Presentation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Floating decorations */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-8 -left-8 w-16 h-16 bg-primary/20 rounded-2xl blur-sm"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary/30 rounded-full blur-sm"
                />

                {/* Enhanced Video Container */}
                <div className="relative w-4/5 max-w-sm lg:max-w-md xl:max-w-lg aspect-[9/16] bg-gradient-to-br from-muted to-muted/50 rounded-3xl shadow-2xl overflow-hidden group border border-white/20">
                  {/* Video */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    controls
                    poster="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/video-poster.png"
                    preload="metadata"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source
                      src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/intro.mp4"
                      type="video/mp4"
                    />
                    <p className="text-muted-foreground p-4">
                      Таны хөтөч видео дэмждэггүй байна.
                      Танилцуулгын видеог үзэхийн тулд хөтчөө
                      шинэчлэнэ үү.
                    </p>
                  </video>

                  {/* Enhanced Play/Pause overlay */}
                  {!isVideoPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent flex items-center justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          size="lg"
                          className="bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full w-16 h-16 p-0"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.play();
                            }
                          }}
                        >
                          <Play className="w-8 h-8 ml-1" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Info badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                >
                  <Badge className="bg-background/90 backdrop-blur-sm text-foreground border border-border shadow-lg px-4 py-2">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Танилцуулга видео
                  </Badge>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Exterior Design Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main large image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-none">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/14.jpg"
                    alt="Mall main exterior facade"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Second image - same height as first */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 border-none">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/11.jpg"
                    alt="Mall entrance design"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Bottom row - three smaller images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Bottom left image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 border-none">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/13.jpg"
                    alt="Mall architectural details"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Bottom center image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 border-none">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/12.jpg"
                    alt="Mall side view"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Bottom right image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 border-none">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/15.jpg"
                    alt="Mall night view"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Features highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Орчин үеийн архитектур
                </h3>
                <p className="text-muted-foreground text-sm">
                  Дэвшилтэт барилгын технологи, тоноглол
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Хотын төв цэгт
                </h3>
                <p className="text-muted-foreground text-sm">
                  Хотын төв цэгт, Үнэ цэнэтэй байршил
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Дээд зэргийн чанар
                </h3>
                <p className="text-muted-foreground text-sm">
                  Олон улсын стандартын барилгын материал
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Statistics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="text-center p-8 border-none bg-white/50 dark:bg-black/20 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-black/30 transition-all duration-300 group-hover:shadow-xl">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                    <p className="text-lg text-muted-foreground">
                      {stat.label}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Floor Plan Section with Tabs */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-6"
            >
              ДАВХАРЫН ТӨЛӨВЛӨЛТ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Давхар бүрийн{" "}
              <span className="text-primary">төлөвлөлт</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              4 давхар бүр өөр өөрийн онцлог, зориулалттай
              төлөвлөгдсөн
            </p>
          </motion.div>

          {/* Floor plan tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="1" className="w-full">
              {isLoadingFloors ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Давхрын төлөвлөлт ачаалж байна...</p>
                </div>
              ) : (
                <>
                  <TabsList className="grid w-full grid-cols-4 mb-12">
                    {floors.map((floor) => (
                      <TabsTrigger
                        key={floor.id}
                        value={floor.id.toString()}
                      >
                        {floor.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {floors.map((floor) => (
                <TabsContent
                  key={floor.id}
                  value={floor.id.toString()}
                  className="mt-8"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="overflow-hidden border-none bg-white/50 dark:bg-black/20 backdrop-blur-sm shadow-xl">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <ImageWithFallback
                          src={floor.image}
                          alt={`${floor.title} floor plan`}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>
                  ))}
                </>
              )}
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* 6. Featured Brands Section */}
      <section className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-6"
            >
              БРЭНДҮҮД
            </Badge>
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Бидэнтэй нэгдсэн{" "}
              <span className="text-primary">брэндүүд</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Олон улсын алдартай брэндүүдээс эхлээд орон
              нутгийн чанартай бүтээгдэхүүн хүртэл
            </p>
          </motion.div>

          {/* Enhanced brand grid - 4 columns with names below */}
          {isLoadingBrands ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Брэндүүд ачаалж байна...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <Card className="border-none bg-white/40 dark:bg-black/30 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-black/40 transition-all duration-300 overflow-hidden mb-3">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Card>
                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {brand.name}
                </h3>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="p-12 border-none bg-white/70 dark:bg-black/30 backdrop-blur-sm shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                    <ImageWithFallback
                      src={
                        image_d21dceb4c080eb6e243c85f06e3aa44523400894
                      }
                      alt="А.Хэтболд - Борлуулалтын менежер"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex-1 text-center lg:text-left"
                >
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 px-3 py-1 mb-4"
                  >
                    Ерөнхий менежер
                  </Badge>

                  <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-2">
                    А.Хэтболд
                  </h3>

                  <p className="text-lg text-muted-foreground mb-6">
                    Үйлчилгээ түрээсийн талбай
                  </p>

                  <p className="text-foreground/80 mb-8 leading-relaxed">
                    Encanto Centro Mall-ын худалдаа үйлчилгээний
                    талбайн түрээсийн талаар дэлгэрэнгүй
                    мэдээлэл авахыг хүсвэл надтай холбогдоорой.
                  </p>

                  {/* Contact Info & Call Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-3 text-foreground">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <span className="text-lg">99191522</span>
                    </div>

                    <a
                      href="tel:99191522"
                      className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-base font-light leading-tight"
                    >
                      <Smartphone className="w-5 h-5 mr-2" />
                      Залгах
                    </a>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
      <GoToTop />
    </div>
  );
}