// src/pages/Services/utils/crudHelpers.js

/**
 * Helper функсияҳо барои CRUD амалиётҳо
 * Барои кам кардани дубликатсияи код
 */

/**
 * Умумӣ CREATE handler
 */
export const createItem = async (
  apiCall,
  setItems,
  formModal,
  showToast,
  successMessage
) => {
  formModal.setIsSubmitting(true);
  try {
    const newItem = await apiCall();
    setItems(prev => [...prev, newItem]);
    formModal.close();
    showToast('success', 'Успех', successMessage);
  } catch (err) {
    alert("Ошибка при создании: " + err.message);
  } finally {
    formModal.setIsSubmitting(false);
  }
};

/**
 * Умумӣ UPDATE handler
 */
export const updateItem = async (
  apiCall,
  itemId,
  setItems,
  formModal,
  showToast,
  successMessage
) => {
  formModal.setIsSubmitting(true);
  try {
    const updatedItem = await apiCall();
    setItems(prev => prev.map(item => 
      item.id === itemId ? updatedItem : item
    ));
    formModal.close();
    showToast('success', 'Успех', successMessage);
  } catch (err) {
    alert("Ошибка при обновлении: " + err.message);
  } finally {
    formModal.setIsSubmitting(false);
  }
};

/**
 * Умумӣ DELETE handler
 */
export const deleteItem = async (
  apiCall,
  itemId,
  setItems,
  deleteModal,
  showToast,
  successMessage
) => {
  deleteModal.setIsDeleting(true);
  try {
    await apiCall();
    setItems(currentItems => 
      currentItems.filter(item => item.id !== itemId)
    );
    deleteModal.close();
    showToast('success', 'Успех', successMessage);
  } catch (err) {
    alert("Ошибка при удалении: " + err.message);
  } finally {
    deleteModal.setIsDeleting(false);
  }
};

/**
 * Умумӣ SUBMIT handler (CREATE ё UPDATE)
 */
export const handleSubmit = (formModal, onCreate, onUpdate) => {
  return (formData) => {
    if (formModal.editingItem) {
      onUpdate(formData);
    } else {
      onCreate(formData);
    }
  };
};
