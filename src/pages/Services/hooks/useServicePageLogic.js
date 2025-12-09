// src/pages/Services/hooks/useServicePageLogic.js

import { useToast } from '../../components/Toast/ToastContext';
import useServiceState from './useServiceState';
import useCourseState from './useCourseState';
import useDirectionState from './useDirectionState';

export default function useServicePageLogic() {
  const { showToast } = useToast();

  // --- (1) Истифодаи Hooks-ҳои фаръӣ барои State/Handlers ---
  const { services, isLoading, error, serviceModals, serviceHandlers } = useServiceState(showToast);
  const { courses, courseModals, courseHandlers } = useCourseState(showToast);
  const { directions, directionModals, directionHandlers } = useDirectionState(showToast);

  // --- (2) Логикаи махсуси Courses (Запуск/Отмена) ---

  // Логика барои кушодани CardioCourseModal (Запустить/Готово)
  const handleLaunchClick = (item) => {
    courseModals.cardio.open(item);
  };

  // Логика барои кушодани CourseCancelConfirmationModal (Отменить)
  const handleCancelClick = (item) => {
    // courseModals.cancel ин useDeleteModal аст
    courseModals.cancel.openDelete(item);
  };

  // Логикаи тасдиқи бекоркунӣ (Инҷо мо бояд ба курсҳо таъсир расонем, ё API-ро иҷро кунем)
  const handleConfirmCancel = async (actionType, id, reason) => {
    const courseTitle = courseModals.cancel.itemToDelete?.title || 'Курс';

    // (Агар лозим бошад, API-ро инҷо иҷро кунед)
    // await cancelCourseApi(id, reason); 

    showToast(`Курс "${courseTitle}" успешно отменен. Причина: ${reason.substring(0, 70)}${reason.length > 70 ? '...' : ''}`, 'success');

    courseModals.cancel.close();
  };


  return {
    // Data
    isLoading,
    error,
    services,
    courses,
    directions,

    // State Hooks
    serviceModals,
    courseModals,
    directionModals,

    // Handlers
    serviceHandlers,
    courseHandlers,
    directionHandlers,
    handleLaunchClick,
    handleCancelClick,
    handleConfirmCancel,

    // Toast
    showToast,
  };
}