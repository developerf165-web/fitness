// src/pages/Services/hooks/useDirectionState.js

import { useDirections } from './useDirections';
import { useModalState } from './useModalState';
import { useDeleteModal } from './useDeleteModal';
import { createDirectionHandlers } from '../lib';

/**
 * State ва Handlers барои Directions
 */
export default function useDirectionState(showToast) {
  const { directions, setDirections } = useDirections();
  const directionFormModal = useModalState();
  const directionDeleteModal = useDeleteModal();

  // Handlers-ро аз lib месозем
  const directionHandlers = createDirectionHandlers(
    setDirections,
    showToast,
    directionFormModal,
    directionDeleteModal
  );

  return {
    directions,
    directionModals: {
      form: directionFormModal,
      delete: directionDeleteModal,
    },
    directionHandlers,
  };
}
