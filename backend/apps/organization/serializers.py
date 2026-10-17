
from rest_framework import serializers
from .models import OrgUnit

class OrgUniSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgUnit
        fields = ['id','name']

