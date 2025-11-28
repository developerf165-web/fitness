// src/pages/Services/hooks/useServiceState.js

import { useServices } from './useServices'; // Аз файли аслии шумо
import { useModalState } from './useModalState'; // Аз файли аслии шумо
import { useDeleteModal } from './useDeleteModal'; // Аз файли аслии шумо

export default function useServiceState(showToast) {
  const { services, setServices, isLoading, error } = useServices();
  const serviceFormModal = useModalState();
  const serviceDeleteModal = useDeleteModal();

  // Handlers-и Services
  const handleSubmit = async (data) => {
    showToast(`Услуга "${data.title}" успешно сохранена!`, 'success');
    serviceFormModal.close();
    // Логикаи навсозии State: setServices(...)
  };
  
  const handleConfirmDelete = async () => {
    const id = serviceDeleteModal.itemToDelete.id;
    showToast(`Услуга успешно удалена! ID: ${id}`, 'success');
    serviceDeleteModal.close();
    // Логикаи навсозии State: setServices(...)
  };

  return {
    services,
    isLoading,
    error,
    serviceModals: {
      form: serviceFormModal,
      delete: serviceDeleteModal,
    },
    serviceHandlers: {
      handleSubmit,
      handleConfirmDelete,
    },
  };
}