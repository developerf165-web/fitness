// src/pages/Services/hooks/useCourseCardioModal.js

import { useState } from 'react';

/**
 * Hook барои CardioCourseModal (модали маълумоти курс)
 */
export function useCourseCardioModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const open = (item) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingItem(null);
  };

  return {
    isOpen,
    editingItem,
    open,
    close,
  };
}

export default useCourseCardioModal;
