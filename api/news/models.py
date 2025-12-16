from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField


class NewsArticle(models.Model):
    title = models.CharField(max_length=255, verbose_name="Гарчиг")
    excerpt = models.TextField(verbose_name="Товч агуулга")
    content = RichTextField(verbose_name="Бүрэн агуулга", blank=True)
    date = models.DateField(default=timezone.now, verbose_name="Огноо")
    read_time = models.CharField(max_length=20, default="5 мин", verbose_name="Унших хугацаа")
    views = models.IntegerField(default=0, verbose_name="Үзсэн тоо")
    image = models.URLField(max_length=500, blank=True, verbose_name="Зургийн URL")
    featured = models.BooleanField(default=False, verbose_name="Онцлох")
    author = models.CharField(max_length=100, default="Энканто Сентро медиа баг", verbose_name="Зохиогч")
    tags = models.CharField(max_length=255, blank=True, help_text="Таг-уудыг таслалаар тусгаарлана", verbose_name="Таг")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = "Мэдээ"
        verbose_name_plural = "Мэдээнүүд"

    def __str__(self):
        return self.title

    def get_tags_list(self):
        """Return tags as a list"""
        if self.tags:
            return [tag.strip() for tag in self.tags.split(',')]
        return []
