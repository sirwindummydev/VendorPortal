# from django.db import models
# from django.contrib.auth.models import AbstractUser

# class VendorUser(AbstractUser):
#     phone_number = models.CharField(max_length=15, blank=True, null=True)
#     address = models.TextField(blank=True, null=True)
#     date_of_birth = models.DateField(blank=True, null=True)
#     company_name = models.CharField(max_length=200, blank=True, null=True)
#     is_vendor = models.BooleanField(default=False) 
    
#     def __str__(self):
#         return self.username  