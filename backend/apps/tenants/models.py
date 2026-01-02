
from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Tenant(models.Model):
    tenant_name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    subdomain = models.CharField(max_length=100, unique=True, default='default')
    account_url = models.URLField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_tenants',
        help_text='User who created this tenant.'
    )

    def __str__(self):
        return self.tenant_name