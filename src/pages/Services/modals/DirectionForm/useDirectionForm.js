import { useState, useMemo } from 'react';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { isRequired, maxLength } from '../../../../utils/validation';
import { FORM_LIMITS, VALIDATION_MESSAGES } from '../../constants/formLimits';


/**
 * Hook барои идораи формаи Direction
 * Истифодаи хуки универсалии useFormValidation
 */
export default function useDirectionForm({ initialData, isOpen, onSuccess, showToast }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { TITLE_MAX, DESCRIPTION_MAX } = FORM_LIMITS.DIRECTION;

  // Схемаи валидатсия барои Direction
  const validationSchema = {
    title: [
      {
        validator: isRequired,
        message: VALIDATION_MESSAGES.REQUIRED.TITLE,
      },
      {
        validator: (value) => maxLength(value, TITLE_MAX),
        message: VALIDATION_MESSAGES.MAX_LENGTH(TITLE_MAX),
      },
    ],
    description: [
      {
        validator: isRequired,
        message: VALIDATION_MESSAGES.REQUIRED.DESCRIPTION,
      },
      {
        validator: (value) => maxLength(value, DESCRIPTION_MAX),
        message: VALIDATION_MESSAGES.MAX_LENGTH(DESCRIPTION_MAX),
      },
    ],
    // iconUrl ихтиёрӣ аст
  };

  // Қимматҳои ибтидоӣ
  const initialValues = {
    title: '',
    description: '',
    iconUrl: '',
  };

  // Memoize initialData transformation to prevent infinite loop
  const transformedInitialData = useMemo(() => {
    if (!initialData) return null;
    return {
      title: initialData.title || '',
      description: initialData.description || '',
      iconUrl: initialData.iconUrl || '',
    };
  }, [initialData]);

  // Истифодаи хуки универсалӣ
  const {
    formData,
    errors,
    isFormValid,
    handleChange,
    handleBlur,
    setFieldValue,
    validate: validateForm,
  } = useFormValidation({
    initialValues,
    validationSchema,
    isOpen,
    initialData: transformedInitialData,
    validateOnBlur: true,
    onValidationError: (firstError) => {
      if (showToast) {
        showToast('error', 'Ошибка валидации', firstError);
      } else {
        alert(firstError);
      }
    }
  });

  // Handler барои бор кардани иконка
  const handleIconUpload = (url) => {
    setFieldValue('iconUrl', url);
  };

  // Валидатсия бо намоиши паёми хатогӣ
  const validate = () => {
    return validateForm();
  };

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleIconUpload,
    validate,
    isFormValid,
  };
}
