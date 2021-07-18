import axios from "axios";

const API_URL = "http://localhost:8080/api/categories/";

const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const categoryService = {
    getCategories
};

export default categoryService;
