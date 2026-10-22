
import  axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

// Extend Axios config to track retry attempts
interface CustomAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Axios instance
 const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Track refresh request state
let isRefreshing = false;

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const original = error.config as
      | CustomAxiosRequestConfig
      | undefined;

    if (!original) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !original._retry &&
      !isRefreshing &&
      !original.url?.includes("/auth/refresh") &&
      !original.url?.includes("/auth/login")
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

