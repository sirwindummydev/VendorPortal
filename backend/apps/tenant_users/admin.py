from django.contrib import admin
from .models import TenantUser, TenantUserToken

# Register your models here.

@admin.register(TenantUser)
class TenantUsersAdmin(admin.ModelAdmin):
    list_display = ("id", "tenant","username","password", "status","created_at")

@admin.register(TenantUserToken)
class TenantUserTokenAdmin(admin.ModelAdmin):
    list_display = ("id","token", "tenant_user", "created_at")