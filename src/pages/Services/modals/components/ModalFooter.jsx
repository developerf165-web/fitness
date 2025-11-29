// src/pages/Services/modals/CardioCourseModal/components/ModalFooter.jsx

import React from 'react';
import Button from '@/components/ui/Button';

export default function ModalFooter({ onCancel, onSave, cancelText, saveText, isLoading = false }) {
  return (
    <div className="flex items-center justify-between w-full mt-4">
      <Button
        type="button"
        onClick={onCancel}
        variant="default"
        disabled={isLoading}
      >
        {cancelText || "Отмена"}
      </Button>

      <Button
        type="button"
        onClick={onSave}
        variant="primary"
        disabled={isLoading}
      >
        {isLoading ? "Сохранение..." : (saveText || "Сохранить")}
      </Button>
    </div>
  );
}
