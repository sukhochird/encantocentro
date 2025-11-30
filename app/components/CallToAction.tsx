import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Phone, 
  Mail, 
  ArrowRight, 
  Users, 
  Award, 
  Calendar,
  MapPin,
  Star
} from "lucide-react";

interface CallToActionProps {
  isDarkMode?: boolean;
}

export function CallToAction({ isDarkMode = false }: CallToActionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const benefits = [
    {
      icon: Award,
      title: "Чанартай үйлчилгээ",
      description: "Мэргэжлийн багийн дэмжлэг"
    },
    {
      icon: Users,
      title: "Туршлагатай баг",
      description: "10+ жилийн туршлага"
    },
    {
      icon: Calendar,
      title: "Хурдан үйлчилгээ",
      description: "24/7 дэмжлэг үзүүлнэ"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <Badge 
              variant="secondary" 
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2"
            >
              ⭐ Шилдэг сонголт
            </Badge>

            {/* Main heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight">
                <span className="shine-text">Бидэнтэй нэгдээрэй</span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground">
                  захиалгаа өгөөрэй
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Энканто Центро-ийн орон сууц болон арилжааны талбайгаас 
                өөрийн хүссэн орон зайг сонгоод манайд захиалга өгөөрэй. 
                Бид танд хамгийн сайн үнэ, чанартай үйлчилгээг санал болгож байна.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="text-center space-y-2"
                >
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredCard === index 
                      ? 'bg-primary text-primary-foreground scale-110' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Залгаад захиалах
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="group px-8 py-3 border-2 hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="w-5 h-5 mr-2" />
                Имэйлээр холбогдох
              </Button>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+976 9919-1522</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>УБ, Баянзүрх дүүрэг</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1">4.9/5</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large featured image */}
              <Card className="col-span-2 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/9]">
                    <ImageWithFallback
                      src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/14.jpg"
                      alt="Encanto Centro Building"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-light mb-1">Энканто Центро</h3>
                      <p className="text-white/80 text-sm">Орчин үеийн амьдралын хэв маяг</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Smaller images */}
              <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=400&fit=crop"
                      alt="Modern apartment interior"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <p className="text-xs font-medium">Орон сууц</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop"
                      alt="Commercial office space"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <p className="text-xs font-medium">Арилжааны талбай</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-border"
            >
              <div className="text-center">
                <div className="text-2xl font-light text-primary">100+</div>
                <div className="text-xs text-muted-foreground">Сэтгэл хангалуун үйлчлүүлэгч</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-xl text-white"
            >
              <div className="text-center">
                <div className="text-2xl font-light">24/7</div>
                <div className="text-xs opacity-90">Дэмжлэг</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}