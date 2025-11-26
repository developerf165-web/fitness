// apiClientPageTransaction.jsx
import { apiRequest, getAuthHeaders, handleResponse } from "./apiClient"; 
// BASE_URL, getAuthHeaders ва handleResponse дигар лозим нестанд

const BASE_URL = "http://84.54.31.36:8081/api"; // Танҳо агар шумо API_BASE_URL-ро дар apiClient.js тағир дода натавонед.

export const fetchUserTransactions = async (userId, page = 1) => {
  const endpoint = `/transaction/get/user-by-id/${userId}?page=${page}`;
  
  try {
    // Истифодаи функсияи умумии apiRequest
    // apiRequest(endpoint, { method: "GET" })
    
    // Азбаски мо танҳо GET-ро истифода мебарем, метавонем get()-ро истифода барем:
    const data = await apiRequest(endpoint, { method: 'GET' });
    return data;

  } catch (error) {
    console.error("Не удалось загрузить транзакции:", error);
    // handleResponse аллакай хатогиро партофтааст
    throw error;
  }
};