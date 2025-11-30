import type { Metadata } from "next";
import { MallPage } from "@/app/components/MallPage";

export const metadata: Metadata = {
  title: "Үйлчилгээний талбай - Encanto Centro | 24,000м² худалдааны төв",
  description: "Encanto Centro үйлчилгээний талбай - 4 давхар, 24,000м² талбай бүхий орчин үеийн худалдааны төв. 50+ брэнд, 950+ автомашины зогсоол. Хүнсний дэлгүүр, кафе, ресторан, үйлчилгээний газрууд.",
  keywords: [
    "Encanto Centro",
    "худалдааны төв",
    "үйлчилгээний талбай",
    "mall",
    "shopping center",
    "Улаанбаатар",
    "коммерцийн талбай",
    "байр түрээслэх",
  ],
  authors: [{ name: "Encanto Centro" }],
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: "https://encantocentro.mn/commercial",
    siteName: "Encanto Centro",
    title: "Үйлчилгээний талбай - Encanto Centro",
    description: "4 давхар, 24,000м² талбай бүхий орчин үеийн худалдааны төв",
    images: [
      {
        url: "/assets/d21dceb4c080eb6e243c85f06e3aa44523400894.png",
        width: 1200,
        height: 630,
        alt: "Encanto Centro үйлчилгээний талбай",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Үйлчилгээний талбай - Encanto Centro",
    description: "4 давхар, 24,000м² талбай бүхий орчин үеийн худалдааны төв",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://encantocentro.mn/commercial",
  },
};

export default function CommercialPage() {
  return <MallPage />;
}

