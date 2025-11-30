import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FullImageSection() {
  return (
    <section className="relative">
      {/* Section Title */}
      <div className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-0">
            <h2 className="text-4xl font-light text-foreground mb-2">
              Төслийн байршил
            </h2>
            <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto">
              Хотын төв хэсгийн стратегийн байршилд төгс орчин
              үеийн цогцолбор
            </p>
          </div>
        </div>
      </div>

      {/* Full Image */}
      <ImageWithFallback
        src="https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/area.png"
        alt="Хотын төв байршил"
        className="w-full h-full object-contain"
      />
    </section>
  );
}