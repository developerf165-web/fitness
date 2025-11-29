// src/pages/Personal/features/staff/hooks/useStaffList.js

import { useState, useEffect } from 'react';
import { getAllStaff } from '../api';

/**
 * Hook барои гирифтани рӯйхати ҳамаи staff
 * 
 * @returns {Object} { staff, isLoading, error, refetch }
 */
export const useStaffList = () => {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStaff = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getAllStaff();
      setStaff(data);
    } catch (err) {
      setError(err.message || 'Хатогӣ ҳангоми гирифтани маълумот');
      console.error('Error in useStaffList:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return {
    staff,
    isLoading,
    error,
    refetch: fetchStaff // Барои навсозии маълумот
  };
};
