from rest_framework import serializers
from .models import FloorPlan, Brand


class FloorPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloorPlan
        fields = ['id', 'title', 'subtitle', 'image', 'order']
        read_only_fields = ['id']


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'image', 'order']
        read_only_fields = ['id']
