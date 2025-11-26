// apiAddUser.jsx
import { authApi } from "../authAxios"; // Истифодаи конфигуратсияи марказӣ

// Мо дар ин ҷо Content-Type-ро иваз мекунем, зеро axios-и марказӣ барои JSON аст.
// Барои FormData, Content-Type бояд хориҷ карда шавад.

export const createUser = async (userData) => {
  try {
    // Боварӣ ҳосил кунед, ки userData объекти FormData аст
    const response = await authApi.post("/user/create", userData, {
      headers: {
        "Content-Type": "multipart/form-data", // Боварӣ ҳосил кардан
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Ошибка при создании пользователя:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getUsers = async () => {
  try {
    // Ин дархост JSON аст, пас ба сарлавҳаҳои асосии authApi пайравӣ мекунад
    const response = await authApi.get("/user/list");
    return response.data;
  } catch (error) {
    console.error("❌ Ошибка при получении пользователей:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};