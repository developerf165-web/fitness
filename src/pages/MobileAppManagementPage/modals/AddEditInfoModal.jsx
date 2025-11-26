import React, { useState, useEffect } from 'react';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import InputField from '@/components/ui/InputField';
import TextArea from '@/components/ui/TextArea'; // Истифодаи textarea-и нав
import Button from '@/components/ui/Button';

export default function AddEditInfoModal({ isOpen, onClose, initialData = null }) {
  // Агар initialData бошад, режим 'edit' аст, вагарна 'add'
  const isEditMode = !!initialData;
  const [formData, setFormData] = useState({
    activity: '',
    description: '',
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData(initialData);
    } else {
      setFormData({ activity: '', description: '' });
    }
  }, [initialData, isEditMode, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Saving data:', formData);
    onClose(); // Модалро пӯшед
  };

  const title = isEditMode ? 'РЕДАКТИРОВАТЬ' : 'ДОБАВИТЬ ИНФОРМАЦИЮ';
  const submitText = isEditMode ? 'Сохранить' : 'Добавить';

  if (!isOpen) return null;

  return (
    <ScrollableModalContentWrapper
      title={title}
      onClose={onClose}
      content={
        <form onSubmit={(e) => e.preventDefault()}>
          <InputField
            label="Вид деятельности*"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="Фитнес клуб, финес центр"
          />
          <TextArea
            label="Описание*"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Расскажите немного о направлении"
            rows={8}
            maxLength={350}
          />
        </form>
      }
      footer={
        <>
          <Button variant="default" onClick={onClose}>Отмена</Button>
          <Button variant="primary" onClick={handleSubmit}>{submitText}</Button>
        </>
      }
    />
  );
}