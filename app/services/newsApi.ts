export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  featured: boolean;
}

export interface NewsApiResponse {
  articles: NewsArticle[];
  total: number;
  page: number;
  limit: number;
}

// Mock API function to simulate fetching news from server
export const fetchLatestNews = async (page = 1, limit = 10): Promise<NewsApiResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  // Simulate occasional API errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('API хариу алдаатай байна. Дахин оролдоно уу.');
  }

  // Mock news data that would normally come from your backend API
  const mockArticles: NewsArticle[] = [
    {
      id: 1,
      title: "ЭНКАНТО СЕНТРО барилгын ажил эхэллээ",
      excerpt: "Улаанбаатар хотын төв хэсэгт байрлах Энканто Сентро төслийн барилгын ажил албан ёсоор эхэллээ. Уг төслийн хүрээнд орчин үеийн технологи ашиглан өндөр чанартай орон сууц болон арилжааны цогцолбор барих юм.",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
      readTime: "3 мин",
      views: 1247,
      image: "https://images.unsplash.com/photo-1748771886624-0f0aa2729a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzU2ODkwOTg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true
    },
    {
      id: 2,
      title: "Орон сууцны урьдчилсан захиалга эхэллээ",
      excerpt: "Таны мөрөөдлийн байрыг урьдчилан захиалж, тусгай хөнгөлөлт эдлээрэй. Эрт захиалагчдад 15% хүртэл хөнгөлөлт болон тусгай урамшуулал олгох юм.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
      readTime: "5 мин",
      views: 892,
      image: "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTY5NDA3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      id: 3,
      title: "YUANDA брэндийн шилэн фасад сонгогдлоо",
      excerpt: "Дэлхийн тэргүүлэгч YUANDA брэндийн шилэн фасадыг сонгож, чанартай барилга бүтээх боллоо. Энэхүү фасад нь дулаан хамгаалалт, гэрэл зэрэг олон давуу талтай юм.",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
      readTime: "4 мин",
      views: 654,
      image: "https://images.unsplash.com/photo-1677253200111-97d0d490d60e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGZhY2FkZSUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1Njk0ODAyNHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      id: 4,
      title: "Худалдааны төвийн төлөвлөгөө танилцуулагдлаа",
      excerpt: "24,000 м² талбай бүхий орчин үеийн худалдааны төвийн дэлгэрэнгүй төлөвлөгөө танилцуулагдлаа. Хүнсний дэлгүүр, кафе, үйлчилгээний газрууд багтана.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week ago
      readTime: "6 мин",
      views: 2103,
      image: "https://images.unsplash.com/photo-1725121688291-ed19354b618b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzaG9wcGluZyUyMG1hbGwlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTY5NDgwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      id: 5,
      title: "Ногоон байгууламжийн шинэ стандарт",
      excerpt: "Энканто Сентро нь байгаль орчинд ээлтэй барилгын шинэ стандартыг баримталж, эко ухаарлаг технологи ашиглана. Эрчим хүчний хэмнэлттэй системүүд суурилуулна.",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days ago
      readTime: "4 мин",
      views: 445,
      image: "https://images.unsplash.com/photo-1632263532338-45575eba6aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGJ1aWxkaW5nJTIwc3VzdGFpbmFiaWxpdHl8ZW58MXx8fHwxNzU2OTQ4MjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      id: 6,
      title: "Спорт, амралтын орчин",
      excerpt: "Оршин суугчдын амралт, спортын хэрэгцээг хангах зорилгоор орчин үеийн спорт залуу, усан сан, фитнесс төв барих болно. Бүх насны хүмүүст тохирсон.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks ago
      readTime: "5 мин",
      views: 768,
      image: "https://images.unsplash.com/photo-1721394747060-7cfc57104f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBmaXRuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc1Njg0NTI0MHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      id: 7,
      title: "Дижитал смарт системүүд суурилуулагдана",
      excerpt: "Орчин үеийн IoT технологи ашиглан гэрийн автоматжуулалт, аюулгүй байдлын систем, эрчим хүчний менежментийн ухаарлаг шийдлүүдийг нэвтрүүлэх юм.",
      date: new Date().toISOString().split('T')[0], // Today
      readTime: "7 мин",
      views: 2340,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1Njk0ODI0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true
    },
    {
      id: 8,
      title: "VIP танхимын тансаг зочид буудлын үйлчилгээ",
      excerpt: "Байрны эздэд болон зочдод зориулсан тансаг VIP танхим, консьерж үйлчилгээ, хувийн аюулгүй байдлын алба зэрэг дээд зэргийн үйлчилгээ үзүүлэх юм.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
      readTime: "4 мин",
      views: 1156,
      image: "https://images.unsplash.com/photo-1540318000000-c57b29b94ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc1Njk0ODI0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    }
  ];

  // Sort by date (newest first) and paginate
  const sortedArticles = mockArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = sortedArticles.slice(startIndex, endIndex);

  return {
    articles: paginatedArticles,
    total: mockArticles.length,
    page,
    limit
  };
};

