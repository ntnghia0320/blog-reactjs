import axios from "axios";
import authHeader from "./auth-header";
import currentUser from "./user-info";

const API_URL = "http://localhost:8080/api/posts";

const getAllPost = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAllPostActive = async () => {
  const response = await axios.get(API_URL + '/active-post');
  return response.data;
};

const getPostById = async (postId: number) => {
  const response = await axios.get(API_URL + `/${postId}`);
  return response.data;
};

const getPostsByUserId = async () => {
  const response = await axios.get(API_URL + `/user/${currentUser().userId}`);
  return response.data;
};

const getPostsByCategoryId = async (categoryId: number) => {
  const response = await axios.get(API_URL + `/category/${categoryId}`);
  return response.data;
};

const getPostsByKeyword = async (keyword: string) => {
  const response = await axios.get(API_URL + `/search?keyword=${keyword}`);
  return response.data;
}

const postPosts = async (post: Post, categoryId: number) => {
    const response = await axios.post(API_URL + `/${categoryId}/${currentUser().userId}`, JSON.stringify(post), { headers: authHeader() });
    return response.data;
};

const updatePost = async ( post: Post, postId: number) => {
  const response = await axios.put(API_URL + `/${postId}`, JSON.stringify(post), { headers: authHeader() });
  return response.data;
};

const deletePost = async (postId: number) => {
  const response = await axios.delete(API_URL + `/${postId}`, { headers: authHeader() });
  return response.headers;
};

const postService = {
    getAllPost,
    getAllPostActive,
    getPostsByKeyword,
    postPosts,
    getPostsByUserId,
    updatePost,
    deletePost,
    getPostsByCategoryId,
    getPostById
};

export default postService;