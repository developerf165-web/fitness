// src/pages/Personal/modals/DeleteConfirmModal/DeleteConfirmModal.jsx

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useStaffDelete } from '../../features/staff';

/**
 * Modal барои тасдиқи нест кардани staff
 */
export default function DeleteConfirmModal({ isOpen, staff, onClose, onSuccess }) {
  const { deleteStaffById, isDeleting } = useStaffDelete();

  const handleDelete = async () => {
    if (!staff) return;

    try {
      await deleteStaffById(staff.id);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  if (!isOpen || !staff) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <h2 className="text-xl font-semibold text-white">
            Удалить сотрудника
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-gray-300">
            Вы уверены, что хотите удалить сотрудника{' '}
            <span className="font-semibold text-white">{staff.fullName}</span>?
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Это действие нельзя отменить.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </div>
    </div>
  );
}
