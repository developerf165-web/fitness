// src/pages/Services/hooks/useDirectionState.js

import { useDirections } from './useDirections';
import { useModalState } from '@hooks/useModalState';
import { useDeleteModal } from '@hooks/useDeleteModal';
import useCrudLogic from '@hooks/useCrudLogic';
import { createDirection, updateDirection, deleteDirection } from '../api/directionsApi';

/**
 * State ва Handlers барои Directions
 */
export default function useDirectionState(showToast) {
  const { directions, setDirections, isLoading, error, refetch } = useDirections();
  const directionFormModal = useModalState();
  const directionDeleteModal = useDeleteModal();

  const IS_LOGGING_ENABLED = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';

  // --- Handlers (using shared logic) ---
  const { handleConfirmDelete, handleSubmit } = useCrudLogic({
    createApi: createDirection,
    updateApi: updateDirection,
    deleteApi: deleteDirection,
    transformResponse: (item) => ({
      id: item.id,
      title: item.title,
      description: item.description || '',
      iconUrl: item.icon || item.iconUrl || '',
    }),
    setItems: setDirections,
    refetch, // Pass refetch function
    formModal: directionFormModal,
    deleteModal: directionDeleteModal,
    showToast,
    logging: { enabled: IS_LOGGING_ENABLED, namespace: 'DIRECTION HANDLER' }
  });

  const directionHandlers = {
    handleConfirmDelete,
    handleSubmit: handleSubmit('Направление успешно создано', 'Направление успешно обновлено')
  };

  return {
    directions,
    isLoading,
    error,
    directionModals: {
      form: directionFormModal,
      delete: directionDeleteModal,
    },
    directionHandlers,
  };
}
