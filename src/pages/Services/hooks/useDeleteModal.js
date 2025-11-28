import { useState } from 'react';

/**
 * Custom hook барои идораи модали несткунӣ
 */
export function useDeleteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDelete = (item) => {
    setItemToDelete(item);
    setIsOpen(true);
  };

  const close = () => {
    if (!isDeleting) {
      setIsOpen(false);
      setItemToDelete(null);
    }
  };

  return {
    isOpen,
    itemToDelete,
    isDeleting,
    setIsDeleting,
    openDelete,
    close
  };
}
