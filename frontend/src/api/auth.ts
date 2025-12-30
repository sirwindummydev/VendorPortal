import api from "./axios";

export const register = (userData: {
  username: string;
  //   email: string;
  password: string;
  password2: string;
}) => {
  return api.post("accounts/register/", userData);
};

export const login = async (data: { username: string; password: string }) => {
  const response = await api.post("/accounts/login/", data);
  return response.data; // <-- return only the data
};
