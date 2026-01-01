import api from "./axios";

export const getTenants = async () => {
  const response = await api.get("apps/tenants/");
  return response.data;
};
export const createTenant = async (tenantData: {
  tenant_name: string;
  description: string;
  email: string;
  subdomain: string;
  phone_number: string;
}) => {
  const response = await api.post("apps/tenants/", tenantData);
  return response.data;
};
export const getTenantDetails = async (tenantId: string) => {
  const response = await api.get(`apps/tenants/${tenantId}/`);
  return response.data;
};

export const updateTenant = async (
  tenantId: string,
  tenantData: {
    tenant_name: string;
    description: string;
    email: string;
    subdomain: string;
    phone_number: string;
  }
) => {
  const response = await api.put(`apps/tenants/${tenantId}/`, tenantData);
  return response.data;
};
export const deleteTenant = async (tenantId: string) => {
  const response = await api.delete(`apps/tenants/${tenantId}/`);
  return response.data;
};
