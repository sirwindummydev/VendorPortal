# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.TenantListCreateView.as_view(), name='tenant-list-create'),
#     # path('<int:pk>/', views.TenantRetrieveUpdateDestroyView.as_view(), name='tenant-detail'),
# ]

from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import TenantListCreateView


router = DefaultRouter()
router.register(r'', views.TenantListCreateView, basename='tenants')   
urlpatterns = router.urls