// src/pages/Services/hooks/useServiceState.js

import { useServices } from './useServices';
import { useModalState } from '/src/hooks/useModalState';
import { useDeleteModal } from '/src/hooks/useDeleteModal';
import { deleteService, createService, updateService } from '../api/servicesApi';
import useCrudLogic from '/src/hooks/useCrudLogic';
import { transformServiceResponse } from '../utils/transformers';

/**
 * State ва Handlers барои Services
 */
export default function useServiceState(showToast) {
  const { services, setServices, isLoading, error, refetch } = useServices();
  const serviceFormModal = useModalState();
  const serviceDeleteModal = useDeleteModal();

  const IS_LOGGING_ENABLED = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';

  // --- Handlers (using shared logic) ---
  const { handleConfirmDelete, handleSubmit } = useCrudLogic({
    createApi: createService,
    updateApi: updateService,
    deleteApi: deleteService,
    transformResponse: transformServiceResponse,
    setItems: setServices,
    refetch, // Pass refetch function
    formModal: serviceFormModal,
    deleteModal: serviceDeleteModal,
    showToast,
    logging: { enabled: IS_LOGGING_ENABLED, namespace: 'SERVICE HANDLER' }
  });

  const serviceHandlers = {
    handleConfirmDelete,
    handleSubmit: handleSubmit('Услуга успешно создана', 'Услуга успешно обновлена')
  };

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
