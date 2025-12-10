// src/hooks/useFormValidation.js

import { useState, useEffect, useMemo, useCallback } from 'react';
import { validateField, isFormValid as checkFormValid } from '../utils/validation';

/**
 * Хуки универсалӣ барои идораи форма ва валидатсия
 * Universal hook for form management and validation
 * 
 * @param {Object} config - Конфигуратсияи хук / Hook configuration
 * @param {Object} config.initialValues - Қимматҳои ибтидоӣ / Initial form values
 * @param {Object} config.validationSchema - Схемаи валидатсия / Validation schema
 * @param {boolean} config.isOpen - Модал кушода аст / Modal is open
 * @param {Object} config.initialData - Маълумот барои таҳрир / Data for editing (optional)
 * @param {Function} config.onValidationError - Callback барои хатогии валидатсия / Validation error callback (optional)
 * 
 * @returns {Object} - Form state and handlers
 * 
 * Example:
 * const { formData, errors, isFormValid, handleChange, validate } = useFormValidation({
 *   initialValues: { title: '', price: '' },
 *   validationSchema: {
 *     title: [{ validator: isRequired, message: 'Номро пур кунед' }],
 *     price: [{ validator: isPositive, message: 'Нарх бояд мусбат бошад' }]
 *   },
 *   isOpen: true,
 *   initialData: null
 * });
 */
export function useFormValidation({
    initialValues = {},
    validationSchema = {},
    isOpen = true,
    initialData = null,
    onValidationError = null,
    validateOnChange = false, // Валидатсия ҳангоми тағйир / Validate on change
    validateOnBlur = true, // Валидатсия ҳангоми blur / Validate on blur
}) {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({}); // Майдонҳое, ки корбар дастрас кардааст

    // Пур кардани форма бо маълумоти ибтидоӣ ё reset
    // Fill form with initial data or reset
    useEffect(() => {
        if (initialData) {
            // Якҷоя кардани initialValues бо initialData
            // Merge initialValues with initialData
            setFormData({ ...initialValues, ...initialData });
            setErrors({});
            setTouched({});
        } else {
            // Reset барои форма нав
            // Reset for new form
            setFormData(initialValues);
            setErrors({});
            setTouched({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, initialData]); // Вобастагӣ танҳо ба isOpen ва initialData

    /**
     * Идораи тағйироти майдон
     * Handle field change
     */
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));

        // Тоза кардани хатогӣ ҳангоми тағйир
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        // Валидатсия ҳангоми тағйир (агар фаъол бошад)
        // Validate on change (if enabled)
        if (validateOnChange && validationSchema[name]) {
            const error = validateField(value, validationSchema[name]);
            if (error) {
                setErrors(prev => ({ ...prev, [name]: error }));
            }
        }
    }, [errors, validateOnChange, validationSchema]);

    /**
     * Идораи blur (гум кардани фокус)
     * Handle blur (losing focus)
     */
    const handleBlur = useCallback((e) => {
        const { name, value } = e.target;

        // Нишон додани майдон ҳамчун "дастрас кардашуда"
        // Mark field as "touched"
        setTouched(prev => ({ ...prev, [name]: true }));

        // Валидатсия ҳангоми blur (агар фаъол бошад)
        // Validate on blur (if enabled)
        if (validateOnBlur && validationSchema[name]) {
            const error = validateField(value, validationSchema[name]);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    }, [validateOnBlur, validationSchema]);

    /**
     * Муқаррар кардани қиммати майдон
     * Set field value programmatically
     */
    const setFieldValue = useCallback((fieldName, value) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));

        // Тоза кардани хатогӣ
        // Clear error
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: undefined }));
        }
    }, [errors]);

    /**
     * Муқаррар кардани якчанд қимматҳо
     * Set multiple values at once
     */
    const setFieldValues = useCallback((values) => {
        setFormData(prev => ({ ...prev, ...values }));

        // Тоза кардани хатогиҳои марбут
        // Clear related errors
        const clearedErrors = { ...errors };
        Object.keys(values).forEach(key => {
            if (clearedErrors[key]) {
                delete clearedErrors[key];
            }
        });
        setErrors(clearedErrors);
    }, [errors]);

    /**
     * Reset кардани форма
     * Reset form to initial values
     */
    const resetForm = useCallback(() => {
        setFormData(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    /**
     * Валидатсияи дастӣ
     * Manual validation
     */
    const validate = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        // Санҷиши ҳар майдон
        // Check each field
        for (const [fieldName, rules] of Object.entries(validationSchema)) {
            const error = validateField(formData[fieldName], rules);
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        }

        setErrors(newErrors);

        // Даъват кардани callback барои хатогии валидатсия
        // Call validation error callback
        if (!isValid && onValidationError) {
            const firstError = Object.values(newErrors)[0];
            onValidationError(firstError, newErrors);
        }

        return isValid;
    }, [formData, validationSchema, onValidationError]);

    /**
     * Санҷиши валидии форма (бидуни муқаррар кардани хатогиҳо)
     * Check form validity (without setting errors)
     */
    const isFormValidMemo = useMemo(() => {
        return checkFormValid(formData, validationSchema);
    }, [formData, validationSchema]);

    return {
        // State
        formData,
        errors,
        touched,
        isFormValid: isFormValidMemo,

        // Handlers
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldValues,
        resetForm,
        validate,

        // Utilities
        setFormData, // Барои ҳолатҳои махсус / For special cases
        setErrors, // Барои муқаррар кардани хатогиҳои дастӣ / For setting manual errors
    };
}
