// authAxios.js
import axios from "axios";
import { apiLogger } from '@services/apiLogger';

const API_URL = "http://84.54.31.36:8081/api";

// 1. Конфигуратсияи асосии axios
export const authApi = axios.create({
  baseURL: API_URL,
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
    } else {
      // Агар токен набошад, хатогии зудтар бардорем
      console.warn("⚠️ Токен дар localStorage ёфт нашуд");
    }

    // Логгирование дархост
    apiLogger.logRequest(
      config.method?.toUpperCase(),
      config.url,
      config.data
    );

    return config;
  },
  (error) => {
    apiLogger.logError('REQUEST', error.config?.url, error);
    return Promise.reject(error);
  }
);

// 3. Интерсептор барои коркарди посух
authApi.interceptors.response.use(
  (response) => {
    // Логгирование посухи муваффақ
    apiLogger.logResponse(
      response.config.method?.toUpperCase(),
      response.config.url,
      response.status,
      response.data
    );

    return response;
  },
  (error) => {
    // Логгирование хатогӣ
    apiLogger.logError(
      error.config?.method?.toUpperCase() || 'UNKNOWN',
      error.config?.url || 'UNKNOWN',
      error
    );

    // Коркарди хатогиҳои марбут ба токен ва аутентификатсия
    if (error.response?.status === 401) {
      console.error("❌ 401: Токен нодуруст ё вақташ тамом шудааст");
      localStorage.removeItem("authToken");

      // Илова кардани паёми русӣ барои коркарди минбаъда
      error.userMessage = "Сессия истекла. Пожалуйста, войдите заново.";
    }

    // Коркарди хатогиҳои сервер (500, 502, 503, ва ғайра)
    if (error.response?.status >= 500) {
      console.error(`❌ ${error.response.status}: Хатогии сервер`);
      error.userMessage = "Ошибка сервера. Попробуйте позже.";
    }

    // Хатогии шабака (offline, timeout)
    if (!error.response) {
      console.error("❌ Хатогии шабака: Пайваст нест");
      error.userMessage = "Ошибка сети. Проверьте интернет.";
    }

    return Promise.reject(error);
  }
);
