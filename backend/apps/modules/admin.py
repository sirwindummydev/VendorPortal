from django.contrib import admin
from .models import Module, TenantModuleEntitlement

# Register your models here.

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('id', 'key', 'name', 'description')

@admin.register(TenantModuleEntitlement)
class TenantModuleEntitlementAdmin(admin.ModelAdmin):
    list_display = ('id', 'tenant', 'module', 'enabled')
    list_filter = ('enabled', 'module')