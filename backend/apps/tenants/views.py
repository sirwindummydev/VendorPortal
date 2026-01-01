from django.shortcuts import render
from rest_framework import generics
from .models import Tenant
from .serializers import TenantSerializer
from rest_framework import viewsets


# Create your views here.

class TenantListCreateView(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer