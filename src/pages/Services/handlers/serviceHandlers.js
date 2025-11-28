import { deleteService, createService, updateService } from '../api/servicesApi';

/**
 * Handlers барои амалиёти CRUD бо Services
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

    deleteModal.setIsDeleting(true);
    try {
      await deleteService(deleteModal.itemToDelete.id);
      
      setServices(currentServices => 
        currentServices.filter(service => service.id !== deleteModal.itemToDelete.id)
      );
      
      deleteModal.close();
      showToast('success', 'Успех', 'Услуга успешно удалена');
      
    } catch (err) {
      alert("Ошибка при удалении: " + err.message);
    } finally {
      deleteModal.setIsDeleting(false);
    }
  };

  // CREATE
  const handleCreate = async (formData) => {
    formModal.setIsSubmitting(true);
    try {
      const newService = await createService(formData);
      
      const formattedService = {
        id: newService.id,
        title: newService.name,
        imageUrl: newService.img,
        tjs: newService.price,
        pos: 'услуга',
        description: newService.description || ''
      };
      
      setServices(prev => [...prev, formattedService]);
      formModal.close();
      showToast('success', 'Успех', 'Услуга успешно создана');
      
    } catch (err) {
      alert("Ошибка при создании: " + err.message);
    } finally {
      formModal.setIsSubmitting(false);
    }
  };

  // UPDATE
  const handleUpdate = async (formData) => {
    if (!formModal.editingItem) return;
    
    formModal.setIsSubmitting(true);
    try {
      const updatedService = await updateService(formModal.editingItem.id, formData);
      
      setServices(prev => prev.map(service => 
        service.id === formModal.editingItem.id 
          ? {
              ...service,
              title: updatedService.name,
              imageUrl: updatedService.img,
              tjs: updatedService.price,
              description: updatedService.description || ''
            }
          : service
      ));
      
      formModal.close();
      showToast('success', 'Успех', 'Услуга успешно обновлена');
      
    } catch (err) {
      alert("Ошибка при обновлении: " + err.message);
    } finally {
      formModal.setIsSubmitting(false);
    }
  };

  // SUBMIT (CREATE ё UPDATE)
  const handleSubmit = (formData) => {
    if (formModal.editingItem) {
      handleUpdate(formData);
    } else {
      handleCreate(formData);
    }
  };

  return {
    handleConfirmDelete,
    handleSubmit
  };
};
