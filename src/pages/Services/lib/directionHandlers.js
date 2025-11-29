// src/pages/Services/lib/directionHandlers.js

import { createItem, updateItem, deleteItem, handleSubmit } from '../utils/crudHelpers';

/**
 * Handlers барои Directions
 */
export const createDirectionHandlers = (
  setDirections,
  showToast,
  formModal,
  deleteModal
) => {
  // DELETE
  const handleConfirmDelete = async () => {
    if (!deleteModal.itemToDelete) return;
    
    await deleteItem(
      async () => { /* API Call агар лозим бошад */ },
      deleteModal.itemToDelete.id,
      setDirections,
      deleteModal,
      showToast,
      'Направление успешно удалено'
    );
  };

  // CREATE
  const handleCreate = async (formData) => {
    await createItem(
      async () => ({
        id: Date.now(),
        ...formData
      }),
      setDirections,
      formModal,
      showToast,
      'Направление успешно создано'
    );
  };

  // UPDATE
  const handleUpdate = async (formData) => {
    if (!formModal.editingItem) return;
    
    await updateItem(
      async () => ({
        ...formModal.editingItem,
        ...formData
      }),
      formModal.editingItem.id,
      setDirections,
      formModal,
      showToast,
      'Направление успешно обновлено'
    );
  };

  return {
    handleConfirmDelete,
    handleSubmit: handleSubmit(formModal, handleCreate, handleUpdate)
  };
};
