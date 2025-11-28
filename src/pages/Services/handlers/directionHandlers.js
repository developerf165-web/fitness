/**
 * Handlers барои амалиёти CRUD бо Directions
 */

export const createDirectionHandlers = (
  setDirections,
  showToast,
  formModal,
  deleteModal
) => {
  // DELETE
  const handleConfirmDelete = () => {
    if (!deleteModal.itemToDelete) return;

    deleteModal.setIsDeleting(true);
    try {
      setDirections(currentDirections => 
        currentDirections.filter(direction => direction.id !== deleteModal.itemToDelete.id)
      );
      
      deleteModal.close();
      showToast('success', 'Успех', 'Направление успешно удалено');
      
    } catch (err) {
      alert("Ошибка при удалении: " + err.message);
    } finally {
      deleteModal.setIsDeleting(false);
    }
  };

  // CREATE
  const handleCreate = (formData) => {
    formModal.setIsSubmitting(true);
    try {
      const newDirection = {
        id: Date.now(),
        ...formData
      };
      
      setDirections(prev => [...prev, newDirection]);
      formModal.close();
      showToast('success', 'Успех', 'Направление успешно создано');
      
    } catch (err) {
      alert("Ошибка при создании: " + err.message);
    } finally {
      formModal.setIsSubmitting(false);
    }
  };

  // UPDATE
  const handleUpdate = (formData) => {
    if (!formModal.editingItem) return;
    
    formModal.setIsSubmitting(true);
    try {
      setDirections(prev => prev.map(direction => 
        direction.id === formModal.editingItem.id 
          ? { ...direction, ...formData }
          : direction
      ));
      
      formModal.close();
      showToast('success', 'Успех', 'Направление успешно обновлено');
      
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
