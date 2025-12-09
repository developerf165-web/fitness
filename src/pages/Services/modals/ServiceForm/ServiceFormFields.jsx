// src/pages/Services/forms/ServiceForm/ServiceFormFields.jsx

import React from 'react';
import InputField from '/src/components/ui/InputField';
import TextArea from '/src/components/ui/TextArea';
import FileUploader from '/src/components/ui/FileUploader';
import SelectField from '/src/components/ui/SelectField';
import { FORM_LABELS, FORM_PLACEHOLDERS, STATUS_OPTIONS } from '../../constants';

/**
 * Формаи Service - Fields
 */
export default function ServiceFormFields({
  formData,
  onChange,
  onFileUpload,
  isEditMode = false,
  errors = {}, // Илова барои error display
  onBlur = () => { }, // Илова барои validation
}) {
  return (
    <>
      {/* Номи хидмат */}
      <InputField
        label={FORM_LABELS.TITLE}
        name="title"
        value={formData.title}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={FORM_PLACEHOLDERS.TITLE}
        error={errors.title}
        required
      />

      {/* Тавсиф */}
      <TextArea
        label={FORM_LABELS.DESCRIPTION}
        name="description"
        value={formData.description}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={FORM_PLACEHOLDERS.DESCRIPTION}
        error={errors.description}
        required
      />

      {/* Нарх */}
      <InputField
        label={FORM_LABELS.PRICE}
        name="price"
        type="number"
        value={formData.price}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={FORM_PLACEHOLDERS.PRICE}
        error={errors.price}
        required
      />

      {/* Тахфиф */}
      <InputField
        label={FORM_LABELS.DISCOUNT}
        name="discount"
        type="number"
        value={formData.discount}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={FORM_PLACEHOLDERS.DISCOUNT}
        error={errors.discount}
        required
        min="0"
        max="100"
      />

      {/* Шумораи боздидҳо */}
      <InputField
        label={FORM_LABELS.VISIT_COUNT}
        name="visit_count"
        type="number"
        value={formData.visit_count}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={FORM_PLACEHOLDERS.VISIT_COUNT}
        error={errors.visit_count}
        required
        min="0"
      />

      {/* Тасвир */}
      <FileUploader
        title={FORM_PLACEHOLDERS.IMAGE_TITLE}
        description={FORM_PLACEHOLDERS.IMAGE_DESC}
        imageSrc={formData.imageUrl}
        onUpload={onFileUpload}
        error={errors.image}
        required={!isEditMode}
      />

      {/* Ҳолат - танҳо барои таҳрир */}
      {isEditMode && (
        <SelectField
          label={FORM_LABELS.STATUS}
          name="status"
          value={formData.status}
          onChange={onChange}
        >
          <option value={STATUS_OPTIONS.ACTIVE.value}>
            {STATUS_OPTIONS.ACTIVE.label}
          </option>
          <option value={STATUS_OPTIONS.INACTIVE.value}>
            {STATUS_OPTIONS.INACTIVE.label}
          </option>
        </SelectField>
      )}

    </>
  );
}
