// src/pages/Services/modals/ServicesModals.jsx

import React from 'react';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import { ServiceFormModal } from '../forms';

/**
 * Ҳамаи модалҳо барои Services
 */
export default function ServicesModals({ 
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
      <ServiceFormModal
        isOpen={modals.form.isOpen}
        onClose={modals.form.close}
        onSubmit={handlers.handleSubmit}
        initialData={modals.form.editingItem}
        isSubmitting={modals.form.isSubmitting}
      />
    </>
  );
}
