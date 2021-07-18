import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const logOut = () => {
  localStorage.removeItem('user');
}

const userService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  logOut
};

export default userService;
