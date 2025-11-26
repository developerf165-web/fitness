import { useState, useEffect, useCallback } from 'react';

/**
 * Hook барои идоракунии ҳолати modal ва ба таври худкор
 * илова кардани event listener барои тугмаи 'Escape'.
 */
export function useModalWithEscape(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  // Мо useCallback-ро истифода мебарем, то ки функсияҳо
  // дар ҳар рендер аз нав сохта нашаванд.
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    // Агар modal кушода набошад, listener лозим нест.
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEsc);
    
    // Cleanup function
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeModal]); // Вобастагӣ аз isOpen ва closeModal

  return { isOpen, openModal, closeModal, toggleModal };
}