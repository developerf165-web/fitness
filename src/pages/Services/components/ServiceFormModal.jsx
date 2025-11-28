import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import TextArea from '@/components/ui/TextArea';
import FileUploader from '@/components/ui/FileUploader';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import ColorPicker from '@/components/ui/ColorPicker'; // 👈 Илова шуд!

// Ранги пешфарз
const DEFAULT_COLOR = 'bg-lime-500';

export default function ServiceFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null,
  isSubmitting = false
}) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imageUrl: '',
    description: '',
    color: DEFAULT_COLOR, // 👈 Илова шуд!
  });

  // Пур кардани форма, агар initialData мавҷуд бошад (барои режими EDIT)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        price: initialData.tjs || '',
        imageUrl: initialData.imageUrl || '',
        description: initialData.description || '',
        color: initialData.color || DEFAULT_COLOR, // 👈 Рангро пур кардан
      });
    } else {
      // Тоза кардани форма барои режими CREATE
      setFormData({
        title: '',
        price: '',
        imageUrl: '',
        description: '',
        color: DEFAULT_COLOR, // 👈 Ранги пешфарз
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

  // 👈 Функсияи нав барои интихоби ранг
  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color: color
    }));
  };

  const handleFileUpload = (url) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Санҷиши ибтидоӣ
    if (!formData.title.trim() || !formData.price) {
      alert('Лутфан номи хидмат ва нархро пур кунед');
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
    <form id="service-form" onSubmit={handleSubmit}>
      {/* Номи хидмат */}
      <InputField
        label="Название"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Введите название услуги"
        required
      />

      {/* Нарх */}
      <InputField
        label="Цена за посещение"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Введите цену за одно посещение"
        required
      />

      {/* Тасвир */}
      <FileUploader
        label="Изображение услуги"
        onUpload={handleFileUpload}
        currentFile={formData.imageUrl}
      />

      {/* 👈 ColorPicker илова шуд */}
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