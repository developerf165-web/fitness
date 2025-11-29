// src/pages/Services/hooks/useServiceState.js

import { useServices } from './useServices';
import { useModalState } from './useModalState';
import { useDeleteModal } from './useDeleteModal';
import { createServiceHandlers } from '../lib';

/**
 * State ва Handlers барои Services
 */
export default function useServiceState(showToast) {
  const { services, setServices, isLoading, error } = useServices();
  const serviceFormModal = useModalState();
  const serviceDeleteModal = useDeleteModal();

  // Handlers-ро аз lib месозем
  const serviceHandlers = createServiceHandlers(
    setServices,
    showToast,
    serviceFormModal,
    serviceDeleteModal
  );

  return {
    services,
    isLoading,
    error,
    serviceModals: {
      form: serviceFormModal,
      delete: serviceDeleteModal,
    },
    serviceHandlers,
  };
}
