import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !isRefreshing &&
      !original.url.includes("/auth/refresh") &&
      !original.url.includes("/auth/login")
    ) {
      original._retry = true;
      isRefreshing = true;
      try {
        await api.post("/auth/refresh");
        return api(original);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;