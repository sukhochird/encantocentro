from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'service_type', 'phone', 'date', 'time', 'created_at']
    list_filter = ['service_type', 'date', 'created_at']
    search_fields = ['phone', 'message']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Үндсэн мэдээлэл', {
            'fields': ('service_type', 'phone', 'date', 'time')
        }),
        ('Нэмэлт мэдээлэл', {
            'fields': ('message',)
        }),
        ('Системийн мэдээлэл', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
