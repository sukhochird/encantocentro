from rest_framework import serializers
from .models import NewsArticle


class NewsArticleSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'excerpt', 'date', 'read_time', 'views', 'image', 'featured', 'tags']
        read_only_fields = ['id', 'views']
    
    def get_tags(self, obj):
        return obj.get_tags_list()
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            request = self.context.get('request')
            if request:
                representation['image'] = request.build_absolute_uri(instance.image.url)
        return representation


class NewsArticleDetailSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'excerpt', 'content', 'date', 'read_time', 'views', 
                  'image', 'featured', 'author', 'tags']
        read_only_fields = ['id', 'views']
    
    def get_tags(self, obj):
        return obj.get_tags_list()
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            request = self.context.get('request')
            if request:
                representation['image'] = request.build_absolute_uri(instance.image.url)
        return representation

