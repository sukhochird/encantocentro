"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Eye, Share2, Facebook, Twitter, Link2, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { fetchLatestNews, fetchNewsById, NewsArticle } from "../services/newsApi";



interface NewsDetailProps {
  id: string;
  onBack?: () => void;
}

export function NewsDetail({ id, onBack }: NewsDetailProps) {
  const router = useRouter();
  
  const [currentNews, setCurrentNews] = useState<any>(null);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNewsDetail();
  }, [id]);

  const loadNewsDetail = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const newsId = parseInt(id);
      const news = await fetchNewsById(newsId);
      
      if (news) {
        setCurrentNews(news);
        // Load related news (first 3 from latest news)
        const latestResponse = await fetchLatestNews(1, 10);
        const related = latestResponse.articles
          .filter(article => article.id !== newsId)
          .slice(0, 3);
        setRelatedNews(related);
      } else {
        setError('Мэдээ олдсонгүй');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Мэдээ ачааллахад алдаа гарлаа');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("mn-MN", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = currentNews?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // You could show a toast notification here
        break;
    }
  };

  const handleRelatedNewsClick = (newsId: number | string) => {
    router.push(`/news/${newsId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Мэдээ ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (error || !currentNews) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl mb-4">{error || 'Мэдээ олдсонгүй'}</h2>
          <Button onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Буцах
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-6 hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Буцах
        </Button>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Meta */}
          <div className="flex items-center gap-4 mb-4">
            {currentNews.featured && (
              <Badge className="bg-primary text-primary-foreground text-sm">
                Онцлох
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl mb-6 leading-tight">
            {currentNews.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(currentNews.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{currentNews.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{currentNews.views.toLocaleString()} үзэлт</span>
            </div>
            <div>
              <span>Зохиогч: {currentNews.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <ImageWithFallback
              src={currentNews.image}
              alt={currentNews.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <span className="text-sm text-muted-foreground">Хуваалцах:</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare('copy')}
              className="flex items-center gap-2"
            >
              <Link2 className="w-4 h-4" />
              Холбоос хуулах
            </Button>
          </div>

          {/* Article Content */}
          <div 
            className="news-content max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: currentNews.content }}
            style={{
              fontSize: '1.125rem'
            }}
          />

          {/* Tags */}
          {currentNews.tags && (
            <div className="mb-8">
              <h4 className="text-sm text-muted-foreground mb-3">Түлхүүр үг:</h4>
              <div className="flex flex-wrap gap-2">
                {currentNews.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Separator className="mb-8" />
            <h2 className="text-2xl mb-6">Холбоотой мэдээ</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedNews.map((news) => (
                <Card 
                  key={news.id} 
                  className="group hover:shadow-md transition-all duration-300 cursor-pointer border border-border"
                  onClick={() => handleRelatedNewsClick(news.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(news.date)}</span>
                    </div>
                    
                    <h3 className="text-sm mb-2 group-hover:text-primary transition-colors overflow-hidden" style={{ 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical' 
                    }}>
                      {news.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground overflow-hidden" style={{ 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical' 
                    }}>
                      {news.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">{news.readTime}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}