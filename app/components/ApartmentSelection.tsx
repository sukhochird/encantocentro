"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface ApartmentSelectionProps {
  onViewDetail?: (apartmentId: string) => void;
}

interface ApartmentType {
  title: string;
  subtitle: string;
  modelType: string;
  specs: {
    area: string;
    rooms: string;
    floors: string;
    bathrooms: string;
    view: string;
  };
  image: string;
  images?: string[];
}

export function ApartmentSelection({
  onViewDetail,
}: ApartmentSelectionProps) {
  const router = useRouter();
  const [selectedApartment, setSelectedApartment] =
    useState("studio");
  const [api, setApi] = useState<CarouselApi>();

  // URL mapping function
  const getApartmentUrl = (oldKey: string): string => {
    const urlMapping: { [key: string]: string } = {
      studio: "apart-A",
      "1bedroom": "apart-B",
      "2bedroom": "apart-C",
      deluxe: "apart-D",
      premium: "apart-E",
      family: "apart-F",
      penthouse: "apart-G",
    };
    return urlMapping[oldKey] || oldKey;
  };

  // Generate image URLs for A model (45 images)
  const generateAModelImages = () => {
    const images = [];
    for (let i = 1; i <= 45; i++) {
      images.push(
        `https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-a/A-${i}.jpg`,
      );
    }
    return images;
  };

  const apartments = {
    studio: {
      title: "253.44м² А загвар",
      subtitle: "5 өрөө",
      modelType: "A загвар",
      specs: {
        area: "253.44м²",
        rooms: "5",
        floors: "17-24",
        bathrooms: "4",
        view: "Урд, Баруун, Хойд",
      },
      images: generateAModelImages(),
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-a/A-1.jpg",
    },
    "1bedroom": {
      title: "209.75м² B загвар",
      subtitle: "5 өрөө",
      modelType: "B загвар",
      specs: {
        area: "209.75м²",
        rooms: "5",
        floors: "17-24",
        bathrooms: "3+1",
        view: "Урд, Зүүн",
      },
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-b/B-4.jpg",
    },
    "2bedroom": {
      title: "144,18м² B Загвар",
      subtitle: "3 өрөө",
      modelType: "C загвар",
      specs: {
        area: "144,18м²",
        rooms: "3",
        floors: "17-24",
        bathrooms: "3+1",
        view: "Зүүн, хойд",
      },
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-05.jpg",
    },
    deluxe: {
      title: "165.44м² D загвар",
      subtitle: "4 өрөө",
      modelType: "D загвар",
      specs: {
        area: "165.44м²",
        rooms: "4",
        floors: "6-16",
        bathrooms: "2+1",
        view: "Зүүн, урд",
      },
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-06.jpg",
    },
    premium: {
      title: "158,86м² E загвар",
      subtitle: "4 өрөө",
      modelType: "E загвар",
      specs: {
        area: "158,86м²",
        rooms: "4",
        floors: "6-16",
        bathrooms: "2+1",
        view: "Баруун, урд",
      },
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-10.jpg",
    },
    family: {
      title: "129,1м² F загвар",
      subtitle: "3 өрөө",
      modelType: "F загвар",
      specs: {
        area: "129,1м²",
        rooms: "3",
        floors: "6-16",
        bathrooms: "2",
        view: "Баруун, хойд",
      },
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-11.jpg",
    },
    penthouse: {
      title: "147.26м² G загвар",
      subtitle: "3 өрөө",
      modelType: "G загвар",
      specs: {
        area: "147.26м² ",
        rooms: "3",
        floors: "6-16",
        bathrooms: "2+1",
        view: "Зүүн, Хойд",
      },
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-19.jpg",
    },
  };

  const apartmentKeys = Object.keys(apartments);

  // Sync carousel with tabs
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      const selectedKey = apartmentKeys[selectedIndex];
      if (selectedKey && selectedKey !== selectedApartment) {
        setSelectedApartment(selectedKey);
      }
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, selectedApartment, apartmentKeys]);

  // Handle tab changes to sync with carousel
  const handleTabChange = useCallback(
    (value: string) => {
      setSelectedApartment(value);
      if (api) {
        const index = apartmentKeys.indexOf(value);
        if (index !== -1) {
          api.scrollTo(index);
        }
      }
    },
    [api, apartmentKeys],
  );

  const handleViewDetail = (apartmentId: string) => {
    if (onViewDetail) {
      // Map old apartment ID to new URL format
      const newApartmentId = getApartmentUrl(apartmentId);
      onViewDetail(newApartmentId);
    } else {
      // Default: navigate using Next.js router
      const newApartmentId = getApartmentUrl(apartmentId);
      router.push(`/apartment/${newApartmentId}`);
    }
  };

  return (
    <section id="орон-сууц" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-foreground mb-6">
            Байрны сонголт
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Таны амьдралын хэв маяг, хэрэгцээнд тохирсон төгс
            байрыг сонгоно уу
          </p>
        </div>

        <Tabs
          value={selectedApartment}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {/* Tabs Navigation */}
          <div className="w-full mb-8">
            <div className="overflow-x-auto pb-2 px-1">
              <TabsList className="inline-flex h-auto p-1 bg-muted rounded-full min-w-full w-max">
                <TabsTrigger
                  value="studio"
                  className="rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm min-w-0 text-center"
                >
                  A загвар - 5 өрөө
                </TabsTrigger>
                <TabsTrigger
                  value="1bedroom"
                  className="rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm min-w-0 text-center"
                >
                  B загвар - 5 өрөө
                </TabsTrigger>
                <TabsTrigger
                  value="2bedroom"
                  className="rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm min-w-0 text-center"
                >
                  C загвар - 3 өрөө
                </TabsTrigger>
                <TabsTrigger
                  value="deluxe"
                  className="rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm min-w-0 text-center"
                >
                  D загвар - 4 өрөө
                </TabsTrigger>
                <TabsTrigger
                  value="premium"
                  className="rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm min-w-0 text-center"
                >
                  E загвар - 4 өрөө
                </TabsTrigger>
                <TabsTrigger
                  value="family"
                  className="rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm min-w-0 text-center"
                >
                  F загвар - 3 өрөө
                </TabsTrigger>
                <TabsTrigger
                  value="penthouse"
                  className="rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm min-w-0 text-center"
                >
                  G загвар - 3 өрөө
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {apartmentKeys.map((key) => {
                  const apartment =
                    apartments[key as keyof typeof apartments];
                  return (
                    <CarouselItem key={key}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="overflow-hidden min-h-[400px]">
                          <CardContent className="p-0 h-full pt-[0px] pr-[0px] pb-[23px] pl-[0px]">
                            <div className="grid md:grid-cols-2 gap-0 h-full">
                              <div className="relative min-h-[400px] md:min-h-full">
                                <ImageWithFallback
                                  src={
                                    "images" in apartment && apartment.images
                                      ? apartment.images[0]
                                      : apartment.image
                                  }
                                  alt={apartment.title}
                                  className="w-full h-full object-cover"
                                />
                                {"images" in apartment &&
                                  apartment.images &&
                                  apartment.images.length >
                                    1 && (
                                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                      +
                                      {apartment.images.length -
                                        1}{" "}
                                      зураг
                                    </div>
                                  )}
                              </div>
                              <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-8">
                                  <div className="mb-3">
                                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-3">
                                      {apartment.modelType}
                                    </span>
                                  </div>
                                  <h3 className="text-3xl text-card-foreground mb-1">
                                    {apartment.title}
                                  </h3>
                                  <p className="text-lg text-muted-foreground">
                                    {apartment.subtitle}
                                  </p>
                                </div>

                                {/* Technical Specifications as List */}
                                <div className="space-y-4 mb-8">
                                  <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground">
                                      Нийт талбайн хэмжээ:
                                    </span>
                                    <span className="text-card-foreground">
                                      {apartment.specs.area}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground">
                                      Өрөөний тоо:
                                    </span>
                                    <span className="text-card-foreground">
                                      {apartment.specs.rooms}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground">
                                      Давхарын сонголт:
                                    </span>
                                    <span className="text-card-foreground">
                                      {apartment.specs.floors}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground">
                                      Ариун цэврийн өрөө:
                                    </span>
                                    <span className="text-card-foreground">
                                      {
                                        apartment.specs
                                          .bathrooms
                                      }
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center py-2">
                                    <span className="text-muted-foreground">
                                      Харагдац:
                                    </span>
                                    <span className="text-card-foreground">
                                      {apartment.specs.view}
                                    </span>
                                  </div>
                                </div>

                                <Button
                                  className="w-fit bg-primary text-primary-foreground hover:bg-primary/90 px-8 group relative overflow-hidden"
                                  onClick={() =>
                                    handleViewDetail(key)
                                  }
                                >
                                  <span className="relative z-10 flex items-center gap-2">
                                    Дэлгэрэнгүй үзэх
                                    <motion.div
                                      animate={{
                                        x: [0, 4, 0],
                                        scale: [1, 1.1, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                      className="flex items-center"
                                    >
                                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </motion.div>
                                  </span>
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{
                                      duration: 0.2,
                                    }}
                                  />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Navigation Arrows */}
              <div className="hidden md:block">
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm border border-border hover:bg-background" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm border border-border hover:bg-background" />
              </div>
            </Carousel>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {apartmentKeys.map((key, index) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  selectedApartment === key
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Go to apartment ${index + 1}`}
              />
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}