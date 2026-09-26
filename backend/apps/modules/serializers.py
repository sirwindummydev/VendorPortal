from rest_framework import serializers
from .models import Module, TenantModuleEntitlement

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ['key', 'name', 'description']

class TenantModuleEntitlementSerializer(serializers.ModelSerializer):
    module = ModuleSerializer(read_only=True)

    class Meta:
        model = TenantModuleEntitlement
        fields = ['module','enabled','config']