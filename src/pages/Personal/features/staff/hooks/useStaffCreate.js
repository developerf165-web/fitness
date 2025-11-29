// src/pages/Personal/features/staff/hooks/useStaffCreate.js

import { useState } from 'react';
import { createStaff } from '../api';

/**
 * Hook барои сохтани staff нав
 * 
 * @returns {Object} { createNewStaff, isCreating, error, success }
 */
export const useStaffCreate = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createNewStaff = async (staffData) => {
    setIsCreating(true);
    setError(null);
    setSuccess(false);

    try {
      const newStaff = await createStaff(staffData);
      setSuccess(true);
      return newStaff;
    } catch (err) {
      setError(err.message || 'Хатогӣ ҳангоми сохтан');
      console.error('Error in useStaffCreate:', err);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    createNewStaff,
    isCreating,
    error,
    success,
    resetState
  };
};
