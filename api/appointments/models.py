from django.db import models


class Appointment(models.Model):
    """Уулзалтын цаг товлох хүсэлт"""
    
    SERVICE_TYPE_CHOICES = [
        ('apartment', 'Байрны захиалга'),
        ('commercial', 'Худалдааны төв түрээс'),
    ]
    
    service_type = models.CharField(
        max_length=100,
        verbose_name="Үйлчилгээний төрөл",
        help_text="Хэд хэдэн үйлчилгээний төрөл сонгосон бол таслалаар тусгаарлагдана (жишээ: apartment,commercial)"
    )
    phone = models.CharField(
        max_length=8,
        verbose_name="Утасны дугаар",
        help_text="8 оронтой утасны дугаар"
    )
    date = models.DateField(verbose_name="Огноо")
    time = models.CharField(
        max_length=5,
        verbose_name="Цаг",
        help_text="Цагийн формат: HH:MM"
    )
    message = models.TextField(
        blank=True,
        null=True,
        verbose_name="Нэмэлт мэдээлэл"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Үүсгэсэн огноо"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Шинэчлэгдсэн огноо"
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Уулзалтын хүсэлт"
        verbose_name_plural = "Уулзалтын хүсэлтүүд"
    
    def __str__(self):
        return f"{self.get_service_type_display()} - {self.phone} - {self.date} {self.time}"
