const API_BASE_URL = 'http://84.54.31.36:8081/api';


/**
 * Функция для получения списка всех услуг
 * @returns {Promise<Array>} Список услуг
 */
export const fetchServices = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

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
    throw new Error('Ошибка при получении данных с сервера');
  }
  const data = await response.json();
  return data.services;
};

/**
 * Функция для удаления услуги по указанному ID
 * @param {number} id ID услуги
 * @returns {Promise<boolean>} Возвращает true в случае успеха
 */
export const deleteService = async (id) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE',

    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при удалении услуги');
  }
  return true;
};/**
 * Функция для создания новой услуги
 * @param {object} serviceData - Данные новой услуги
 * @returns {Promise<object>} Созданная услуга
 */
export const createService = async (serviceData) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

  const response = await fetch(`${API_BASE_URL}/services/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: serviceData.title,
      price: parseFloat(serviceData.price),
      img: serviceData.imageUrl || '',
      description: serviceData.description || ''
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Ошибка аутентификации. Проверьте токен.');
    }
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при создании услуги');
  }

  return await response.json();
};

/**
 * Функция для обновления существующей услуги
 * @param {number} id - ID услуги
 * @param {object} serviceData - Обновленные данные
 * @returns {Promise<object>} Обновленная услуга
 */
export const updateService = async (id, serviceData) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: serviceData.title,
      price: parseFloat(serviceData.price),
      img: serviceData.imageUrl || '',
      description: serviceData.description || ''
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Ошибка аутентификации. Проверьте токен.');
    }
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при обновлении услуги');
  }

  return await response.json();
};
