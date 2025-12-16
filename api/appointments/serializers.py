from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'service_type', 'phone', 'date', 'time', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def validate_phone(self, value):
        """Утасны дугаарыг шалгах"""
        if not value.isdigit():
            raise serializers.ValidationError("Утасны дугаар зөвхөн тоо байх ёстой")
        if len(value) != 8:
            raise serializers.ValidationError("Утасны дугаар заавал 8 оронтой байх ёстой")
        return value
    
    def validate_service_type(self, value):
        """Үйлчилгээний төрлийг шалгах"""
        valid_types = ['apartment', 'commercial']
        types = [t.strip() for t in value.split(',') if t.strip()]
        for service_type in types:
            if service_type not in valid_types:
                raise serializers.ValidationError(
                    f"Буруу үйлчилгээний төрөл: {service_type}. Зөвхөн 'apartment' эсвэл 'commercial' байх ёстой."
                )
        return value
    
    def validate_time(self, value):
        """Цагийн формат шалгах"""
        try:
            hour, minute = value.split(':')
            hour = int(hour)
            minute = int(minute)
            if not (0 <= hour <= 23 and 0 <= minute <= 59):
                raise serializers.ValidationError("Цагийн формат буруу байна")
        except ValueError:
            raise serializers.ValidationError("Цагийн формат HH:MM байх ёстой")
        return value
