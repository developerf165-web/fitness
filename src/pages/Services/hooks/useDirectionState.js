// src/pages/Services/hooks/useDirectionState.js

import { useDirections } from './useDirections'; // Аз файли аслии шумо
import { useModalState } from './useModalState'; // Аз файли аслии шумо
import { useDeleteModal } from './useDeleteModal'; // Аз файли аслии шумо

export default function useDirectionState(showToast) {
  const { directions, setDirections } = useDirections();
  const directionFormModal = useModalState();
  const directionDeleteModal = useDeleteModal();

  // Handlers-и Directions
  const handleSubmit = async (data) => {
    showToast(`Направление "${data.title}" успешно сохранено!`, 'success');
    directionFormModal.close();
    // Логикаи навсозии State: setDirections(...)
  };
  
  const handleConfirmDelete = async () => {
    const id = directionDeleteModal.itemToDelete.id;
    showToast(`Направление успешно удалено! ID: ${id}`, 'success');
    directionDeleteModal.close();
    // Логикаи навсозии State: setDirections(...)
  };

  return {
    directions,
    directionModals: {
      form: directionFormModal,
      delete: directionDeleteModal,
    },
    directionHandlers: {
      handleSubmit,
      handleConfirmDelete,
    },
  };
}