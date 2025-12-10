// src/pages/Services/forms/ServiceForm/ServiceFormModal.jsx

import React from 'react';
import Modal from '/src/components/ui/Modal';
import Button from '/src/components/ui/Button';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import ServiceFormFields from './ServiceFormFields';
import { useServiceForm } from './useServiceForm';

const IS_LOGGING_ENABLED = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';

/**
 * Модали формаи Service
 */
export default function ServiceFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false,
  showToast // Илова
}) {
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleFileUpload,
    validate,
  } = useServiceForm(initialData, isOpen, showToast);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (IS_LOGGING_ENABLED) {
      console.log('\n═══════════════════════════════════════');
      console.log('🔵 [SERVICE FORM] Тугмаи Submit пахш шуд');
      console.log('═══════════════════════════════════════');
      console.log('📋 Form Data:', formData);
      console.log('  - title:', formData.title);
      console.log('  - description:', formData.description);
      console.log('  - price:', formData.price);
      console.log('  - discount:', formData.discount);
      console.log('  - visit_count:', formData.visit_count);
      console.log('  - imageFile:', formData.imageFile ? `[FILE: ${formData.imageFile.name}]` : 'null');
      console.log('  - imageUrl:', formData.imageUrl);
      console.log('🔍 Starting validation...');
    }

    const isValid = validate();

    if (IS_LOGGING_ENABLED) {
      if (isValid) {
        console.log('✅ Validation passed!');
        console.log('🚀 Calling onSubmit handler...');
        console.log('Handler type:', typeof onSubmit);
      } else {
        console.log('❌ Validation failed!');
        console.log('Errors:', errors);
        console.log('═══════════════════════════════════════\n');
      }
    }

    if (isValid) {
      onSubmit(formData);

      if (IS_LOGGING_ENABLED) {
        console.log('✅ onSubmit called successfully');
        console.log('═══════════════════════════════════════\n');
      }
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  // Check if form is valid for disabled state
  const isFormValid = () => {
    const isValid = (
      formData.title?.trim() &&
      formData.description?.trim() &&
      formData.price && parseFloat(formData.price) > 0 &&
      formData.discount !== '' && parseFloat(formData.discount) >= 0 && parseFloat(formData.discount) <= 100 &&
      formData.visit_count !== '' && parseInt(formData.visit_count) >= 0 &&
      (!!initialData || formData.imageFile) // Image required only for new service
    );

    // Log validity state to help debug
    if (IS_LOGGING_ENABLED) {
      console.log('🔍 Checking form validity:', isValid);
      console.log('State:', {
        title: !!formData.title?.trim(),
        description: !!formData.description?.trim(),
        price: formData.price && parseFloat(formData.price) > 0,
        discount: formData.discount !== '' && parseFloat(formData.discount) >= 0,
        visit_count: formData.visit_count !== '' && parseInt(formData.visit_count) >= 0,
        image: !!(initialData || formData.imageFile)
      });
    }

    return isValid;
  };

  const formContent = (
    <form id="service-form" onSubmit={handleSubmit}>
      <ServiceFormFields
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onBlur={handleBlur}
        onFileUpload={handleFileUpload}
        isEditMode={!!initialData}
      />
    </form>
  );

  const footerButtons = (
    <>
      <Button
        type="button"
        onClick={handleClose}
        variant="default"
        disabled={isSubmitting}
      >
        Отмена
      </Button>

      <Button
        type="submit"
        form="service-form"
        variant="primary"
        disabled={!isFormValid() || isSubmitting}
      >
        {isSubmitting ? 'Сохранение...' : (initialData ? 'Сохранить' : 'Создать')}
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ScrollableModalContentWrapper
        title={initialData ? 'Редактирование услуги' : 'Создание услуги'}
        content={formContent}
        footer={footerButtons}
      />
    </Modal>
  );
}
