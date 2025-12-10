// src/utils/validation.js

/**
 * Утилитаҳои умумии валидатсия барои формаҳо
 * Common validation utilities for forms
 */

/**
 * Санҷиши майдони ҳатмӣ
 * Check if required field is filled
 */
export const isRequired = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value instanceof File) return true;
    return !!value;
};

/**
 * Санҷиши дарозии минималӣ
 * Check minimum length
 */
export const minLength = (value, min) => {
    if (!value) return false;
    return value.toString().trim().length >= min;
};

/**
 * Санҷиши дарозии максималӣ
 * Check maximum length
 */
export const maxLength = (value, max) => {
    if (!value) return true; // Empty is valid for max length
    return value.toString().trim().length <= max;
};

/**
 * Санҷиши адад
 * Check if value is a valid number
 */
export const isNumber = (value) => {
    if (value === '' || value === null || value === undefined) return false;
    return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Санҷиши адади мусбат
 * Check if value is a positive number
 */
export const isPositive = (value) => {
    if (!isNumber(value)) return false;
    return parseFloat(value) > 0;
};

/**
 * Санҷиши адади ғайриманфӣ (>= 0)
 * Check if value is non-negative (>= 0)
 */
export const isNonNegative = (value) => {
    if (!isNumber(value)) return false;
    return parseFloat(value) >= 0;
};

/**
 * Санҷиши қимат дар диапазон
 * Check if value is in range
 */
export const inRange = (value, min, max) => {
    if (!isNumber(value)) return false;
    const num = parseFloat(value);
    return num >= min && num <= max;
};

/**
 * Санҷиши файл
 * Check if value is a file
 */
export const isFile = (value) => {
    return value instanceof File;
};

/**
 * Санҷиши адади бутун
 * Check if value is an integer
 */
export const isInteger = (value) => {
    if (!isNumber(value)) return false;
    return Number.isInteger(parseFloat(value));
};

/**
 * Валидатори универсалӣ
 * Universal validator that runs multiple validation rules
 * 
 * @param {any} value - Қимати майдон / Field value
 * @param {Array} rules - Массиви қоидаҳо / Array of validation rules
 * @returns {string|null} - Паёми хатогӣ ё null / Error message or null
 * 
 * Example:
 * const rules = [
 *   { validator: isRequired, message: 'Майдон ҳатмӣ аст' },
 *   { validator: (v) => minLength(v, 3), message: 'Ҳадди ақал 3 аломат' }
 * ];
 * const error = validateField(value, rules);
 */
export const validateField = (value, rules) => {
    for (const rule of rules) {
        if (!rule.validator(value)) {
            return rule.message;
        }
    }
    return null;
};

/**
 * Валидатсияи формаи пурра
 * Validate entire form based on validation schema
 * 
 * @param {Object} formData - Маълумоти форма / Form data
 * @param {Object} validationSchema - Схемаи валидатсия / Validation schema
 * @returns {Object} - { isValid: boolean, errors: Object }
 * 
 * Example:
 * const schema = {
 *   title: [
 *     { validator: isRequired, message: 'Номро пур кунед' },
 *     { validator: (v) => minLength(v, 3), message: 'Ҳадди ақал 3 аломат' }
 *   ],
 *   price: [
 *     { validator: isRequired, message: 'Нархро пур кунед' },
 *     { validator: isPositive, message: 'Нарх бояд мусбат бошад' }
 *   ]
 * };
 * const result = validateForm(formData, schema);
 */
export const validateForm = (formData, validationSchema) => {
    const errors = {};
    let isValid = true;

    for (const [fieldName, rules] of Object.entries(validationSchema)) {
        const error = validateField(formData[fieldName], rules);
        if (error) {
            errors[fieldName] = error;
            isValid = false;
        }
    }

    return { isValid, errors };
};

/**
 * Санҷиши валидии формаи пурра (бидуни паёмҳои хатогӣ)
 * Check if entire form is valid (without error messages)
 * 
 * @param {Object} formData - Маълумоти форма / Form data
 * @param {Object} validationSchema - Схемаи валидатсия / Validation schema
 * @returns {boolean} - true агар форма дуруст бошад / true if form is valid
 */
export const isFormValid = (formData, validationSchema) => {
    for (const [fieldName, rules] of Object.entries(validationSchema)) {
        const error = validateField(formData[fieldName], rules);
        if (error) {
            return false;
        }
    }
    return true;
};
