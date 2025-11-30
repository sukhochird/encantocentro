import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApartmentPageClient } from "@/app/components/ApartmentPageClient";
import { getApartmentById, getAllApartmentIds } from "@/app/lib/apartments";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const apartmentIds = getAllApartmentIds();
  return apartmentIds.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const apartment = getApartmentById(id);

  if (!apartment) {
    return {
      title: "Орон сууц олдсонгүй - Encanto Centro",
    };
  }

  const title = `${apartment.title} - ${apartment.subtitle} | Encanto Centro`;
  const description = `${apartment.modelType} - ${apartment.area} талбай, ${apartment.rooms} өрөө, ${apartment.bathrooms} угаалгын өрөө. ${apartment.floors} давхарт байрлана. ${apartment.view} харагдацтай.`;

  return {
    title,
    description,
    keywords: [
      "Encanto Centro",
      apartment.modelType,
      apartment.area,
      `${apartment.rooms} өрөөт байр`,
      "орон сууц",
      "Улаанбаатар",
      "байр зарах",
      "байр түрээслэх",
    ],
    authors: [{ name: "Encanto Centro" }],
    openGraph: {
      type: "website",
      locale: "mn_MN",
      url: `https://encantocentro.mn/apartment/${id}`,
      siteName: "Encanto Centro",
      title,
      description,
      images: [
        {
          url: apartment.image,
          width: 1200,
          height: 630,
          alt: apartment.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [apartment.image],
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
      canonical: `https://encantocentro.mn/apartment/${id}`,
    },
  };
}

export default async function ApartmentPage({ params }: PageProps) {
  const { id } = await params;
  const apartment = getApartmentById(id);

  if (!apartment) {
    notFound();
  }

  return <ApartmentPageClient apartmentId={id} />;
}

