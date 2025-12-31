import api from "./axios";

export const register = (userData: {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
}) => {
  return api.post("apps/users/register/", userData);
};

export const login = async (data: { username: string; password: string }) => {
  const response = await api.post("apps/users/login/", data);
  return response.data;
};
