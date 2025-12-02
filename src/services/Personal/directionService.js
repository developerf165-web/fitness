// directionService.js
import { authApi } from '../authAxios';

/**
 * Гирифтани рӯйхати ҳамаи направленияҳо аз сервер
 * @returns {Promise<Array>} Массиви направленияҳо
 */
export const getAllDirections = async () => {
  try {
    const response = await authApi.get('/direction/get/all');
    
    // Санҷиши посух
    if (response.data && response.data.status === "true") {
      return response.data.directions || [];
    }
    
    return [];
  } catch (error) {
    // Муайян кардани паёми хатогӣ барои корбар
    let errorMessage = "Ошибка при загрузке направлений";
    
    if (error.userMessage) {
      // Агар authAxios паёми махсус илова кардааст
      errorMessage = error.userMessage;
    } else if (error.response?.status === 401) {
      errorMessage = "Токен недействителен. Войдите заново.";
    } else if (error.response?.status >= 500) {
      errorMessage = "Ошибка сервера. Попробуйте позже.";
    } else if (!error.response) {
      errorMessage = "Ошибка сети. Проверьте интернет.";
    }
    
    console.error("❌ getAllDirections:", errorMessage, error);
    
    // Error-ро бо паёми русӣ бардорем
    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    enhancedError.status = error.response?.status;
    
    throw enhancedError;
  }
};

/**
 * Табдил додани направленияҳо ба формати барои SelectWithOptions
 * @param {Array} directions - Массиви направленияҳо аз API
 * @returns {Array} Формат: [{ value: "1", label: "кардио нагрузка" }, ...]
 */
export const formatDirectionsForSelect = (directions) => {
  if (!Array.isArray(directions)) return [];
  
  return directions.map(direction => ({
    value: direction.id.toString(), // ID ҳамчун string
    label: direction.title,          // Номи направление
    description: direction.description // Тавсиф (ихтиёрӣ)
  }));
};
