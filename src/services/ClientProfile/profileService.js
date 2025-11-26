// profileService.js
import { apiRequest, createFormData, getToken } from "../apiClient";
// Ҳамаи логикаи дигар, аз ҷумла handleResponse, ба apiClient.js интиқол дода шуд.

// const API_BASE_URL = "http://84.54.31.36:8081/api"; // Дигар лозим нест

// getToken, createFormData, handleResponse дигар лозим нестанд, 
// зеро онҳо аз apiClient.js меоянд.

export const updateUserProfile = async (userId, profileData) => {
  const token = getToken();
  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  const endpoint = `/user/update-by-id/${userId}`;
  
  // Агар profileData аллакай FormData набошад, онро дар ин ҷо созед
  // Азбаски дар коди аслӣ гуфта шудааст, ки profileData.entries() дорад, 
  // мо тахмин мезанем, ки он аллакай FormData аст.
  
  // Истифодаи apiRequest барои FormData
  return apiRequest(endpoint, {
    method: "POST",
    body: profileData, // Ин бояд объекти FormData бошад!
  }, null); // Content-Type: null (FormData онро худаш илова мекунад)
};


export const getUserProfile = async (userId) => {
  const token = getToken();
  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  const endpoint = `/user/get-by-id/${userId}`;

  // Истифодаи функсияи умумии apiRequest
  return apiRequest(endpoint, { method: 'GET' });
};