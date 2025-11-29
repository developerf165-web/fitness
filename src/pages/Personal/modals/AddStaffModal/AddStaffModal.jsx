// src/pages/Personal/modals/AddStaffModal/AddStaffModal.jsx

import React from 'react';
import AddStaffForm from './AddStaffForm';
import { useAddStaffForm } from './useAddStaffForm';
import { useStaffCreate } from '../../features/staff';

/**
 * Modal барои сохтани staff нав
 */
export default function AddStaffModal({ isOpen, onClose, onSuccess }) {
  const { formData, errors, handleChange, validate, resetForm } = useAddStaffForm();
  const { createNewStaff, isCreating } = useStaffCreate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await createNewStaff(formData);
      resetForm();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            Добавить сотрудника
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <AddStaffForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-800 flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={isCreating}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {isCreating ? 'Сохранение...' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
