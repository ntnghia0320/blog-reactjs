import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/categories";

const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getCategoryById = async (categoryId: number) => {
  const response = await axios.get(API_URL + `/${categoryId}`);
  return response.data;
};

const postCategory = async (category: {name: string}) => {
  const response = await axios.post(API_URL, JSON.stringify(category), { headers: authHeader() });
  return response.data;
};

const updateCategory = async ( category: {name: string}, categoryId: number) => {
  const response = await axios.put(API_URL + `/${categoryId}`, JSON.stringify(category), { headers: authHeader() });
  return response.data;
};

const categoryService = {
    getCategories,
    postCategory,
    updateCategory,
    getCategoryById
};

export default categoryService;
