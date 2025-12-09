// src/pages/Services/api/servicesApi.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://84.54.31.36:8081/api';
const IS_LOGGING_ENABLED = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';

// Helper to log errors consistently
const logError = (context, error) => {
  if (!IS_LOGGING_ENABLED) return;

  console.error(`❌ [SERVICES API] ${context} ERROR:`, error);
  if (error.status) {
    console.error(`   Status: ${error.status}`);
  }
  if (error.data) {
    console.error(`   Data:`, error.data);
  }
};

// Helper for detailed FormData logging
const logFormData = (formData, requestName) => {
  if (IS_LOGGING_ENABLED) {
    console.log(`📤 [SERVICES API] ${requestName} Payload:`);
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}:`, `[FILE: ${value.name}, ${value.size} bytes, ${value.type}]`);
      } else {
        console.log(`  ${key}:`, value);
      }
    }
  }
};

export const fetchServices = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

  if (IS_LOGGING_ENABLED) {
    console.log('📤 [SERVICES API] GET /services/get/all');
  }

  const response = await fetch(`${API_BASE_URL}/services/get/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Ошибка аутентификации. Проверьте токен.');
    }
    const errorData = await response.json().catch(() => ({}));
    const error = new Error('Ошибка при получении данных с сервера');
    error.status = response.status;
    error.data = errorData;
    logError('fetchServices', error);
    throw error;
  }
  const data = await response.json();

  if (IS_LOGGING_ENABLED) {
    console.log(`📥 [SERVICES API] fetchServices Success. Count: ${data.services?.length}`);
  }

  return data.services;
};

export const deleteService = async (id) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

  if (IS_LOGGING_ENABLED) {
    console.log(`📤 [SERVICES API] DELETE /services/delete/${id}`);
  }

  const response = await fetch(`${API_BASE_URL}/services/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || 'Ошибка при удалении услуги');
    error.status = response.status;
    error.data = errorData;
    logError('deleteService', error);
    throw error;
  }

  if (IS_LOGGING_ENABLED) {
    console.log(`✅ [SERVICES API] Service ${id} deleted successfully`);
  }
  return true;
};

export const createService = async (formData) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

  const data = new FormData();
  data.append('name', formData.title);
  data.append('description', formData.description);
  data.append('price', parseFloat(formData.price));
  data.append('discount', parseFloat(formData.discount));

  const visitCount = parseInt(formData.visit_count);
  data.append('visit_count', isNaN(visitCount) ? 0 : visitCount);

  if (formData.imageFile) {
    data.append('img', formData.imageFile);
  }

  logFormData(data, 'createService');

  const response = await fetch(`${API_BASE_URL}/services/create`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: data
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let errorMessage = 'Ошибка при создании услуги';
    if (response.status === 401) errorMessage = 'Ошибка аутентификации.';
    if (response.status === 422) errorMessage = errorData.message || 'Ошибка валидации данных';

    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = errorData;
    logError('createService', error);
    throw error;
  }

  const result = await response.json();

  if (IS_LOGGING_ENABLED) {
    console.log('✅ [SERVICES API] createService Success:', result);
  }

  // Smart unwrapping: check if service/data is a valid object (and not just a message string)
  const candidate = result.service || result.data;
  if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
    if (IS_LOGGING_ENABLED) console.log('   -> Extracted object keys:', Object.keys(candidate));
    return candidate;
  }

  // If no valid nested object found, return the root result
  if (IS_LOGGING_ENABLED) console.log('   -> Returning root result keys:', Object.keys(result));
  return result;
};

export const updateService = async (id, formData) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

  const data = new FormData();

  if (formData.title) data.append('name', formData.title);
  if (formData.description) data.append('description', formData.description);
  if (formData.price) data.append('price', parseFloat(formData.price));
  if (formData.discount !== undefined && formData.discount !== '') {
    data.append('discount', parseFloat(formData.discount));
  }
  if (formData.visit_count !== undefined && formData.visit_count !== '') {
    const visitCount = parseInt(formData.visit_count);
    data.append('visit_count', isNaN(visitCount) ? 0 : visitCount);
  }
  if (formData.status !== undefined) {
    data.append('status', parseInt(formData.status));
  }

  if (formData.imageFile) {
    data.append('img', formData.imageFile);
  }

  logFormData(data, `updateService(${id})`);

  const response = await fetch(`${API_BASE_URL}/services/update/${id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: data
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let errorMessage = 'Ошибка при обновлении услуги';
    if (response.status === 404) errorMessage = 'Услуга не найдена';
    if (response.status === 422) errorMessage = errorData.message || 'Ошибка валидации данных';

    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = errorData;
    logError('updateService', error);
    throw error;
  }

  const result = await response.json();

  if (IS_LOGGING_ENABLED) {
    console.log('✅ [SERVICES API] updateService Success:', result);
  }

  // Smart unwrapping for update
  const candidate = result.service || result.data;
  if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
    if (IS_LOGGING_ENABLED) console.log('   -> Extracted updated object keys:', Object.keys(candidate));
    return candidate;
  }

  if (IS_LOGGING_ENABLED) console.log('   -> Returning root result keys:', Object.keys(result));
  return result;
};
