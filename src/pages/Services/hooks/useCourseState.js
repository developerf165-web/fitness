// src/pages/Services/hooks/useCourseState.js

import { useCourses } from './useCourses';
import { useModalState } from './useModalState';
import { useDeleteModal } from './useDeleteModal';
import { useCourseCardioModal } from './useCourseCardioModal';
import { createCourseHandlers } from '../lib';

/**
 * State ва Handlers барои Courses
 */
export default function useCourseState(showToast) {
  const { courses, setCourses } = useCourses();
  const courseFormModal = useModalState();
  const courseDeleteModal = useDeleteModal();
  const courseCancelModal = useDeleteModal(); // Барои бекоркунӣ
  const courseCardioModal = useCourseCardioModal();

  // Handlers-ро аз lib месозем
  const courseHandlers = createCourseHandlers(
    setCourses,
    showToast,
    courseFormModal,
    courseDeleteModal
  );

  return {
    courses,
    courseModals: {
      form: courseFormModal,
      delete: courseDeleteModal,
      cancel: courseCancelModal,
      cardio: courseCardioModal,
    },
    courseHandlers,
  };
}
