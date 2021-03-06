import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/users";

const getUsers = async () => {
  const response = await axios.get(API_URL, { headers: authHeader() });
  return response.data;
};

const updateUser = async ( user: User, userId: number) => {
  const response = await axios.put(API_URL + `/${userId}`, JSON.stringify(user), { headers: authHeader() });
  return response.data;
};

const setRoleUser = async (userId: number, roleId: number) => {
  const response = await axios.put(API_URL + `/${userId}/set-role/${roleId}`, JSON.stringify(`{name: 'asas'}`), { headers: authHeader() });
  return response.data;
};

const logOut = () => {
  localStorage.removeItem('user');
}

const userService = {
  setRoleUser,
  updateUser,
  getUsers,
  logOut
};

export default userService;
