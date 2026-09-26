
from django.urls import path
from .views import TenantUserLoginView, VerifyTokenView, LogoutView

urlpatterns = [
    path('login/', TenantUserLoginView.as_view(), name = 'tenant-user-login'),
    path('verify-token/', VerifyTokenView.as_view(), name = 'verify-token'),
    path('logout/', LogoutView.as_view(), name = 'logout'),


]