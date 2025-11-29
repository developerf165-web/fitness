// src/pages/Services/components/DirectionForm/DirectionFormFields.jsx

import React from 'react';
import InputField from '@/components/ui/InputField';
import TextArea from '@/components/ui/TextArea';
import FileUploader from '@/components/ui/FileUploader';
import ColorPicker from '@/components/ui/ColorPicker';

/**
 * Формаи Direction - Fields
 */
export default function DirectionFormFields({
  formData,
  onChange,
  onIconUpload,
  onColorSelect,
}) {
  return (
    <>
      {/* Номи направление */}
      <InputField
        label="Название"
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="Введите название направления"
        required
      />

      {/* Тавсиф */}
      <TextArea
        label="Описание"
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Краткое описание направления"
        rows={3}
      />

      {/* Интихоби ранг */}
      <ColorPicker
        selectedColor={formData.color}
        onSelectColor={onColorSelect}
      />


    </>
  );
}
