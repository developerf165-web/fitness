// src/shared/hooks/useForm.js

import { useState, useEffect } from 'react';

/**
 * Generic form hook барои ҳамаи формаҳо
 * 
 * @param {Object} options - Form options
 * @param {Object} options.initialValues - Қиматҳои ибтидоӣ
 * @param {Object} options.validationRules - Қоидаҳои validation
 * @param {Function} options.onSubmit - Submit handler
 * @param {Function} options.showToast - Toast function
 * @param {any} options.resetTrigger - Reset form вақте тағйир мекунад
 */
export const useForm = ({
    initialValues = {},
    validationRules = {},
    onSubmit = () => { },
    showToast = null,
    resetTrigger = null,
}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form вақте resetTrigger тағйир мекунад
    useEffect(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, [resetTrigger]);

    /**
     * Handle input change
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));

        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    /**
     * Handle input blur - trigger validation
     */
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        // Validate field
        if (validationRules[name]) {
            const error = validationRules[name](value, values);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    /**
     * Set field value programmatically
     */
    const setFieldValue = (name, value) => {
        setValues(prev => ({ ...prev, [name]: value }));

        // Clear error
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    /**
     * Set field error programmatically
     */
    const setFieldError = (name, error) => {
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    /**
     * Validate all fields
     */
    const validate = () => {
        const newErrors = {};

        Object.keys(validationRules).forEach(key => {
            const error = validationRules[key](values[key], values);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle form submit
     */
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Validate
        if (!validate()) {
            // Show first error
            const firstError = Object.values(errors).find(e => e);
            if (showToast && firstError) {
                showToast('error', 'Ошибка валидации', firstError);
            }
            return;
        }

        // Submit
        setIsSubmitting(true);
        try {
            await onSubmit(values);
        } catch (error) {
            console.error('Form submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Reset form
     */
    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    /**
     * Check if form is valid
     */
    const isValid = Object.keys(errors).every(key => !errors[key]);

    /**
     * Check if form has been touched
     */
    const isDirty = Object.keys(touched).length > 0;

    return {
        // Values
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        isDirty,

        // Handlers
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldError,
        reset,
        validate,
    };
};
