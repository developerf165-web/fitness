// src/pages/Services/components/DirectionForm/DirectionFormFields.jsx

import React from 'react';
import InputField from '/src/components/ui/InputField';
import TextArea from '/src/components/ui/TextArea';
import FileUploader from '/src/components/ui/FileUploader';
import CharacterCounter from '/src/components/ui/CharacterCounter';
import { FORM_LIMITS } from '../../constants/formLimits';

/**
 * Формаи Direction - Fields
 */
export default function DirectionFormFields({
  formData,
  onChange,
  onIconUpload,
}) {
  const { TITLE_MAX, DESCRIPTION_MAX } = FORM_LIMITS.DIRECTION;

  const titleLength = formData.title?.length || 0;

  return (
    <>
      {/* Номи направление */}
      <InputField
        label="Название"
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="Введите название направления"
        maxLength={TITLE_MAX}
        required
      />
      <CharacterCounter current={titleLength} max={TITLE_MAX} />

      {/* Тавсиф */}
      <TextArea
        label="Описание"
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Краткое описание направления"
        maxLength={DESCRIPTION_MAX}
        rows={5}
      />
    </>
  );
}
