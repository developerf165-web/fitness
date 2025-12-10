// src/pages/Services/constants/formLimits.js

/**
 * Лимитҳои формаҳо барои Services Page
 * Form limits for Services Page
 */

export const FORM_LIMITS = {
    DIRECTION: {
        TITLE_MAX: 100,
        DESCRIPTION_MAX: 255,
    },
    SERVICE: {
        TITLE_MAX: 100,
        DESCRIPTION_MAX: 250,
    },
};

/**
 * Паёмҳои валидатсия
 * Validation messages
 */
export const VALIDATION_MESSAGES = {
    REQUIRED: {
        TITLE: 'Название обязательно',
        DESCRIPTION: 'Описание обязательно',
    },
    MAX_LENGTH: (max) => `Максимум ${max} символов`,
};
