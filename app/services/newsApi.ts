// API base URL - adjust this to match your Django server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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

// Fetch latest news from Django API
export const fetchLatestNews = async (page = 1, limit = 10): Promise<NewsApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/articles/?page=${page}&limit=${limit}`);

    if (!response.ok) {
      throw new Error(`API хариу алдаатай байна: ${response.status}`);
    }

    const data = await response.json();

    // Transform Django API response to match frontend interface
    // Django returns read_time, but frontend expects readTime
    const transformedArticles: NewsArticle[] = data.articles.map((article: any) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      readTime: article.read_time, // Map read_time to readTime
      views: article.views,
      image: article.image || '',
      featured: article.featured
    }));

    return {
      articles: transformedArticles,
      total: data.total,
      page: data.page,
      limit: data.limit
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error(error instanceof Error ? error.message : 'Мэдээ ачааллахад алдаа гарлаа');
  }
};

export interface DetailedNewsArticle extends NewsArticle {
  content: string;
  author: string;
  gallery?: string[];
  tags: string[];
}

// Fetch single news article by ID from Django API
export const fetchNewsById = async (id: number): Promise<DetailedNewsArticle | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/articles/${id}/`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API хариу алдаатай байна: ${response.status}`);
    }

    const data = await response.json();

    // Transform Django API response to match frontend interface
    return {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content || '',
      date: data.date,
      readTime: data.read_time, // Map read_time to readTime
      views: data.views,
      image: data.image || '',
      featured: data.featured,
      author: data.author || 'Энканто Сентро медиа баг',
      tags: data.tags || [] // Django returns tags as array
    };
  } catch (error) {
    console.error('Error fetching news detail:', error);
    throw new Error(error instanceof Error ? error.message : 'Мэдээ татахад алдаа гарлаа. Дахин оролдоно уу.');
  }
};
