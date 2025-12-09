// src/pages/Services/utils/validators.js

import { VALIDATION_MESSAGES } from '../constants';
import { commonValidators } from '/src/shared/utils/validators';

/**
 * Validators барои Service form
 * Истифодаи shared commonValidators
 */

/**
 * Service-specific validation rules
 */
export const serviceValidationRules = {
    title: (value) => commonValidators.required(value, VALIDATION_MESSAGES.TITLE_REQUIRED),

    description: (value) => commonValidators.required(value, VALIDATION_MESSAGES.DESCRIPTION_REQUIRED),

    price: (value) => {
        const requiredError = commonValidators.required(value, VALIDATION_MESSAGES.PRICE_REQUIRED);
        if (requiredError) return requiredError;

        const positiveError = commonValidators.positiveNumber(value);
        return positiveError || null;
    },

    discount: (value) => {
        // Optional field, but if present must be 0-100
        if (value === '' || value === null || value === undefined) return null;
        return commonValidators.numberRange(0, 100)(value);
    },

    visit_count: (value) => {
        const requiredError = commonValidators.required(value, VALIDATION_MESSAGES.VISIT_COUNT_REQUIRED);
        if (requiredError) return requiredError;

        return commonValidators.nonNegativeInteger(value);
    },
};

/**
 * Validate кардани ҳамаи майдонҳои форма
 */
export const validateServiceForm = (formData, isEditMode = false) => {
    const errors = {};

    // Validate ҳар майдон
    errors.title = serviceValidationRules.title(formData.title);
    errors.description = serviceValidationRules.description(formData.description);
    errors.price = serviceValidationRules.price(formData.price);
    errors.discount = serviceValidationRules.discount(formData.discount);
    errors.visitCount = serviceValidationRules.visit_count(formData.visit_count);

    // Image - танҳо барои CREATE
    if (!isEditMode && !formData.imageFile) {
        errors.image = VALIDATION_MESSAGES.IMAGE_REQUIRED;
    }

    // Remove null/undefined errors
    Object.keys(errors).forEach(key => {
        if (!errors[key]) delete errors[key];
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Validate кардани як майдон
 */
export const validateField = (name, value, isEditMode = false) => {
    if (serviceValidationRules[name]) {
        return serviceValidationRules[name](value);
    }
    return null;
};
