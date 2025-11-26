// src/components/modals/AddCategoryModal.jsx

import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import Card from '../../ui/Card';
import InputField from '../../ui/InputField';
import Button from '../../ui/Button';

export default function AddCategoryModal({ isOpen, onClose, onSave, isSaving = false }) {
  const [categoryName, setCategoryName] = useState('');

  const handleSave = () => {
    if (categoryName.trim() === '') {
      alert("Пожалуйста, введите название категории.");
      return;
    }
    onSave(categoryName.trim());
    setCategoryName(''); // Очистка поля ввода
  };

  const handleClose = () => {
    setCategoryName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Card title="ДОБАВИТЬ КАТЕГОРИЮ" className="w-[380px]">
        
        <InputField
          label="Название категории*"
          placeholder="Введите название категории"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        
        {/* Кнопки действий */}
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
              disabled={isSaving || categoryName.trim() === ''} // Тугмаро ғайрифаъол мекунем, агар холӣ бошад
            >
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </Button>
        </div>
      </Card>
    </Modal>
  );
}
