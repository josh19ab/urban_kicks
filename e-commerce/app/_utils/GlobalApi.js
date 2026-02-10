import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const apiBase = `${apiUrl.replace(/\/$/, "")}/api`;

const axiosClient = axios.create({
  baseURL: apiBase,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    // Keep Strapi v4 response shape (data.attributes) when using Strapi 5 backend
    "Strapi-Response-Format": "v4",
  },
});

// List views: only populate banner for faster response (avoid populate=*)
const getLatestProducts = () =>
  axiosClient.get("/products?populate=banner&pagination[pageSize]=100");

const getProductsById = (id) =>
  axiosClient.get("/products/" + id + "?populate=*");

const getProductListByCategory = (category) =>
  axiosClient.get(
    "/products?filters[category][$eq]=" +
      encodeURIComponent(category) +
      "&populate=banner&pagination[pageSize]=100"
  );

const addToCart = (data) => axiosClient.post("/carts", data);

const getUserCartItems = (email) =>
  axiosClient.get(
    "/carts?populate[products][populate][0]=banner&filters[email][$eq]=" + email
  );

const deleteCartItem = (id) => axiosClient.delete("/carts/" + id);

const createOrder = (data) => axiosClient.post("/orders", data);

const addComment = (data) => axiosClient.post("/comments", data);

const getCommentById = (id) =>
  axiosClient.get(`/comments?filters[products][id][$eq]=${id}&populate=*`);

const getUserOrders = (email) =>
  axiosClient.get(`/orders?filters[email][$eq]=${email}&populate=*`);

export default {
  getLatestProducts,
  getProductsById,
  getProductListByCategory,
  addToCart,
  getUserCartItems,
  deleteCartItem,
  createOrder,
  addComment,
  getCommentById,
  getUserOrders,
};
