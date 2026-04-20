import axios from "axios";

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// 🔹 1. إضافة access token لكل request
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  // ❌ إذا ما في توكن → روح للوغين
  if (!token) {
    window.location.href = "/Login-Admin";
    return Promise.reject("No token found");
  }

  // ✅ إذا موجود → أضفه
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// 🔹 2. معالجة انتهاء التوكن (refresh)
adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // إذا التوكن انتهى
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccess = res.data.access;

        // خزّن التوكن الجديد
        localStorage.setItem("accessToken", newAccess);

        // عدّل الطلب القديم
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        // أعد الطلب
        return adminApi(originalRequest);

      } catch (err) {
        // ❌ إذا فشل refresh → logout
        localStorage.clear();
        window.location.href = "/Login-Admin";
      }
    }

    return Promise.reject(error);
  }
);

export default adminApi;