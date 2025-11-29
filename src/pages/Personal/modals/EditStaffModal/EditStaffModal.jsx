// src/pages/Personal/modals/EditStaffModal/EditStaffModal.jsx

import React, { useEffect } from 'react';
import AddStaffForm from '../AddStaffModal/AddStaffForm';
import { useAddStaffForm } from '../AddStaffModal/useAddStaffForm';
import { useStaffUpdate } from '../../features/staff';

/**
 * Modal барои таҳрири staff
 * 
 * Note: Форма ҳамон AddStaffForm аст (reuse)
 */
export default function EditStaffModal({ isOpen, staff, onClose, onSuccess }) {
  const { formData, errors, handleChange, validate, resetForm } = useAddStaffForm();
  const { updateStaffData, isUpdating } = useStaffUpdate();

  // Пур кардани форма бо маълумоти staff
  useEffect(() => {
    if (staff && isOpen) {
      // Manual set formData
      Object.keys(staff).forEach(key => {
        if (formData.hasOwnProperty(key)) {
          handleChange({ target: { name: key, value: staff[key] } });
        }
      });
    }
  }, [staff, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await updateStaffData(staff.id, formData);
      resetForm();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const handleClose = () => {
    if (!isUpdating) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen || !staff) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            Редактировать сотрудника
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <AddStaffForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </div>

          <div className="px-6 py-4 border-t border-gray-800 flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={isUpdating}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {isUpdating ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
