// src/pages/Personal/features/staff/hooks/useStaffDelete.js

import { useState } from 'react';
import { deleteStaff } from '../api';

/**
 * Hook барои нест кардани staff
 * 
 * @returns {Object} { deleteStaffById, isDeleting, error, success }
 */
export const useStaffDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteStaffById = async (id) => {
    setIsDeleting(true);
    setError(null);
    setSuccess(false);

    try {
      await deleteStaff(id);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message || 'Хатогӣ ҳангоми нест кардан');
      console.error('Error in useStaffDelete:', err);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    deleteStaffById,
    isDeleting,
    error,
    success,
    resetState
  };
};
