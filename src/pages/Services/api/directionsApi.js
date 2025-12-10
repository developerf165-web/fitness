// src/pages/Services/api/directionsApi.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://84.54.31.36:8081/api';
const IS_LOGGING_ENABLED = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';

// Helper to log errors consistently
const logError = (context, error) => {
    if (!IS_LOGGING_ENABLED) return;

    console.error(`❌ [DIRECTIONS API] ${context} ERROR:`, error);
    if (error.status) {
        console.error(`   Status: ${error.status}`);
    }
    if (error.data) {
        console.error(`   Data:`, error.data);
    }
};

// Helper to translate common errors to Russian
const translateError = (error) => {
    const errorMessage = error.message || String(error);

    // Network errors
    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        return 'Ошибка сети. Проверьте подключение к интернету.';
    }
    if (errorMessage.includes('Network request failed')) {
        return 'Ошибка сети. Проверьте подключение к интернету.';
    }

    // Return original message if already in Russian or unknown
    return errorMessage;
};

export const fetchDirections = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

        if (IS_LOGGING_ENABLED) {
            console.log('📤 [DIRECTIONS API] GET /direction/get/all');
        }

        const response = await fetch(`${API_BASE_URL}/direction/get/all`, {
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
            logError('fetchDirections', error);
            throw error;
        }

        const data = await response.json();

        if (IS_LOGGING_ENABLED) {
            console.log(`📥 [DIRECTIONS API] fetchDirections Success. Count: ${data.directions?.length || 0}`);
        }

        return data.directions || data;
    } catch (error) {
        throw new Error(translateError(error));
    }
};

export const deleteDirection = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

    if (IS_LOGGING_ENABLED) {
        console.log(`📤 [DIRECTIONS API] DELETE /direction/delete/${id}`);
    }

    const response = await fetch(`${API_BASE_URL}/direction/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || 'Ошибка при удалении направления');
        error.status = response.status;
        error.data = errorData;
        logError('deleteDirection', error);
        throw error;
    }

    if (IS_LOGGING_ENABLED) {
        console.log(`✅ [DIRECTIONS API] Direction ${id} deleted successfully`);
    }
    return true;
};

export const createDirection = async (formData) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

    const payload = {
        title: formData.title,
        description: formData.description || '',
    };

    if (IS_LOGGING_ENABLED) {
        console.log('📤 [DIRECTIONS API] createDirection Payload:', payload);
    }

    const response = await fetch(`${API_BASE_URL}/direction/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = 'Ошибка при создании направления';
        if (response.status === 401) errorMessage = 'Ошибка аутентификации.';
        if (response.status === 422) errorMessage = errorData.message || 'Ошибка валидации данных';

        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = errorData;
        logError('createDirection', error);
        throw error;
    }

    const result = await response.json();

    if (IS_LOGGING_ENABLED) {
        console.log('✅ [DIRECTIONS API] createDirection Success:', result);
    }

    // Smart unwrapping: check if direction/data is a valid object
    const candidate = result.direction || result.data;
    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
        if (IS_LOGGING_ENABLED) console.log('   -> Extracted object keys:', Object.keys(candidate));
        return candidate;
    }

    if (IS_LOGGING_ENABLED) console.log('   -> Returning root result keys:', Object.keys(result));
    return result;
};

export const updateDirection = async (id, formData) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

    const payload = {
        title: formData.title,
        description: formData.description || '',
        _method: 'PATCH'
    };

    if (IS_LOGGING_ENABLED) {
        console.log(`📤 [DIRECTIONS API] updateDirection(${id}) Payload:`, payload);
    }

    const response = await fetch(`${API_BASE_URL}/direction/update/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = 'Ошибка при обновлении направления';
        if (response.status === 404) errorMessage = 'Направление не найдено';
        if (response.status === 422) errorMessage = errorData.message || 'Ошибка валидации данных';

        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = errorData;
        logError('updateDirection', error);
        throw error;
    }

    const result = await response.json();

    if (IS_LOGGING_ENABLED) {
        console.log('✅ [DIRECTIONS API] updateDirection Success:', result);
    }

    // Smart unwrapping for update
    const candidate = result.direction || result.data;
    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
        if (IS_LOGGING_ENABLED) console.log('   -> Extracted updated object keys:', Object.keys(candidate));
        return candidate;
    }

    if (IS_LOGGING_ENABLED) console.log('   -> Returning root result keys:', Object.keys(result));
    return result;
};
