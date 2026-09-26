from django.db import models
from apps.tenants.models import Tenant

# Create your models here.

class Module(models.Model):
    key = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class TenantModuleEntitlement(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name = "entitlements")
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    enabled = models.BooleanField(default=False)
    config = models.JSONField(default=dict, blank=True)

    class Meta:
        unique_together = ("tenant", "module")
    
    def __str__(self):
        status = "enabled" if self.enabled else "disabled"
        return f"{self.tenant.tenant_name} - {self.module.name} ({status})"