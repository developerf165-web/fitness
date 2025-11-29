// src/pages/Services/lib/serviceHandlers.js

import { deleteService, createService, updateService } from '../api/servicesApi';
import { createItem, updateItem, deleteItem, handleSubmit } from '../utils/crudHelpers';

/**
 * Handlers барои Services бо истифодаи helper functions
 */
export const createServiceHandlers = (
  setServices,
  showToast,
  formModal,
  deleteModal
) => {
  // DELETE
  const handleConfirmDelete = async () => {
    if (!deleteModal.itemToDelete) return;
    
    await deleteItem(
      () => deleteService(deleteModal.itemToDelete.id),
      deleteModal.itemToDelete.id,
      setServices,
      deleteModal,
      showToast,
      'Услуга успешно удалена'
    );
  };

  // CREATE
  const handleCreate = async (formData) => {
    await createItem(
      async () => {
        const newService = await createService(formData);
        return {
          id: newService.id,
          title: newService.name,
          imageUrl: newService.img,
          tjs: newService.price,
          pos: 'услуга',
          description: newService.description || ''
        };
      },
      setServices,
      formModal,
      showToast,
      'Услуга успешно создана'
    );
  };

  // UPDATE
  const handleUpdate = async (formData) => {
    if (!formModal.editingItem) return;
    
    await updateItem(
      async () => {
        const updatedService = await updateService(formModal.editingItem.id, formData);
        return {
          ...formModal.editingItem,
          title: updatedService.name,
          imageUrl: updatedService.img,
          tjs: updatedService.price,
          description: updatedService.description || ''
        };
      },
      formModal.editingItem.id,
      setServices,
      formModal,
      showToast,
      'Услуга успешно обновлена'
    );
  };

  return {
    handleConfirmDelete,
    handleSubmit: handleSubmit(formModal, handleCreate, handleUpdate)
  };
};
