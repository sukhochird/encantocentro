import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
