// src/pages/Services/forms/ServiceForm/ServiceFormModal.jsx

import React from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import ServiceFormFields from './ServiceFormFields';
import { useServiceForm } from './useServiceForm';

/**
 * Модали формаи Service
 */
export default function ServiceFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null,
  isSubmitting = false
}) {
  const {
    formData,
    handleChange,
    handleColorSelect,
    handleFileUpload,
    validate,
  } = useServiceForm(initialData, isOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const formContent = (
    <form id="service-form" onSubmit={handleSubmit}>
      <ServiceFormFields
        formData={formData}
        onChange={handleChange}
        onFileUpload={handleFileUpload}
        onColorSelect={handleColorSelect}
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
        disabled={isSubmitting}
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
