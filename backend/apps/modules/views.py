# apps/tenants/views.py
from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Tenant
from .serializers import TenantSerializer, TenantPublicSerializer
from apps.modules.models import TenantModuleEntitlement
from apps.modules.serializers import TenantModuleEntitlementSerializer


class TenantListCreateView(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer

    @action(detail=False, methods=['get'], url_path='by-subdomain/(?P<tenant_subdomain>[^/.]+)')
    def by_subdomain(self, request, tenant_subdomain=None):
        try:
            tenant = Tenant.objects.get(tenant_subdomain=tenant_subdomain)
        except Tenant.DoesNotExist:
            return Response({"detail": "Tenant not found"}, status=404)
        return Response(TenantPublicSerializer(tenant).data)

    @action(detail=True, methods=['get'], url_path='entitlements')
    def entitlements(self, request, pk=None):
        entitlements = TenantModuleEntitlement.objects.filter(tenant_id=pk, enabled=True)
        return Response(TenantModuleEntitlementSerializer(entitlements, many=True).data)