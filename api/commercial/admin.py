from django.contrib import admin
from .models import FloorPlan, Brand


@admin.register(FloorPlan)
class FloorPlanAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle', 'order', 'created_at']
    list_editable = ['order']
    list_filter = ['created_at']
    search_fields = ['title', 'subtitle']
    ordering = ['order', 'id']
    
    fieldsets = (
        ('Үндсэн мэдээлэл', {
            'fields': ('title', 'subtitle')
        }),
        ('Медиа', {
            'fields': ('image',)
        }),
        ('Тохиргоо', {
            'fields': ('order',)
        }),
    )


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'created_at']
    list_editable = ['order']
    list_filter = ['created_at']
    search_fields = ['name']
    ordering = ['order', 'id']
    
    fieldsets = (
        ('Үндсэн мэдээлэл', {
            'fields': ('name',)
        }),
        ('Медиа', {
            'fields': ('image',)
        }),
        ('Тохиргоо', {
            'fields': ('order',)
        }),
    )
