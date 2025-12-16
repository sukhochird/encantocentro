from rest_framework import viewsets
from .models import FloorPlan, Brand
from .serializers import FloorPlanSerializer, BrandSerializer


class FloorPlanViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing floor plans.
    Provides list endpoint ordered by 'order' field.
    """
    queryset = FloorPlan.objects.all()
    serializer_class = FloorPlanSerializer


class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing brands.
    Provides list endpoint ordered by 'order' field.
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
