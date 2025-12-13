import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Card from '../../../components/ui/Card';
import InputField from '../../../components/ui/InputField';
import Button from '../../../components/ui/Button';

export default function AddCategoryModal({ isOpen, onClose, onSave, isSaving = false, initialValue = '' }) {
  const [categoryName, setCategoryName] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setCategoryName(initialValue || '');
    }
  }, [isOpen, initialValue]);

  const handleSave = () => {
    if (categoryName.trim() === '') {
      alert("Пожалуйста, введите название категории.");
      return;
    }
    onSave(categoryName.trim());
    setCategoryName('');
  };

  const handleClose = () => {
    setCategoryName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Card title={initialValue ? "РЕДАКТИРОВАТЬ КАТЕГОРИЮ" : "ДОБАВИТЬ КАТЕГОРИЮ"} className="w-[380px]">

        <InputField
          label="Название категории*"
          placeholder="Введите название категории"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between space-x-5 gap-3">
          <Button
            onClick={handleClose}
            variant="default"
            disabled={isSaving}
          >
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            variant="primary"
            disabled={isSaving || categoryName.trim() === ''}
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </Card>
    </Modal>
  );
}
