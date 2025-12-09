// src/pages/Services/hooks/useDirectionState.js

import { useDirections } from './useDirections';
import { useModalState } from '@hooks/useModalState';
import { useDeleteModal } from '@hooks/useDeleteModal';
import useCrudLogic from '@hooks/useCrudLogic';

/**
 * State ва Handlers барои Directions
 */
export default function useDirectionState(showToast) {
  const { directions, setDirections } = useDirections();
  const directionFormModal = useModalState();
  const directionDeleteModal = useDeleteModal();

  // --- Handlers (using shared logic) ---

  // Mock APIs for Directions
  const mockCreateApi = async (formData) => ({
    id: Date.now(),
    ...formData
  });

  const mockUpdateApi = async (id, formData) => ({
    ...directionFormModal.editingItem,
    ...formData
  });

  const mockDeleteApi = async (id) => { /* No-op */ };

  const { handleConfirmDelete, handleSubmit } = useCrudLogic({
    createApi: mockCreateApi,
    updateApi: mockUpdateApi,
    deleteApi: mockDeleteApi,
    setItems: setDirections,
    formModal: directionFormModal,
    deleteModal: directionDeleteModal,
    showToast,
  });

  const directionHandlers = {
    handleConfirmDelete,
    handleSubmit: handleSubmit('Направление успешно создано', 'Направление успешно обновлено')
  };

  return {
    directions,
    directionModals: {
      form: directionFormModal,
      delete: directionDeleteModal,
    },
    directionHandlers,
  };
}
