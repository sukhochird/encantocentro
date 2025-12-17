import type { Metadata, Viewport } from "next";
import { HomePageClient } from "./components/HomePageClient";

export const metadata: Metadata = {
  title: "Encanto Centro - High Rise Residence & Mall",
  description: "Дэлхийн №1 YUANDA брэндийн шилэн фасад бүхий тансаг зэрэглэлийн орон сууц, худалдаа үйлчилгээний төв. 600 орон сууц, 24,000м² худалдааны төв, 950 автомашины зогсоол. Улаанбаатар хотод байрладаг орчин үеийн барилга.",
  keywords: [
    "Encanto Centro",
    "орон сууц",
    "Улаанбаатар",
    "тансаг орон сууц",
    "YUANDA фасад",
    "худалдааны төв",
    "орчин үеийн барилга",
    "байр зарах",
    "байр түрээслэх",
  ],
  authors: [{ name: "Encanto Centro" }],
  creator: "Encanto Centro",
  publisher: "Encanto Centro",
  metadataBase: new URL("https://encantocentro.mn"),
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: "https://encantocentro.mn",
    siteName: "Encanto Centro",
    title: "Encanto Centro - High Rise Residence & Mall",
    description: "Дэлхийн №1 YUANDA брэндийн шилэн фасад бүхий тансаг зэрэглэлийн орон сууц, худалдаа үйлчилгээний төв",
    images: [
      {
        url: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/16.jpg",
        width: 1200,
        height: 630,
        alt: "Encanto Centro - High Rise Residence & Mall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encanto Centro - High Rise Residence & Mall",
    description: "Дэлхийн №1 YUANDA брэндийн шилэн фасад бүхий тансаг зэрэглэлийн орон сууц",
    images: ["https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/16.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function HomePage() {
  return <HomePageClient />;
}
