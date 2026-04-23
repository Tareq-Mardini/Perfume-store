import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor لإضافة اللغة لكل request
axiosInstance.interceptors.request.use((config) => {
  const lang = localStorage.getItem("lang") || "en";

  config.headers["Accept-Language"] = lang;

  return config;
});

export default axiosInstance;