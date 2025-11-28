import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import TextArea from '@/components/ui/TextArea';
import FileUploader from '@/components/ui/FileUploader';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import ColorPicker from '@/components/ui/ColorPicker'; // Илова шуд

// Ранги пешфарз, агар initialData набошад
const DEFAULT_COLOR = 'bg-lime-500';

export default function DirectionFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null,
  isSubmitting = false
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    iconUrl: '',
    color: DEFAULT_COLOR, // Илова шуд
  });

  // Пур кардани форма барои EDIT режим
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        iconUrl: initialData.iconUrl || '',
        color: initialData.color || DEFAULT_COLOR, // Рангро пур кардан
      });
    } else {
      // Тоза кардани форма барои CREATE режим
      setFormData({
        title: '',
        description: '',
        iconUrl: '',
        color: DEFAULT_COLOR, // Ранги пешфарз
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Функсияи нав барои интихоби ранг
  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color: color
    }));
  };

  const handleIconUpload = (url) => {
    setFormData(prev => ({
      ...prev,
      iconUrl: url
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Санҷиши ибтидоӣ
    if (!formData.title.trim()) {
      alert('Лутфан номи направлениеро пур кунед');
      return;
    }

    onSubmit(formData);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  // Мундариҷаи форма
  const formContent = (
    <form id="direction-form" onSubmit={handleSubmit}>
      {/* Номи направление */}
      <InputField
        label="Название направления"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Введите название направления"
        required
      />

      {/* Тавзеҳот */}
      <TextArea
        label="Описание"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Краткое описание направления"
        maxLength={200}
        rows={6}
      />
      
      {/* Илова кардани ColorPicker */}
      <ColorPicker
        selectedColor={formData.color}
        onSelectColor={handleColorSelect}
      />
      
    </form>
  );

  // Тугмаҳои footer
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
        disabled={isSubmitting}
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