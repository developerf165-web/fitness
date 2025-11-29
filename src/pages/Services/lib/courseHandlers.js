// src/pages/Services/lib/courseHandlers.js

import { createItem, updateItem, deleteItem, handleSubmit } from '../utils/crudHelpers';

/**
 * Handlers барои Courses
 */
export const createCourseHandlers = (
  setCourses,
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
      setCourses,
      deleteModal,
      showToast,
      'Курс успешно удален'
    );
  };

  // CREATE
  const handleCreate = async (formData) => {
    await createItem(
      async () => ({
        id: Date.now(),
        ...formData,
        statusColor: "color-bg-accent"
      }),
      setCourses,
      formModal,
      showToast,
      'Курс успешно создан'
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
      setCourses,
      formModal,
      showToast,
      'Курс успешно обновлен'
    );
  };

  return {
    handleConfirmDelete,
    handleSubmit: handleSubmit(formModal, handleCreate, handleUpdate)
  };
};
