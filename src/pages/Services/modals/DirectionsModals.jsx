// src/pages/Services/modals/DirectionsModals.jsx

import React from 'react';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import { DirectionFormModal } from '../forms';

/**
 * Ҳамаи модалҳо барои Directions
 */
export default function DirectionsModals({ 
  modals, 
  handlers 
}) {
  return (
    <>
      {/* Модали тасдиқи нест кардан */}
      <DeleteConfirmationModal
        isOpen={modals.delete.isOpen}
        onClose={modals.delete.close}
        onConfirm={handlers.handleConfirmDelete}
        isDeleting={modals.delete.isDeleting}
        itemName={modals.delete.itemToDelete?.title}
      />
      
      {/* Модали таҳрир/сохтан */}
      <DirectionFormModal
        isOpen={modals.form.isOpen}
        onClose={modals.form.close}
        onSubmit={handlers.handleSubmit}
        initialData={modals.form.editingItem}
        isSubmitting={modals.form.isSubmitting}
      />
    </>
  );
}
