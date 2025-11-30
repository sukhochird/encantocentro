export function Introduction() {
  return (
    <section id="танилцуулга" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Introduction */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6 relative overflow-hidden leading-tight shine-text">
            Luxury Residences & Mall
          </h1>
          <h2 className="text-xl font-normal text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            ENCANTO CENTRO 1 High-Rise Residence нь дэлхийн
            жишиг, стандартад нийцсэн Энканто таун, Энканто таур
            төслийн үргэлжлэл юм. Энэхүү төсөл Дэлхийн №1 YUANDA
            брэндийн шилэн фасад бүхий, орон зайн оновчтой
            төлөвлөлттэй тансаг зэрэглэлийн орон сууц, худалдаа
            үйлчилгээний төв юм.
          </h2>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-medium text-foreground mb-2">
                600
              </div>
              <p className="font-light text-muted-foreground">
                Өндөр зэрэглэлийн орон сууц
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-medium text-foreground mb-2">
                24,000м²
              </div>
              <p className="font-light text-muted-foreground">
                Худалдаа үйлчилгээний төв
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-medium text-foreground mb-2">
                950
              </div>
              <p className="font-light text-muted-foreground">
                Автомашины зогсоол
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-medium text-foreground mb-2">
                13,000м²
              </div>
              <p className="font-light text-muted-foreground">
                Ногоон байгууламж
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}