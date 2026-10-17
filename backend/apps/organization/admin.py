from django.contrib import admin
from .models import OrgUnit

# Register your models here.
@admin.register(OrgUnit)
class OrgUnitAdmin(admin.ModelAdmin):
    list_display = ('id','tenant', 'name','unit_type','parent','is_active')
