"use client";

import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import {
  Shield,
  Dumbbell,
  Car,
  TreePine,
  Briefcase,
  Train,
  Building,
  Square,
  Wind,
  ArrowUpDown,
  Wrench,
  Layout,
} from "lucide-react";

export function KeyAdvantages() {
  const [selectedAdvantage, setSelectedAdvantage] = useState(0);

  const advantages = [
    {
      title: "Өндөр чанартай барилгын хийц",
      description:
        "Олон улсын стандартад нийцсэн өндөр бат бэх материал",
      detailDescription:
        "OXУ-аас импортлогч Улаанбаатар Менежмент ХХК-ийн A500СП маркийн арматур, Премиум Конкрит ХХК-ийн M400-M450 маркийн өндөр бат бэхтэй бетон, төмөр бетон каркастай.",
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/advantages/1.jpg",
      icon: Building,

      features: [
        "A500СП маркийн өндөр чанарын арматур",
        "M400-M450 өндөр бат бэхтэй бетон",
        "Төмөр бетон каркас",
        "Олон улсын стандартын дагуу",
      ],
    },
    {
      title: "Шилэн фасад",
      description: "Дэлхийн №1 брэндийн LOW-E шилтэй фасад",
      detailDescription:
        "YUANDA (БНХАУ) үйлдвэрийн шалнаас тааз хүртэл өндөр, хэт ягаан туяа бууруулагч LOW-E түрхэлтэй, гүйцэтгэсэн шилэн фасад.",
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/advantages/2.jpg",
      icon: Square,

      features: [
        "Шалнаас тааз хүртэл өндөр",
        "Хэт ягаан туяа бууруулагч",
        "LOW-E түрхэлтэй",
        "Ганжуулсан 3-н давхар шил",
      ],
    },
    {
      title: "Агаар цэвэршүүлэх систем",
      description: "Жилийн турш цэвэр, шинэхэн агаар",
      detailDescription:
        "Орчны агаарыг цэвэршүүлж, улирал бүрт тохирсон температур, чийгшил, үнэргүй, бактергүй орчин бүрдүүлдэг дэвшилтэт систем.",
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/advantages/3.jpg",
      icon: Wind,

      features: [
        "Агаар шүүлтүүр",
        "Чийгшил тохируулагч",
        "Температур хянагч",
        "Бохирдлыг бүрэн цэвэршүүлэх",
      ],
    },
    {
      title: "Өндөр хурдны лифт",
      description: "3 ширхэг өндөр хурдны лифт",
      detailDescription:
        "Оршин суугчдын тав тухтай, хурдан зорчих нөхцөлийг бүрдүүлсэн 3 ширхэг өндөр хурдны лифттэй.",
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/5f-lobby/kone.jpg",
      icon: ArrowUpDown,

      features: [
        "Өндөр хурдтай",
        "Аюулгүй ажиллагааны системтэй",
        "Дуу чимээ багатай",
        "Тав тухтай зорчих орчин",
      ],
    },
    {
      title: "Чанартай инженерийн шийдэл",
      description: "БНСУ, Итали, Герман брэндийн шийдлүүд",
      detailDescription:
        "SEOWON усны систем, GENERAL FITTINGS шалны халаалт, CLASSEN паркетан шал, ILJINGATE ган хаалга гэх мэт олон улсын брэндийн шийдэл.",
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/advantages/5.jpg",
      icon: Wrench,

      features: [
        "SEOWON усны систем",
        "GENERAL FITTINGS шалны халаалт",
        "CLASSEN паркетан шал",
        "ILJINGATE ган хаалга",
      ],
    },
    {
      title: "Дотоод дизайн",
      description:
        "Турк улсын Gonye Tasarim компанийн интерьер",
      detailDescription:
        "Интерьер дизайныг Турк улсын Gonye Tasarim компанийн мэргэжилтнүүд хийж гүйцэтгэсэн.",
      image:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/advantages/6.jpg",
      icon: Layout,

      features: [
        "Орчин үеийн интерьер",
        "Өндөр чанартай материал",
        "Тав тухтай төлөвлөлт",
        "Luxury загвар",
      ],
    },
  ];

  return (
    <section id="давуу-тал" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-foreground mb-6">
            Гол давуу талууд
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ENCANTO CENTRO нь орчин үеийн амьдралын бүх
            хэрэгцээг хангасан иж бүрэн төв юм
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Sidebar - Advantages List */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {advantages.map((advantage, index) => {
                const IconComponent = advantage.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedAdvantage(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      selectedAdvantage === index
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedAdvantage === index
                            ? "bg-primary-foreground/20"
                            : "bg-background"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${
                            selectedAdvantage === index
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`mb-1 font-semibold ${
                            selectedAdvantage === index
                              ? "text-primary-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {advantage.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            selectedAdvantage === index
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content - Selected Advantage Details */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedAdvantage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-lg overflow-hidden border border-border"
            >
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <ImageWithFallback
                  src={advantages[selectedAdvantage].image}
                  alt={advantages[selectedAdvantage].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-6 left-6 w-12 h-12 bg-background rounded-lg flex items-center justify-center shadow-sm">
                  {(() => {
                    const IconComponent =
                      advantages[selectedAdvantage].icon;
                    return (
                      <IconComponent className="w-6 h-6 text-foreground" />
                    );
                  })()}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl text-card-foreground mb-4">
                  {advantages[selectedAdvantage].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {
                    advantages[selectedAdvantage]
                      .detailDescription
                  }
                </p>

                {/* Features List */}
                <div className="space-y-3">
                  <h4 className="text-card-foreground mb-3">
                    Онцлог шинж чанарууд:
                  </h4>
                  {advantages[selectedAdvantage].features.map(
                    (feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                        <span className="text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}