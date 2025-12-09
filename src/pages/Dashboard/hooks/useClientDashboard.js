import { useState, useCallback } from 'react';
import { useToast } from "@/components/Toast/ToastContext";
import { useUsersData } from "/src/hooks/useUsersData"; // HOOK-И НАВ
import { useDebounce } from "/src/hooks/useDebounce";
import { useModalWithEscape } from "./useModalWithEscape";
import { useLocationStateToast } from "./useLocationStateToast";
import { useDelayedLoading } from "/src/hooks/useDelayedLoading";

export function useClientDashboard() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  // isBlocked = false (Истифодабарандагони фаъол)
  const {
    users,
    pagination,
    currentPage,
    loading,
    error,
    handlePageChange,
    refetchUsers
  } = useUsersData(debouncedQuery, false);

  const isListLoading = useDelayedLoading(loading);

  const {
    isOpen: isModalOpen,
    closeModal,
    toggleModal
  } = useModalWithEscape(false);

  const { showToast } = useToast();

  useLocationStateToast(showToast, refetchUsers);

  const handleSuccess = useCallback((toastMessage) => {
    closeModal();
    showToast(toastMessage.type, toastMessage.title, toastMessage.message);
    refetchUsers();
  }, [closeModal, showToast, refetchUsers]);

  return {
    query,
    setQuery,
    users,
    pagination,
    currentPage,
    loading: isListLoading,
    error,
    handlePageChange,
    isModalOpen,
    closeModal,
    toggleModal,
    handleSuccess
  };
}