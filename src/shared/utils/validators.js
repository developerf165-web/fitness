// src/shared/utils/validators.js

/**
 * Common validators барои истифода дар ҳамаи формаҳо
 */
export const commonValidators = {
    /**
     * Санҷиши майдони зарурӣ
     */
    required: (value, message = 'Обязательное поле') => {
        if (!value) return message;
        if (typeof value === 'string' && !value.trim()) return message;
        return null;
    },

    /**
     * Валидатсияи email
     */
    email: (value) => {
        if (!value) return null; // Optional
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Неверный формат email' : null;
    },

    /**
     * Валидатсияи телефон
     */
    phone: (value) => {
        if (!value) return null; // Optional
        const phoneRegex = /^\+?\d{10,15}$/;
        return !phoneRegex.test(value.replace(/\s/g, ''))
            ? 'Неверный формат телефона'
            : null;
    },

    /**
     * Минимальная длина
     */
    minLength: (min) => (value) => {
        if (!value) return null;
        return value.length < min
            ? `Минимум ${min} символов`
            : null;
    },

    /**
     * Максимальная длина
     */
    maxLength: (max) => (value) => {
        if (!value) return null;
        return value.length > max
            ? `Максимум ${max} символов`
            : null;
    },

    /**
     * Диапазон чисел
     */
    numberRange: (min, max) => (value) => {
        if (value === '' || value === null || value === undefined) return null;
        const num = parseFloat(value);
        if (isNaN(num)) return 'Должно быть числом';
        if (num < min || num > max) {
            return `Значение должно быть от ${min} до ${max}`;
        }
        return null;
    },

    /**
     * Положительное число
     */
    positiveNumber: (value) => {
        if (value === '' || value === null || value === undefined) return null;
        const num = parseFloat(value);
        if (isNaN(num)) return 'Должно быть числом';
        return num <= 0 ? 'Должно быть положительное число' : null;
    },

    /**
     * Целое число >= 0
     */
    nonNegativeInteger: (value) => {
        if (value === '' || value === null || value === undefined) return null;
        const num = parseInt(value);
        if (isNaN(num)) return 'Должно быть целым числом';
        return num < 0 ? 'Должно быть >= 0' : null;
    },

    /**
     * URL validation
     */
    url: (value) => {
        if (!value) return null;
        const urlRegex = /^https?:\/\/.+/;
        return !urlRegex.test(value) ? 'Неверный формат URL' : null;
    },
};

/**
 * Композитсияи validators
 */
export const composeValidators = (...validators) => (value, allValues) => {
    for (const validator of validators) {
        const error = validator(value, allValues);
        if (error) return error;
    }
    return null;
};
