from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing appointments.
    Allows creating and listing appointments.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    http_method_names = ['get', 'post']  # Only allow GET and POST
    
    def create(self, request, *args, **kwargs):
        """Create a new appointment"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                'message': 'Уулзалтын хүсэлт амжилттай илгээгдлээ',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )
