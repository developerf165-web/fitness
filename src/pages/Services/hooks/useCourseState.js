// src/pages/Services/hooks/useCourseState.js

import { useCourses } from './useCourses'; // Аз файли аслии шумо
import { useModalState } from './useModalState'; // Аз файли аслии шумо
import { useDeleteModal } from './useDeleteModal'; // Аз файли аслии шумо

export default function useCourseState(showToast) {
  const { courses, setCourses } = useCourses();
  const courseFormModal = useModalState();
  const courseCancelModal = useDeleteModal(); // Модал барои бекоркунӣ
  const cardioCourseModal = useModalState();

  // Handlers-и Courses
  const handleSubmit = async (data) => {
    showToast(`Курс "${data.title}" успешно сохранен!`, 'success');
    courseFormModal.close();
    // Логикаи навсозии State: setCourses(...)
  };

  // Логикаи Cancel/Launch дар useServicePageLogic идора карда мешавад.

  return {
    courses,
    courseModals: {
      form: courseFormModal,
      cancel: courseCancelModal, // барои CourseCancelConfirmationModal
      cardio: cardioCourseModal, // барои CardioCourseModal
    },
    courseHandlers: {
      handleSubmit,
    },
  };
}