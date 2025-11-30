// Apartment data for SSR and metadata generation
export interface ApartmentInfo {
  id: string;
  title: string;
  subtitle: string;
  modelType: string;
  area: string;
  rooms: string;
  floors: string;
  bathrooms: string;
  view: string;
  image: string;
}

export const apartments: Record<string, ApartmentInfo> = {
  "apart-A": {
    id: "apart-A",
    title: "253.44м² А загвар",
    subtitle: "5 өрөө",
    modelType: "A загвар",
    area: "253.44м²",
    rooms: "5",
    floors: "17-24",
    bathrooms: "4",
    view: "Урд, Баруун, Хойд",
    image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-a/A-1.jpg",
  },
  "apart-B": {
    id: "apart-B",
    title: "209.75м² B загвар",
    subtitle: "5 өрөө",
    modelType: "B загвар",
    area: "209.75м²",
    rooms: "5",
    floors: "17-24",
    bathrooms: "3+1",
    view: "Урд, Зүүн",
    image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-b/B-4.jpg",
  },
  "apart-C": {
    id: "apart-C",
    title: "144,18м² C загвар",
    subtitle: "3 өрөө",
    modelType: "C загвар",
    area: "144,18м²",
    rooms: "3",
    floors: "17-24",
    bathrooms: "3+1",
    view: "Зүүн, хойд",
    image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-05.jpg",
  },
  "apart-D": {
    id: "apart-D",
    title: "159,5м² D загвар",
    subtitle: "4 өрөө",
    modelType: "D загвар",
    area: "159,5м²",
    rooms: "4",
    floors: "6-16",
    bathrooms: "2+1",
    view: "Зүүн, урд",
    image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-06.jpg",
  },
  "apart-E": {
    id: "apart-E",
    title: "158,86м² E загвар",
    subtitle: "4 өрөө",
    modelType: "E загвар",
    area: "158,86м²",
    rooms: "4",
    floors: "6-16",
    bathrooms: "2+1",
    view: "Баруун, урд",
    image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-10.jpg",
  },
  "apart-F": {
    id: "apart-F",
    title: "129,1м² F загвар",
    subtitle: "3 өрөө",
    modelType: "F загвар",
    area: "129,1м²",
    rooms: "3",
    floors: "6-16",
    bathrooms: "2",
    view: "Баруун, хойд",
    image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-11.jpg",
  },
  "apart-G": {
    id: "apart-G",
    title: "147.26м² G загвар",
    subtitle: "3 өрөө",
    modelType: "G загвар",
    area: "147.26м²",
    rooms: "3",
    floors: "6-16",
    bathrooms: "2+1",
    view: "Зүүн, Хойд",
    image: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/apart-c/C-19.jpg",
  },
};

export function getApartmentById(id: string): ApartmentInfo | undefined {
  return apartments[id];
}

export function getAllApartmentIds(): string[] {
  return Object.keys(apartments);
}

