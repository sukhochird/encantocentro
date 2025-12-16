"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Sparkles,
} from "lucide-react";

const amenitiesData = [
  {
    id: 1,
    title: "3x3 Basketball",
    titleMn: "3x3 Сагсан бөмбөг",
    description:
      "Professional basketball court for recreational sports",
    descriptionMn:
      "Амралт, спортод зориулсан мэргэжлийн сагсан бөмбөгийн талбай",
    image:
      "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/amenities/1.jpg",
    category: "outdoor",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    title: "Fountain",
    titleMn: "Усан оргилуур",
    description:
      "Elegant water fountain creating a serene atmosphere",
    descriptionMn: "Тайван орчин бүрдүүлэх гоё усан оргилуур",
    image:
      "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/amenities/2.jpg",
    category: "outdoor",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Outdoor Playground",
    titleMn: "Гадаа тоглоомын талбай",
    description:
      "Safe and modern playground for children of all ages",
    descriptionMn:
      "Бүх насны хүүхдэд зориулсан аюулгүй, орчин үеийн тоглоомын талбай",
    image:
      "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/playground/2.jpg",
    category: "outdoor",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Meeting Room",
    titleMn: "Уулзалтын өрөө",
    description:
      "Professional meeting spaces for business and community",
    descriptionMn:
      "Бизнес болон олон нийтийн уулзалтад зориулсан мэргэжлийн өрөө",
    image:
      "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/5f-lobby/13.jpg",
    category: "indoor",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: 5,
    title: "Study Room",
    titleMn: "Суралцах өрөө",
    description:
      "Quiet study spaces for learning and concentration",
    descriptionMn:
      "Суралцах болон анхаарал төвлөрүүлэхэд зориулсан чимээгүй орчин",
    image:
      "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/5f-lobby/10.jpg",
    category: "indoor",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 6,
    title: "Indoor Playground",
    titleMn: "Дотор тоглоомын талбай",
    description:
      "Climate-controlled indoor play area for year-round fun",
    descriptionMn:
      "Жилийн турш зугаалах боломжтой цаг уурын хяналттай дотуур тоглоомын талбай",
    image:
      "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/5f-lobby/16.jpg",
    category: "indoor",
    color: "from-pink-500 to-rose-500",
  },
];

export function Amenities() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-background dark:via-muted/20 dark:to-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-lg text-muted-foreground">
              Premium Facilities
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl mb-6 text-foreground relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Орчин, Тав тух
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Орон сууцны цогцолборын иргэдэд зориулсан тансаг,
            орчин үеийн үйлчилгээний талбай
          </motion.p>
        </motion.div>



        {/* Amenities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {amenitiesData.map((amenity, index) => {
            return (
              <motion.div
                key={amenity.id}
                variants={itemVariants}
                className="group relative bg-card dark:bg-card/50 border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 backdrop-blur-sm"
                whileHover={{
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
                }}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={amenity.image}
                      alt={amenity.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <motion.h3
                    className="text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
                    whileHover={{ x: 2 }}
                  >
                    {amenity.titleMn}
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground leading-relaxed text-sm"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {amenity.descriptionMn}
                  </motion.p>

                  {/* Decorative Element */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${amenity.color} w-0 group-hover:w-full transition-all duration-500`}
                  />
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${amenity.color.replace("from-", "").replace(" to-", ", ").replace("-500", "")}20, transparent)`,
                    filter: "blur(20px)",
                    transform: "scale(1.1)",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <motion.p
              className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Эдгээр бүх үйлчилгээний талбай нь олон улсын
              стандартад нийцүүлэн бүтээгдсэн бөгөөд иргэдийн
              амьдралын чанарыг дээшлүүлэх зорилготой юм.
            </motion.p>

            {/* Decorative dots */}
            <div className="flex justify-center mt-8 gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}