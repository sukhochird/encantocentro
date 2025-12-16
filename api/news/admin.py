from django.contrib import admin
from ckeditor.widgets import CKEditorWidget
from django import forms
from .models import NewsArticle


class NewsArticleAdminForm(forms.ModelForm):
    class Meta:
        model = NewsArticle
        fields = '__all__'
        widgets = {
            'content': CKEditorWidget(),
        }


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    form = NewsArticleAdminForm
    list_display = ['title', 'date', 'featured', 'views', 'created_at']
    list_filter = ['featured', 'date', 'created_at']
    search_fields = ['title', 'excerpt', 'content']
    date_hierarchy = 'date'
    ordering = ['-date', '-created_at']
    
    fieldsets = (
        ('Үндсэн мэдээлэл', {
            'fields': ('title', 'excerpt', 'content', 'author')
        }),
        ('Медиа', {
            'fields': ('image',)
        }),
        ('Тохиргоо', {
            'fields': ('date', 'read_time', 'featured', 'tags')
        }),
        ('Статистик', {
            'fields': ('views',)
        }),
    )
