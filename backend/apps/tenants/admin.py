from django.contrib import admin
from .models import Tenant
# Register your models here.
# admin.site.register(Tenant)


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('id','tenant_name','description', 'email', 'phone_number', 'account_url', 'created_at', 'created_by')
    read_only_fields = ('account_url', 'created_at', 'updated_at', 'created_by')
    def save_model(self, request, obj, form, change):
            if not obj.pk:  # Only set on creation
                obj.created_by = request.user
            super().save_model(request, obj, form, change)