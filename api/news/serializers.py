from rest_framework import serializers
from .models import NewsArticle


class NewsArticleSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    
    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'excerpt', 'date', 'read_time', 'views', 'image', 'featured', 'tags']
        read_only_fields = ['id', 'views']
    
    def get_tags(self, obj):
        return obj.get_tags_list()


class NewsArticleDetailSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    
    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'excerpt', 'content', 'date', 'read_time', 'views', 
                  'image', 'featured', 'author', 'tags']
        read_only_fields = ['id', 'views']
    
    def get_tags(self, obj):
        return obj.get_tags_list()

