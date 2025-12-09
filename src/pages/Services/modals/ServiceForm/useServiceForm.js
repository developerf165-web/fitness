// src/pages/Services/forms/ServiceForm/useServiceForm.js

import { useState, useEffect } from 'react';
import { VALIDATION_MESSAGES } from '../../constants';
import { validateServiceForm, validateField as validateSingleField } from '../../utils/validators';

const IS_LOGGING_ENABLED = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';

/**
 * Hook барои идораи формаи Service
 */
export function useServiceForm(initialData, isOpen, showToast) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    price: '',
    discount: '0',
    visit_count: '',
    visit_count: '',
    imageUrl: '',
    imageFile: null, // File object барои API
    status: 1,
  });

  const [errors, setErrors] = useState({});

  // Пур кардани форма
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.name || initialData.title || '',
        description: initialData.description || '',
        price: initialData.price || initialData.tjs || '',
        discount: initialData.discount !== undefined ? String(initialData.discount) : '0',
        visit_count: initialData.visit_count !== undefined ? String(initialData.visit_count) : '0',
        imageUrl: initialData.imageUrl || '',
        imageFile: null,
        status: initialData.status !== undefined ? initialData.status : 1,
      });
      setErrors({});
    } else {
      // Reset барои форма нав
      setFormData({
        title: '',
        description: '',
        price: '',
        price: '',
        discount: '0',
        visit_count: '',
        visit_count: '',
        imageUrl: '',
        imageFile: null,
        status: 1,
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateSingleField(name, value, !!initialData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFileUpload = (file) => {
    if (file) {
      // Нигоҳ доштани File object барои API
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: file // FileUploader бо File object кор мекунад
      }));
      // Clear image error
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: undefined }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        imageFile: null,
        imageUrl: ''
      }));
    }
  };

  const validate = () => {
    if (IS_LOGGING_ENABLED) {
      console.log('\n🔍 [VALIDATOR] Starting validation...');
      console.log('Validating formData:', {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        discount: formData.discount,
        visit_count: formData.visit_count,
        imageFile: formData.imageFile ? 'present' : 'missing',
        isEditMode: !!initialData
      });
    }

    const { isValid, errors: validationErrors } = validateServiceForm(formData, !!initialData);

    if (IS_LOGGING_ENABLED) {
      console.log('Validation result:', { isValid, errors: validationErrors });
    }

    if (!isValid) {
      setErrors(validationErrors);

      // Намоиши аввалин хатогӣ бо Toast
      const firstError = Object.values(validationErrors)[0];

      if (IS_LOGGING_ENABLED) {
        console.log('❌ [VALIDATOR] Validation failed!');
        console.log('First error:', firstError);
        console.log('All errors:', validationErrors);
      }

      if (showToast) {
        showToast('error', 'Ошибка валидации', firstError);
      } else {
        // Fallback агар showToast нест
        alert(firstError);
      }
      return false;
    }

    if (IS_LOGGING_ENABLED) {
      console.log('✅ [VALIDATOR] All validations passed!');
    }

    return true;
  };

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleFileUpload,
    validate,
  };
}
