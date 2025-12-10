// src/pages/Services/forms/ServiceForm/useServiceForm.js

import { useFormValidation } from '../../../../hooks/useFormValidation';
import { isRequired, isPositive, isNonNegative, inRange, maxLength } from '../../../../utils/validation';
import { FORM_LIMITS, VALIDATION_MESSAGES } from '../../constants/formLimits';

const IS_LOGGING_ENABLED = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';

/**
 * Hook барои идораи формаи Service
 * Истифодаи хуки универсалии useFormValidation
 */
export function useServiceForm(initialData, isOpen, showToast) {
  // Қимматҳои ибтидоӣ
  const initialValues = {
    title: '',
    description: '',
    price: '',
    discount: '0',
    visit_count: '',
    imageUrl: '',
    imageFile: null,
    status: 1,
  };

  const { TITLE_MAX, DESCRIPTION_MAX } = FORM_LIMITS.SERVICE;

  // Схемаи валидатсия барои Service
  const validationSchema = {
    title: [
      {
        validator: isRequired,
        message: VALIDATION_MESSAGES.REQUIRED.TITLE
      },
      {
        validator: (value) => maxLength(value, TITLE_MAX),
        message: VALIDATION_MESSAGES.MAX_LENGTH(TITLE_MAX)
      }
    ],
    description: [
      {
        validator: isRequired,
        message: VALIDATION_MESSAGES.REQUIRED.DESCRIPTION
      },
      {
        validator: (value) => maxLength(value, DESCRIPTION_MAX),
        message: VALIDATION_MESSAGES.MAX_LENGTH(DESCRIPTION_MAX)
      }
    ],
    price: [
      {
        validator: isRequired,
        message: 'Пожалуйста, введите цену'
      },
      {
        validator: isPositive,
        message: 'Цена должна быть больше 0'
      }
    ],
    discount: [
      {
        validator: isNonNegative,
        message: 'Скидка не может быть отрицательной'
      },
      {
        validator: (value) => inRange(value, 0, 100),
        message: 'Скидка должна быть от 0 до 100'
      }
    ],
    visit_count: [
      {
        validator: isNonNegative,
        message: 'Количество посещений не может быть отрицательным'
      }
    ],
    // imageFile санҷида мешавад дар isFormValid (танҳо барои формаи нав)
  };

  // Истифодаи хуки универсалӣ
  const {
    formData,
    errors,
    isFormValid: baseIsFormValid,
    handleChange,
    handleBlur,
    setFieldValue,
    validate: validateForm,
    setFormData,
  } = useFormValidation({
    initialValues,
    validationSchema,
    isOpen,
    initialData: initialData ? {
      title: initialData.name || initialData.title || '',
      description: initialData.description || '',
      price: initialData.price || initialData.tjs || '',
      discount: initialData.discount !== undefined ? String(initialData.discount) : '0',
      visit_count: initialData.visit_count !== undefined ? String(initialData.visit_count) : '0',
      imageUrl: initialData.imageUrl || '',
      imageFile: null,
      status: initialData.status !== undefined ? initialData.status : 1,
    } : null,
    validateOnBlur: true,
    onValidationError: (firstError) => {
      if (showToast) {
        showToast('error', 'Ошибка валидации', firstError);
      } else {
        alert(firstError);
      }
    }
  });

  // Handler барои бор кардани файл
  const handleFileUpload = (file) => {
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: file // FileUploader бо File object кор мекунад
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        imageFile: null,
        imageUrl: ''
      }));
    }
  };

  // Валидатсияи пурра бо санҷиши расм
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

    // Санҷиши майдонҳои асосӣ
    const isValid = validateForm();

    // Санҷиши расм (танҳо барои формаи нав)
    if (!initialData && !formData.imageFile) {
      if (showToast) {
        showToast('error', 'Ошибка валидации', 'Пожалуйста, загрузите изображение');
      } else {
        alert('Лутфан расмро бор кунед');
      }

      if (IS_LOGGING_ENABLED) {
        console.log('❌ [VALIDATOR] Image validation failed!');
      }

      return false;
    }

    if (IS_LOGGING_ENABLED) {
      if (isValid) {
        console.log('✅ [VALIDATOR] All validations passed!');
      } else {
        console.log('❌ [VALIDATOR] Validation failed!');
        console.log('Errors:', errors);
      }
    }

    return isValid;
  };

  // Санҷиши валидии форма (бо расм)
  const isFormValid = () => {
    const fieldsValid = baseIsFormValid;
    const imageValid = !!initialData || !!formData.imageFile;

    const result = fieldsValid && imageValid;

    if (IS_LOGGING_ENABLED) {
      console.log('🔍 Checking form validity:', result);
      console.log('State:', {
        fieldsValid,
        imageValid,
        title: !!formData.title?.trim(),
        description: !!formData.description?.trim(),
        price: formData.price && parseFloat(formData.price) > 0,
        discount: formData.discount !== '' && parseFloat(formData.discount) >= 0,
        visit_count: formData.visit_count !== '' && parseInt(formData.visit_count) >= 0,
        image: imageValid
      });
    }

    return result;
  };

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleFileUpload,
    validate,
    isFormValid,
  };
}
