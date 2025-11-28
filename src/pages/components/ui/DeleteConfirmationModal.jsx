import React from 'react';
import Modal from './Modal';
import AlertIcon from '@/components/Icons/AlertIcon'

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  customMessage,  // 🔥 матни кастом
  isDeleting = false 
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="color-bg-card text-white p-6 rounded-2xl shadow-xl max-w-sm mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/30 border border-red-700">
            <AlertIcon className="h-6 w-6 text-red-500" />
          </div>
          <div className="mt-2 text-center px-14 py-2">
            <p className="text-md leading-relaxed font-bold text-gray-300">

              {customMessage 
                ? customMessage 
                : `Вы действительно хотите удалить "${itemName}"?`
              }

            </p>
          </div>
        </div>
        
        <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md cursor-pointer shadow-sm px-4 py-2 color-bg-mini-card text-base font-medium text-gray-300 bg-hover-card focus:outline-none sm:text-sm disabled:opacity-50"
            onClick={onClose}
            disabled={isDeleting}
          >
            Отмена
          </button>
          <button
            type="button"
            className="w-full inline-flex cursor-pointer justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:text-sm disabled:opacity-50 disabled:bg-red-800"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
