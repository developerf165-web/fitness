// src/pages/Personal/features/staff/hooks/useStaffUpdate.js

import { useState } from 'react';
import { updateStaff } from '../api';

/**
 * Hook барои таҳрири staff
 * 
 * @returns {Object} { updateStaffData, isUpdating, error, success }
 */
export const useStaffUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateStaffData = async (id, staffData) => {
    setIsUpdating(true);
    setError(null);
    setSuccess(false);

    try {
      const updatedStaff = await updateStaff(id, staffData);
      setSuccess(true);
      return updatedStaff;
    } catch (err) {
      setError(err.message || 'Хатогӣ ҳангоми таҳрир');
      console.error('Error in useStaffUpdate:', err);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    updateStaffData,
    isUpdating,
    error,
    success,
    resetState
  };
};
