// apiClient.js

const API_BASE_URL = "http://84.54.31.36:8081/api"; // URL-и асосии API

/**
 * Гирифтани токени аутентификатсия аз localStorage.
 * @returns {string | null} Токени JWT ё null.
 */
export const getToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Эҷоди сарлавҳаҳои (headers) асосӣ, аз ҷумла Authorization.
 * @param {string} contentType Content-Type-и дилхоҳ.
 * @returns {object} Объект бо сарлавҳаҳо.
 */
export const getAuthHeaders = (contentType = "application/json") => {
  const token = getToken();
  const headers = {};

  if (contentType) {
    headers["Content-Type"] = contentType;
  }
  
  // Accept: "application/json" - ро барои мувофиқат бо apiClientPageTransaction илова мекунем
  if (contentType === "application/json") {
    headers["Accept"] = "application/json"; 
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
};


/**
 * Коркарди посухи API ва партофтани хатогиҳо дар ҳолати зарурӣ.
 * Ин функсия логикаи ҳар як файли 'handleResponse'-ро муттаҳид мекунад.
 * @param {Response} response Объекти посухи 'fetch'.
 * @returns {Promise<any>} Маълумоти JSON.
 * @throws {Error} Дар сурати хатогии API ё хатогии аутентификатсия (401).
 */
export const handleResponse = async (response) => {
  let responseData = {};
  try {
    // Кӯшиши хондани JSON. Агар ноком шавад, responseData холӣ мемонад.
    responseData = await response.json().catch(() => ({}));
  } catch (e) {
    // Агар ҷавоб JSON набошад ё холӣ бошад
  }

  // --- Идоракунии Хатогиҳо ---
  
  // 401: Аутентификатсия
  if (response.status === 401) {
    console.error("401: Хатогии аутентификатсия. Токен хориҷ карда шуд.");
    localStorage.removeItem("authToken");
    // Шумо метавонед дар ин ҷо ба саҳифаи логин равон кунед:
    // window.location.href = '/login'; 
    throw new Error(responseData.message || "401: Дохилшавӣ лозим аст. Лутфан, дубора ворид шавед.");
  }
  
  // 400, 403, 404, 422 ва дигар хатогиҳои API
  if (!response.ok) {
    const defaultMessage = `Хатогии API: ${response.status} ${response.statusText}`;
    
    if (response.status === 422) {
        // Логикаи 422 аз transactionService.js
        const validationMessage = responseData.errors 
            ? Object.values(responseData.errors).flat().join('; ') 
            : responseData.message || "422: Хатогии тасдиқи додаҳо.";
        throw new Error(validationMessage);
    }
    
    // Хатогиҳои умумӣ (400, 403, 404, ва ғ.)
    throw new Error(responseData.message || defaultMessage);
  }

  // 2xx: Муваффақ
  return responseData;
};

/**
 * Функсияи универсалӣ барои иҷрои дархостҳои 'fetch'.
 * @param {string} endpoint - Масалан: "/user/list"
 * @param {object} options - Объект барои 'fetch' (method, body, ва ғайра)
 * @param {string} contentType - Content-Type барои фиристодан.
 */
export const apiRequest = async (endpoint, options = {}, contentType = 'application/json') => {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    const headers = getAuthHeaders(contentType);

    try {
        const response = await fetch(fullUrl, {
            ...options,
            headers: {
                ...headers,
                ...options.headers, // Имкон медиҳад, ки headers-ро аз берун иваз кунем
            },
        });
        return handleResponse(response);
    } catch (error) {
        // Хатогиҳои шабакавӣ ё хатогие, ки аз handleResponse партофта шудаанд.
        console.error(`Error in apiRequest to ${endpoint}:`, error);
        throw error;
    }
};

/**
 * Функсияи ёрирасон барои сохтани FormData аз объекти JS.
 * @param {object} data - Объект барои табдил додан.
 * @returns {FormData}
 */
export const createFormData = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        // Мувофиқи тавсияи шумо, ба string табдил медиҳем
        formData.append(key, data[key].toString());
      }
    }
    return formData;
};

// Функсияҳои HTTP-и мустақим, ки 'apiRequest'-ро истифода мебаранд
export const get = (endpoint) => apiRequest(endpoint, { method: 'GET' });
export const post = (endpoint, body) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) });
// ... дигар функсияҳо (put, delete, ва ғайра) низ метавонанд илова карда шаванд