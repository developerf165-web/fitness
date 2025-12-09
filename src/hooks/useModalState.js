import { useState } from 'react';

/**
 * Custom hook барои идораи ҳолати модал
 */
export function useModalState() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreate = () => {
    setEditingItem(null);
    setIsOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const close = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      setEditingItem(null);
    }
  };

  return {
    isOpen,
    editingItem,
    isSubmitting,
    setIsSubmitting,
    openCreate,
    openEdit,
    close
  };
}
