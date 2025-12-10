// src/pages/Services/components/DirectionForm/DirectionFormModal.jsx

import React from 'react';
import Modal from '/src/components/ui/Modal';
import Button from '/src/components/ui/Button';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import DirectionFormFields from './DirectionFormFields';
import useDirectionForm from './useDirectionForm';

/**
 * Модали формаи Direction
 */
export default function DirectionFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false,
  showToast
}) {
  const {
    formData,
    handleChange,
    handleIconUpload,
    validate,
    isFormValid,
  } = useDirectionForm({
    initialData,
    isOpen,
    onSuccess: onSubmit,
    showToast
  });

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
    <form id="direction-form" onSubmit={handleSubmit}>
      <DirectionFormFields
        formData={formData}
        onChange={handleChange}
        onIconUpload={handleIconUpload}
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
        form="direction-form"
        variant="primary"
        disabled={isSubmitting || !isFormValid}
      >
        {isSubmitting ? 'Сохранение...' : (initialData ? 'Сохранить' : 'Создать')}
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ScrollableModalContentWrapper
        title={initialData ? 'Редактирование направления' : 'Создание направления'}
        content={formContent}
        footer={footerButtons}
      />
    </Modal>
  );
}
