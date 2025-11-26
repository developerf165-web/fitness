// userService.js
import { apiRequest, getToken } from "../apiClient"; 
// handleResponse, getToken, API_BASE_URL дигар лозим нестанд.

// --- DELETE USER ---
export const deleteUser = async (userId) => {
  const token = getToken(); // Ҳанӯз токенро барои санҷиши аввалия истифода мебарем
  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  const endpoint = `/user/delete-by-id/${userId}`; 
  
  // Истифодаи функсияи умумии apiRequest
  return apiRequest(endpoint, {
    method: 'DELETE',
    // headers дигар лозим нест, зеро онҳо дар apiRequest гузошта мешаванд.
  }, null); // Content-Type-ро гузоштан лозим нест

};

// --- DISABLE USER (BLOCK) ---
export const disableUser = async (userId, reason) => {
  const token = getToken();
  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  const endpoint = `/user/disable-by-id/${userId}`; 
  
  const data = {
    message: reason,
  };
  
  // apiRequest ба таври худкор Content-Type-ро ба 'application/json' мегузорад 
  // ва body-ро JSON.stringify мекунад.
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    // headers дигар лозим нест
  });
};

export const activateUser = async (userId) => {
  const token = getToken();
  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  const endpoint = `/user/activate-by-id/${userId}`; 
  
  // Барои Activate, body лозим нест, танҳо POST-и холӣ
  return apiRequest(endpoint, {
    method: 'POST',
    // headers дигар лозим нест
  });
};