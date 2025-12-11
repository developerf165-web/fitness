// src/pages/Services/api/coursesApi.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://84.54.31.36:8081/api';
const IS_LOGGING_ENABLED = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';

// Helper to log errors
const logError = (context, error) => {
    if (!IS_LOGGING_ENABLED) return;
    console.error(`❌ [COURSES API] ${context} ERROR:`, error);
    if (error.status) console.error(`   Status: ${error.status}`);
    if (error.data) console.error(`   Data:`, error.data);
};

// Helper for error translation
const translateError = (error) => {
    const errorMessage = error.message || String(error);
    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        return 'Ошибка сети. Проверьте подключение к интернету.';
    }
    return errorMessage;
};

export const fetchCourses = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

        if (IS_LOGGING_ENABLED) {
            console.log('📤 [COURSES API] GET /courses/get/all');
        }

        const response = await fetch(`${API_BASE_URL}/courses/get/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) throw new Error('Ошибка аутентификации. Проверьте токен.');
            const errorData = await response.json().catch(() => ({}));
            const error = new Error('Ошибка при получении курсов');
            error.status = response.status;
            error.data = errorData;
            logError('fetchCourses', error);
            throw error;
        }

        const data = await response.json();

        if (IS_LOGGING_ENABLED) {
            console.log(`📥 [COURSES API] fetchCourses Success. Data type: ${Array.isArray(data) ? 'Array' : typeof data}`);
        }

        // Handle response if it's direct array or wrapped in { data: [] } or { courses: [] }
        if (Array.isArray(data)) return data;
        if (data.courses && Array.isArray(data.courses)) return data.courses;
        if (data.data && Array.isArray(data.data)) return data.data;

        return [];
    } catch (error) {
        throw new Error(translateError(error));
    }
};
