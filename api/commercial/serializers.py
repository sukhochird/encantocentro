from rest_framework import serializers
from .models import FloorPlan, Brand


class FloorPlanSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    
    class Meta:
        model = FloorPlan
        fields = ['id', 'title', 'subtitle', 'image', 'order']
        read_only_fields = ['id']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            request = self.context.get('request')
            if request:
                representation['image'] = request.build_absolute_uri(instance.image.url)
        return representation


class BrandSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    
    class Meta:
        model = Brand
        fields = ['id', 'name', 'image', 'order']
        read_only_fields = ['id']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            request = self.context.get('request')
            if request:
                representation['image'] = request.build_absolute_uri(instance.image.url)
        return representation
