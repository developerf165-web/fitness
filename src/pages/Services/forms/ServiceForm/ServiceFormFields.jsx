// src/pages/Services/forms/ServiceForm/ServiceFormFields.jsx

import React from 'react';
import InputField from '@/components/ui/InputField';
import TextArea from '@/components/ui/TextArea';
import FileUploader from '@/components/ui/FileUploader';
import ColorPicker from '@/components/ui/ColorPicker';

/**
 * Формаи Service - Fields
 */
export default function ServiceFormFields({
  formData,
  onChange,
  onFileUpload,
  onColorSelect,
}) {
  return (
    <>
      {/* Номи хидмат */}
      <InputField
        label="Название"
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="Введите название услуги"
        required
      />

      {/* Нарх */}
      <InputField
        label="Цена за посещение"
        name="price"
        type="number"
        value={formData.price}
        onChange={onChange}
        placeholder="Введите цену за одно посещение"
        required
      />

      {/* Тасвир */}
      <FileUploader
        label="Изображение услуги"
        onUpload={onFileUpload}
        currentFile={formData.imageUrl}
      />

      {/* Интихоби ранг */}
      <ColorPicker
        selectedColor={formData.color}
        onSelectColor={onColorSelect}
      />

    </>
  );
}
