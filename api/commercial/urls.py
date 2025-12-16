from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FloorPlanViewSet, BrandViewSet

router = DefaultRouter()
router.register(r'floors', FloorPlanViewSet, basename='floorplan')
router.register(r'brands', BrandViewSet, basename='brand')

urlpatterns = [
    path('', include(router.urls)),
]
