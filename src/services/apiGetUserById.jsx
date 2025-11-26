// apiGetUserById.jsx
import { authApi } from "./authAxios"; // Истифодаи конфигуратсияи марказӣ

export const getUserById = async (id) => {
  try {
    // authApi аллакай baseURL ва интерсепторҳоро дорад
    const response = await authApi.get(`/user/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    // Логикаи 401 аллакай дар интерсептои authAxios.js аст, 
    // аммо метавонем console.error-ро нигоҳ дорем
    console.error("Error fetching user data:", error);
    
    // Логикаи иловагии шумо (хориҷ кардани токен/редирект) дар authAxios.js аст.
    // Танҳо хатогиро партоед, то компонент онро идора кунад.
    throw error;
  }
};