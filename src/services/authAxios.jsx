// authAxios.js
import axios from "axios";

const API_URL = "http://84.54.31.36:8081/api"; 

// 1. Конфигуратсияи асосии axios
export const authApi = axios.create({
  baseURL: API_URL, // ё "/api" агар дархостҳо прокси шаванд
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Интерсептор барои илова кардани Authorization header
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Интерсептор барои коркарди посух (махсусан 401)
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("401: Хатогии аутентификатсия. Токен хориҷ карда шуд.");
      localStorage.removeItem("authToken");
      // Беҳтар аст, ки ба саҳифаи логин равон кунед
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);