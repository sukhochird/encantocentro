from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import NewsArticle
from .serializers import NewsArticleSerializer, NewsArticleDetailSerializer


class NewsArticleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing news articles.
    Provides list and detail endpoints.
    """
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return NewsArticleDetailSerializer
        return NewsArticleSerializer
    
    def retrieve(self, request, *args, **kwargs):
        """Retrieve a single news article and increment view count"""
        instance = self.get_object()
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def list(self, request, *args, **kwargs):
        """List news articles with pagination"""
        queryset = self.filter_queryset(self.get_queryset())
        
        # Get pagination parameters
        page = int(request.query_params.get('page', 1))
        limit = int(request.query_params.get('limit', 10))
        
        # Manual pagination
        start_index = (page - 1) * limit
        end_index = start_index + limit
        
        total = queryset.count()
        articles = queryset[start_index:end_index]
        
        serializer = self.get_serializer(articles, many=True)
        
        return Response({
            'articles': serializer.data,
            'total': total,
            'page': page,
            'limit': limit
        })
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured news articles"""
        featured_articles = self.queryset.filter(featured=True)[:3]
        serializer = self.get_serializer(featured_articles, many=True)
        return Response(serializer.data)
