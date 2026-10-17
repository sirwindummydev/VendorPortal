from django.shortcuts import render
from rest_framework import viewsets
from .models import OrgUnit
from .serializers import OrgUniSerializer

# Create your views here.
class OrgUnitViewSet(viewsets.ModelViewSet):
    queryset = OrgUnit.objects.all()
    serializer_class = OrgUniSerializer