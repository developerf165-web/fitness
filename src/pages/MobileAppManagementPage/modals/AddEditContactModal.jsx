import React, { useState, useEffect } from 'react';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';

export default function AddEditContactModal({ isOpen, onClose, config, initialData }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (initialData) {
      setValue(initialData.text); // Танҳо матнро таҳрир мекунем
    } else {
      setValue('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    console.log('Saving contact:', value, 'for item:', initialData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ScrollableModalContentWrapper
      title={config.title} // "РЕДАКТИРОВАТЬ НОМЕР ТЕЛЕФОНА"
      onClose={onClose}
      content={
        <form onSubmit={(e) => e.preventDefault()}>
          <InputField
            label={config.label} // "Номер телефона*"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      }
      footer={
        <>
          <Button variant="default" onClick={onClose}>Отмена</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {config.submitText || 'Сохранить'}
          </Button>
        </>
      }
    />
  );
}