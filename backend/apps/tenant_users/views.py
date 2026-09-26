from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import TenantUser, TenantUserToken
from apps.tenants.models import Tenant
from django.contrib.auth.hashers import check_password
import secrets


class TenantUserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self,request,*args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        tenant_subdomain = request.data.get('tenant_subdomain')
        
        try:
            tenant = Tenant.objects.get(tenant_subdomain = tenant_subdomain)
        except Tenant.DoesNotExist:
            return Response({'details': 'Tenant does not exists'}, status=404)

        try:
            user = TenantUser.objects.get(tenant = tenant, username = username)
        except TenantUser.DoesNotExist:
            return Response({'details':'Invalid Credentials'}, status=404)

        if not check_password(password, user.password):
            return Response({'details':'Invalid Credentials'}, status = 401)
        
        if user.status != 'active':
            return Response({'details':'Unauthorized Access'}, status = 403)

        token_value = secrets.token_hex(32)
        TenantUserToken.objects.create(token = token_value, tenant_user = user)
        return Response({
            'token':token_value,
            'user':{
                'id':user.id,
                'username': user.username,
            },
            'tenant':{
                'id':tenant.id,
                'tenant_name': tenant.tenant_name,
            }
        }, status =200)


class VerifyTokenView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return Response({'details':'No token provided'}, status = 401)
        incoming_token = auth_header.split(' ')[1]

        try:
            token_row  = TenantUserToken.objects.get(token = incoming_token)
        except TenantUserToken.DoesNotExist:
            return  Response({'details':'Invalid or expired token'}, status = 401)

        user = token_row.tenant_user

        if user.status != 'active':
            return Response({'details':'Unauthorized Access'}, status= 403)

        return Response({
            'user':{
                'id': user.id,
                'username':user.username,
            },
            'tenant':{
                'id':user.tenant.id,
                'tenant_name':user.tenant.tenant_name,
            }
        })

        
class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request,*args):
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if not auth_header:
            return Response({'details':'No token provided'}, status = 401)
        incoming_token =  auth_header.split(' ')[1]

        try:
            token_row = TenantUserToken.objects.get(token = incoming_token)
            token_row.delete()
        except TenantUserToken.DoesNotExist:
            pass
        finally:
            return Response({'details':'Logged out successfully'}, status = 200)
                
