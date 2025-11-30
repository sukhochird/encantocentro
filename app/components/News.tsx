"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, ArrowRight, Eye, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { fetchLatestNews, NewsArticle } from "../services/newsApi";
import { NewsLoadingSkeleton } from "./NewsLoadingSkeleton";

export function News() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(6);
  
  // API state management
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Load initial news data
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchLatestNews(1, 8); // Load 8 articles initially
      setNewsData(response.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Мэдээ ачааллахад алдаа гарлаа');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsClick = (newsId: number) => {
    router.push(`/news/${newsId}`);
  };

  const handleRetry = () => {
    loadNews();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("mn-MN", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const sectionTitles = {
    title: "Сүүлийн үеийн мэдээ",
    subtitle: "Энканто Сентро төслийн хамгийн сүүлийн үеийн мэдээ, шинэчлэлүүд",
    readMore: "Дэлгэрэнгүй унших",
    loadMore: "Цааш үзэх",
    allNews: "Бүх мэдээ үзэх"
  };
  const visibleNews = newsData.slice(0, visibleCount);
  const hasMore = visibleCount < newsData.length;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl text-foreground mb-4">
            {sectionTitles.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {sectionTitles.subtitle}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && <NewsLoadingSkeleton />}

        {/* Error State */}
        {error && !isLoading && (
          <div className="mb-12">
            <Alert className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRetry}
                  className="ml-4 p-2 h-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Blog Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {visibleNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-border overflow-hidden h-full"
                  onClick={() => handleNewsClick(news.id)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {news.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground">
                          Онцлох
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex flex-col flex-1">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(news.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{news.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{news.views}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg mb-3 group-hover:text-primary transition-colors overflow-hidden" style={{ 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical' 
                    }}>
                      {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 overflow-hidden" style={{ 
                      display: '-webkit-box', 
                      WebkitLineClamp: 3, 
                      WebkitBoxOrient: 'vertical' 
                    }}>
                      {news.excerpt}
                    </p>

                    {/* Read More Button */}
                    <div className="flex items-center justify-between mt-auto">
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto group/btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNewsClick(news.id);
                        }}
                      >
                        <span className="text-primary">{sectionTitles.readMore}</span>
                        <ArrowRight className="w-4 h-4 ml-2 text-primary group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && !error && hasMore && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="px-8 py-3"
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Ачаалж байна...
                </>
              ) : (
                sectionTitles.loadMore
              )}
            </Button>
          </div>
        )}

        {/* View All News Button */}
        {!isLoading && !error && !hasMore && newsData.length > 0 && (
          <div className="text-center">
            <Button className="px-8 py-3">
              {sectionTitles.allNews}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}