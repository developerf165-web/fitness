/**
 * Handlers барои амалиёти CRUD бо Courses
 */

export const createCourseHandlers = (
  setCourses,
  showToast,
  formModal,
  deleteModal
) => {
  // DELETE
  const handleConfirmDelete = () => {
    if (!deleteModal.itemToDelete) return;

    deleteModal.setIsDeleting(true);
    try {
      setCourses(currentCourses => 
        currentCourses.filter(course => course.id !== deleteModal.itemToDelete.id)
      );
      
      deleteModal.close();
      showToast('success', 'Успех', 'Курс успешно удален');
      
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
      const newCourse = {
        id: Date.now(),
        ...formData,
        statusColor: "color-bg-accent"
      };
      
      setCourses(prev => [...prev, newCourse]);
      formModal.close();
      showToast('success', 'Успех', 'Курс успешно создан');
      
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
      setCourses(prev => prev.map(course => 
        course.id === formModal.editingItem.id 
          ? { ...course, ...formData }
          : course
      ));
      
      formModal.close();
      showToast('success', 'Успех', 'Курс успешно обновлен');
      
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
