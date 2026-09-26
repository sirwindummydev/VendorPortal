from django.db import models
from apps.tenants.models import Tenant

class TenantUser(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.PROTECT, related_name= "users")
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add = True)


    STATUS_CHOICES = [
        ("active","Active"),
        ("inactive","Inactive"),
    ]
    status = models.CharField(max_length=20, choices = STATUS_CHOICES, default="active")
    
    class Meta:
        unique_together = ("tenant","username")

    def __str__(self):
        return f"{self.tenant.tenant_name}"



class TenantUserToken(models.Model):
    token = models.CharField(unique = True, max_length = 128)
    tenant_user = models.ForeignKey(TenantUser, on_delete = models.CASCADE, related_name = 'tokens')
    created_at = models.DateTimeField(auto_now_add=True)

    