export interface DetailedNewsArticle extends NewsArticle {
  content: string;
  author: string;
  gallery?: string[];
  tags: string[];
}

// Extended news data with full content
const detailedNewsData: DetailedNewsArticle[] = [
  {
    id: 1,
    title: "ЭНКАНТО СЕНТРО барилгын ажил эхэллээ",
    excerpt: "Улаанбаатар хотын төв хэсэгт байрлах Энканто Сентро төслийн барилгын ажил албан ёсоор эхэллээ.",
    content: `<p>Улаанбаатар хотын төв хэсэгт байрлах Энканто Сентро төслийн барилгын ажил албан ёсоор эхэллээ. Энэхүү төсөл нь орчин үеийн технологи ашиглан өндөр чанартай орон сууц болон арилжааны цогцолбор барих томоохон төсөл юм.</p>

<p>Энканто Сентро нь 24 давхар өндөртэй, 126.5м²-аас 243м² хүртэл талбайтай 3-5 өрөөтэй орон сууцны янз бүрийн төрлийг санал болгох юм. Барилгын ажил 2024 оны 12 дугаар сарын 15-нд эхэлсэн бөгөөд 2026 оны эцэст дуусах төлөвлөгөөтэй байна.</p>

<h3>Төслийн онцлог шинж чанарууд:</h3>
<ul>
<li>Дэлхийн тэргүүлэгч YUANDA брэндийн шилэн фасад</li>
<li>Орчин үеийн эрчим хүчний хэмнэлттэй систем</li>
<li>24,000 м² худалдааны төв</li>
<li>Спорт болон амралтын орчин</li>
<li>Ногоон байгууламжийн стандарт</li>
</ul>

<p>Төслийн удирдлагууд мэдэгдэхдээ: "Бид Монгол Улсын барилгын салбарт шинэ стандарт бий болгож, олон улсын түвшинд хүргэхэд бүх хүчээ дайчилж байна. Энканто Сентро нь зөвхөн орон сууц биш, бүхэл бүтэн амьдралын хэв маяг юм."</p>

<p>Барилгын ажилд олон улсын туршлагатай инженерүүд болон Монголын шилдэг мэргэжилтнүүд хамтран ажиллаж байгаа бөгөөд бүх ажлыг чанарын олон улсын стандартын дагуу гүйцэтгэж байна.</p>`,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    readTime: "3 мин",
    views: 1247,
    author: "Энканто Сентро медиа баг",
    image: "https://images.unsplash.com/photo-1748771886624-0f0aa2729a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzU2ODkwOTg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1748771886624-0f0aa2729a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzU2ODkwOTg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541976590-713941681591?w=800&h=600&fit=crop"
    ],
    tags: ["Барилга", "Энканто Сентро", "Шинэ төсөл", "Орон сууц"],
    featured: true
  },
  {
    id: 2,
    title: "Орон сууцны урьдчилсан захиалга эхэллээ",
    excerpt: "Таны мөрөөдлийн байрыг урьдчилан захиалж, тусгай хөнгөлөлт эдлээрэй.",
    content: `<p>Энканто Сентро орон сууцны урьдчилсан захиалга албан ёсоор эхэллээ. Эрт захиалагчдад 15% хүртэл хөнгөлөлт болон тусгай урамшуулал олгох юм.</p>

<p>Урьдчилсан захиалгын хөтөлбөрт дараах давуу талууд багтана:</p>

<h3>Хөнгөлөлт ба урамшуулал:</h3>
<ul>
<li>15% хүртэлх үнийн хөнгөлөлт</li>
<li>Эхний төлбөрийг хуваан төлөх боломж</li>
<li>Тохиргооны ажлын үнэгүй үйлчилгээ</li>
<li>Дотоод засалд зөвлөх үйлчилгээ</li>
</ul>

<p>Орон сууцны төрлүүд:</p>
<ul>
<li>3 өрөөтэй - 126.5м²</li>
<li>3 өрөөтэй - 138м²</li>
<li>4 өрөөтэй - 168м²</li>
<li>4 өрөөтэй - 185м²</li>
<li>5 өрөөтэй - 210м²</li>
<li>5 өрөөтэй - 243м²</li>
</ul>

<p>Борлуулалтын менежер тайлбарлахдаа: "Бид үйлчлүүлэгчдэдээ хамгийн сайн үнэ, чанарыг санал болгохыг эрмэлзэж байна. Урьдчилсан захиалга нь таны хөрөнгө оруулалтыг хамгаалах хамгийн сайн арга юм."</p>`,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    readTime: "5 мин",
    views: 892,
    author: "Борлуулалтын баг",
    image: "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTY5NDA3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Борлуулалт", "Урьдчилсан захиалга", "Хөнгөлөлт"],
    featured: false
  }
];

// Fetch single news article by ID (for NewsDetail component)
export const fetchNewsById = async (id: number): Promise<DetailedNewsArticle | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
  
  // Simulate occasional API errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Мэдээ татахад алдаа гарлаа. Дахин оролдоно уу.');
  }

  // Find detailed article by id
  return detailedNewsData.find(article => article.id === id) || null;
};