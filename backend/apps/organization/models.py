from django.db import models
from apps.tenants.models import Tenant

class OrgUnit(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete = models.PROTECT, related_name = 'org_units' )
    name = models.CharField(max_length = 100)
    unit_type = models.CharField(max_length = 100)
    parent = models.ForeignKey('self', on_delete = models.PROTECT, null = True, blank = True, related_name = 'children')
    is_active = models.BooleanField(default = True)

    def __str__(self):
        return f"{self.name} - {self.tenant.tenant_name} - {self.unit_type}"


    def get_ancestors(self):
        if self.parent is None:
            return []
        else:
            return  [self.parent] + self.parent.get_ancestors()