from django.db import models


class FloorPlan(models.Model):
    """Давхрын төлөвлөлт"""
    title = models.CharField(max_length=255, verbose_name="Гарчиг")
    subtitle = models.CharField(max_length=255, blank=True, verbose_name="Дэд гарчиг")
    image = models.URLField(max_length=500, verbose_name="Зургийн URL")
    order = models.IntegerField(default=0, verbose_name="Дараалал", help_text="Дарааллын тоо бага байх тусам эхэнд харагдана")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Давхрын төлөвлөлт"
        verbose_name_plural = "Давхрын төлөвлөлтүүд"

    def __str__(self):
        return self.title


class Brand(models.Model):
    """Брэнд"""
    name = models.CharField(max_length=255, verbose_name="Брэндийн нэр")
    image = models.URLField(max_length=500, verbose_name="Зургийн URL")
    order = models.IntegerField(default=0, verbose_name="Дараалал", help_text="Дарааллын тоо бага байх тусам эхэнд харагдана")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Брэнд"
        verbose_name_plural = "Брэндүүд"

    def __str__(self):
        return self.name
