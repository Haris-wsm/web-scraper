import axois from "axios";

const api = axois.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getCategories = () => {
  return api.get("/api/v1/categories");
};

export const getProducts = (body) => {
  return api.post(`/api/v1/products`, body);
};
