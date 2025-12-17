import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://encantocentro.mn"),
  title: {
    default: "Encanto Centro - High Rise Residence & Mall",
    template: "%s | Encanto Centro",
  },
  description: "Энканто Сентро - Орчин үеийн орон сууцны цогцолбор. Дэлхийн №1 YUANDA брэндийн шилэн фасад бүхий тансаг зэрэглэлийн орон сууц, худалдаа үйлчилгээний төв.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "Encanto Centro",
                  "url": "https://encantocentro.mn/",
                  "logo": "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/cento-logo.webp",
                  "sameAs": [
                    "https://www.facebook.com/EncantoTower"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "name": "Encanto Centro - Mall & Residence",
                  "image": "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/3.jpg",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Encanto Centro - Mall & Residence",
                    "addressLocality": "Ulaanbaatar",
                    "addressCountry": "MN"
                  },
                  "telephone": "+976 99429967",
                  "openingHours": "Mo-Su 10:00-22:00"
                },
                {
                  "@type": "ItemList",
                  "name": "Encanto Centro Apartments",
                  "itemListElement": [
                    {
                      "@type": "Product",
                      "position": 1,
                      "name": "A загвар",
                      "description": "A загвар - 253.44m2 5 өрөө",
                      "image": "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-a/A-1.jpg",
                      "floorSize": {
                        "@type": "QuantitativeValue",
                        "value": 253.44,
                        "unitCode": "M2"
                      },
                      "offers": {
                        "@type": "Offer",
                        "url": "https://encantocentro.mn/apartment/apart-A",
                        "priceCurrency": "MNT",
                        "price": "1",
                        "availability": "https://schema.org/InStock",
                        "seller": {
                          "@type": "Organization",
                          "name": "Encanto Centro"
                        }
                      },
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "reviewCount": "12"
                      },
                      "review": [
                        {
                          "@type": "Review",
                          "author": {
                            "@type": "Person",
                            "name": "Bilegt"
                          },
                          "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5",
                            "bestRating": "5"
                          },
                          "reviewBody": "Тав тухтай, тохилог байранд амьдрахад таатай."
                        },
                        {
                          "@type": "Review",
                          "author": {
                            "@type": "Person",
                            "name": "Naraa"
                          },
                          "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "4",
                            "bestRating": "5"
                          },
                          "reviewBody": "Давхарын зохион байгуулалт сайн, гэрэлтүүлэг хангалттай."
                        }
                      ]
                    },
                    {
                      "@type": "Product",
                      "position": 2,
                      "name": "B загвар",
                      "description": "B загвар - 209.75m2 5 өрөө",
                      "image": "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-b/B-4.jpg",
                      "floorSize": {
                        "@type": "QuantitativeValue",
                        "value": 209.75,
                        "unitCode": "M2"
                      },
                      "offers": {
                        "@type": "Offer",
                        "url": "https://encantocentro.mn/apartment/apart-B",
                        "priceCurrency": "MNT",
                        "price": "1",
                        "availability": "https://schema.org/InStock",
                        "seller": {
                          "@type": "Organization",
                          "name": "Encanto Centro"
                        }
                      },
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.7",
                        "reviewCount": "10"
                      },
                      "review": [
                        {
                          "@type": "Review",
                          "author": {
                            "@type": "Person",
                            "name": "Bold"
                          },
                          "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5",
                            "bestRating": "5"
                          },
                          "reviewBody": "Гэр бүлд тохиромжтой, байрны байршил сайхан."
                        }
                      ]
                    },
                    {
                      "@type": "Product",
                      "position": 3,
                      "name": "C загвар",
                      "description": "C загвар - 144.18m2 3 өрөө",
                      "image": "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-05.jpg",
                      "floorSize": {
                        "@type": "QuantitativeValue",
                        "value": 144.18,
                        "unitCode": "M2"
                      },
                      "offers": {
                        "@type": "Offer",
                        "url": "https://encantocentro.mn/apartment/apart-C",
                        "priceCurrency": "MNT",
                        "price": "1",
                        "availability": "https://schema.org/InStock",
                        "seller": {
                          "@type": "Organization",
                          "name": "Encanto Centro"
                        }
                      },
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.6",
                        "reviewCount": "8"
                      },
                      "review": [
                        {
                          "@type": "Review",
                          "author": {
                            "@type": "Person",
                            "name": "Enkh"
                          },
                          "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5",
                            "bestRating": "5"
                          },
                          "reviewBody": "Дээд давхрын view сайхан, орчны амгалан."
                        }
                      ]
                    },
                    {
                      "@type": "Product",
                      "position": 4,
                      "name": "D загвар",
                      "description": "D загвар - 144.18m2 3 өрөө",
                      "image": "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-06.jpg",
                      "floorSize": {
                        "@type": "QuantitativeValue",
                        "value": 144.18,
                        "unitCode": "M2"
                      },
                      "offers": {
                        "@type": "Offer",
                        "url": "https://encantocentro.mn/apartment/apart-D",
                        "priceCurrency": "MNT",
                        "price": "1",
                        "availability": "https://schema.org/InStock",
                        "seller": {
                          "@type": "Organization",
                          "name": "Encanto Centro"
                        }
                      },
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.6",
                        "reviewCount": "7"
                      },
                      "review": []
                    },
                    {
                      "@type": "Product",
                      "position": 5,
                      "name": "E загвар",
                      "description": "E загвар - 158.86m2 4 өрөө",
                      "image": "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-10.jpg",
                      "floorSize": {
                        "@type": "QuantitativeValue",
                        "value": 158.86,
                        "unitCode": "M2"
                      },
                      "offers": {
                        "@type": "Offer",
                        "url": "https://encantocentro.mn/apartment/apart-E",
                        "priceCurrency": "MNT",
                        "price": "1",
                        "availability": "https://schema.org/InStock",
                        "seller": {
                          "@type": "Organization",
                          "name": "Encanto Centro"
                        }
                      },
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.7",
                        "reviewCount": "9"
                      },
                      "review": []
                    },
                    {
                      "@type": "Product",
                      "position": 6,
                      "name": "F загвар",
                      "description": "F загвар - 129.1m2 3 өрөө",
                      "image": "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-11.jpg",
                      "floorSize": {
                        "@type": "QuantitativeValue",
                        "value": 129.1,
                        "unitCode": "M2"
                      },
                      "offers": {
                        "@type": "Offer",
                        "url": "https://encantocentro.mn/apartment/apart-F",
                        "priceCurrency": "MNT",
                        "price": "1",
                        "availability": "https://schema.org/InStock",
                        "seller": {
                          "@type": "Organization",
                          "name": "Encanto Centro"
                        }
                      },
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.5",
                        "reviewCount": "6"
                      },
                      "review": []
                    },
                    {
                      "@type": "Product",
                      "position": 7,
                      "name": "G загвар",
                      "description": "G загвар - 147.26m2 3 өрөө",
                      "image": "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-19.jpg",
                      "floorSize": {
                        "@type": "QuantitativeValue",
                        "value": 147.26,
                        "unitCode": "M2"
                      },
                      "offers": {
                        "@type": "Offer",
                        "url": "https://encantocentro.mn/apartment/apart-G",
                        "priceCurrency": "MNT",
                        "price": "1",
                        "availability": "https://schema.org/InStock",
                        "seller": {
                          "@type": "Organization",
                          "name": "Encanto Centro"
                        }
                      },
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.6",
                        "reviewCount": "7"
                      },
                      "review": []
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9RNED6T6JK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9RNED6T6JK');
          `}
        </Script>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
