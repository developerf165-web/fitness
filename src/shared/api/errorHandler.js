// src/shared/api/errorHandler.js

/**
 * Structured API error handling
 * Истифода дар ҳамаи саҳифаҳо барои API errors
 */
export const handleApiError = (error, showToast) => {
    if (error.response) {
        // API error бо response
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 422) {
            // Validation errors аз backend
            const errors = error.response.data?.errors;
            showToast('error', 'Ошибка валидации', message || 'Проверьте введенные данные');
            return { type: 'validation', errors };
        } else if (status === 401) {
            showToast('error', 'Ошибка авторизации', 'Необходима повторная авторизация');
            // TODO: Redirect to login if needed
            return { type: 'auth' };
        } else if (status === 403) {
            showToast('error', 'Доступ запрещен', message || 'У вас нет прав для этой операции');
            return { type: 'forbidden' };
        } else if (status === 404) {
            showToast('error', 'Не найдено', message || 'Запрашиваемый ресурс не найден');
            return { type: 'notFound' };
        } else if (status === 500) {
            showToast('error', 'Ошибка сервера', 'Попробуйте позже или обратитесь в поддержку');
            return { type: 'server' };
        } else {
            showToast('error', 'Ошибка', message || 'Произошла неизвестная ошибка');
            return { type: 'unknown', message };
        }
    } else if (error.request) {
        // Network error - request бо response нест
        showToast('error', 'Ошибка сети', 'Проверьте подключение к интернету');
        return { type: 'network' };
    } else {
        // Something else happened
        showToast('error', 'Ошибка', error.message || 'Произошла непредвиденная ошибка');
        return { type: 'unknown', message: error.message };
    }
};

/**
 * Wrapper барои async operations бо error handling
 */
export const withErrorHandling = async (asyncFn, showToast, errorMessage = null) => {
    try {
        return await asyncFn();
    } catch (error) {
        if (errorMessage) {
            showToast('error', 'Ошибка', errorMessage);
        } else {
            handleApiError(error, showToast);
        }
        throw error; // Re-throw барои caller handling
    }
};
