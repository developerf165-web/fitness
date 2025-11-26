// transactionService.js
import { apiRequest, createFormData } from "../apiClient"; 
// Ҳамаи логикаи идоракунии API ва сарлавҳаҳо ба apiClient.js интиқол дода шуд.

// URL-ро ба ҷои дурусти API-и худ иваз кунед
// const API_BASE_URL = "http://84.54.31.36:8081/api"; // Дигар лозим нест

// createFormData, getAuthHeaders, handleResponse дигар лозим нестанд

export const refillCard = async (cardId, amount, message) => {
  const endpoint = "/transactions"; 
  const data = {
    card_id: cardId,
    payment: amount,
    message: message || "Пополнение через интерфейс",
  };
  
  // createFormData-и марказӣ истифода мешавад
  const formData = createFormData(data);

  // Истифодаи apiRequest: Content-Type-ро иваз кардан лозим нест, 
  // зеро fetch/FormData худаш онро дуруст мегузорад.
  return apiRequest(
    endpoint, 
    {
      method: 'POST',
      body: formData,
    },
    // Content-Type: null - мо ба apiRequest мегӯем, ки онро нагузорад
    null 
  );
};

export const withdrawFromCard = async (cardId, amount, message) => {
  const endpoint = "/transactions/withdrawal"; 
  const data = {
    card_id: cardId,
    payment: amount,
    message: message,
  };

  const formData = createFormData(data);

  return apiRequest(
    endpoint, 
    {
      method: 'POST',
      body: formData,
    },
    null
  );
};