import axios from "axios";
import { getToken } from "./auth.js";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;