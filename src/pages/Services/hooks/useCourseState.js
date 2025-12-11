// src/pages/Services/hooks/useCourseState.js

import { useCourses } from './useCourses';
import { useModalState } from '@hooks/useModalState';
import { useDeleteModal } from '@hooks/useDeleteModal';
import { useCourseCardioModal } from './useCourseCardioModal';
import useCrudLogic from '@hooks/useCrudLogic';

/**
 * State ва Handlers барои Courses
 */
export default function useCourseState(showToast) {
  const { courses, setCourses, isLoading, error } = useCourses();
  const courseFormModal = useModalState();
  const courseDeleteModal = useDeleteModal();
  const courseCancelModal = useDeleteModal(); // Барои бекоркунӣ
  const courseCardioModal = useCourseCardioModal();

  // --- Handlers (using shared logic) ---

  // NOTE: Чунки API барои курсҳо ҳоло нест, мо mock function-ҳоро месозем
  const mockCreateApi = async (formData) => ({
    id: Date.now(),
    ...formData,
    statusColor: "color-bg-accent"
  });

  const mockUpdateApi = async (id, formData) => ({
    ...courseFormModal.editingItem, // keep existing fields
    ...formData
  });

  // API Call барои delete (ҳоло mock)
  const mockDeleteApi = async (id) => { /* No-op for now */ };

  const { handleConfirmDelete, handleSubmit } = useCrudLogic({
    createApi: mockCreateApi,
    updateApi: mockUpdateApi,
    deleteApi: mockDeleteApi,
    setItems: setCourses,
    formModal: courseFormModal,
    deleteModal: courseDeleteModal,
    showToast,
  });

  const courseHandlers = {
    handleConfirmDelete,
    handleSubmit: handleSubmit('Курс успешно создан', 'Курс успешно обновлен')
  };

  return {
    courses,
    courseModals: {
      form: courseFormModal,
      delete: courseDeleteModal,
      cancel: courseCancelModal,
      cardio: courseCardioModal,
    },
    courseHandlers,
    isLoading,
    error
  };
}
