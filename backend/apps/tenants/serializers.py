from rest_framework import serializers
from .models import Tenant


class TenantSerializer(serializers.ModelSerializer):
    subdomain = serializers.CharField(write_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    

    class Meta:
        model = Tenant
        fields = ['id', 'tenant_name','description', 'subdomain', 'email', 'phone_number', 'account_url', 'created_at', 'created_by_name']
        read_only_fields = ['account_url', 'created_by_name']
    def create(self, validated_data):
        subdomain = validated_data.pop('subdomain')
        validated_data['account_url'] = f"http://{subdomain}.unifyos.com"
        return super().create(validated_data)