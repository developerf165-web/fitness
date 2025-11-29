// src/pages/Personal/features/staff/hooks/useStaffFilters.js

import { useState, useCallback } from 'react';
import { getStaffByStatus, getStaffByPosition, searchStaff } from '../api';

/**
 * Hook барои фильтр ва ҷустуҷӯи staff
 * 
 * @returns {Object} { filteredStaff, isFiltering, error, filterByStatus, filterByPosition, searchByQuery, clearFilters }
 */
export const useStaffFilters = () => {
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  // Фильтр аз рӯи статус
  const filterByStatus = useCallback(async (status) => {
    setIsFiltering(true);
    setError(null);

    try {
      const data = await getStaffByStatus(status);
      setFilteredStaff(data);
      setActiveFilter({ type: 'status', value: status });
    } catch (err) {
      setError(err.message || 'Хатогӣ ҳангоми фильтр');
      console.error('Error in filterByStatus:', err);
    } finally {
      setIsFiltering(false);
    }
  }, []);

  // Фильтр аз рӯи должность
  const filterByPosition = useCallback(async (position) => {
    setIsFiltering(true);
    setError(null);

    try {
      const data = await getStaffByPosition(position);
      setFilteredStaff(data);
      setActiveFilter({ type: 'position', value: position });
    } catch (err) {
      setError(err.message || 'Хатогӣ ҳангоми фильтр');
      console.error('Error in filterByPosition:', err);
    } finally {
      setIsFiltering(false);
    }
  }, []);

  // Search/Ҷустуҷӯ
  const searchByQuery = useCallback(async (query) => {
    if (!query || query.trim() === '') {
      clearFilters();
      return;
    }

    setIsFiltering(true);
    setError(null);

    try {
      const data = await searchStaff(query);
      setFilteredStaff(data);
      setActiveFilter({ type: 'search', value: query });
    } catch (err) {
      setError(err.message || 'Хатогӣ ҳангоми ҷустуҷӯ');
      console.error('Error in searchByQuery:', err);
    } finally {
      setIsFiltering(false);
    }
  }, []);

  // Тоза кардани фильтрҳо
  const clearFilters = useCallback(() => {
    setFilteredStaff([]);
    setActiveFilter(null);
    setError(null);
  }, []);

  return {
    filteredStaff,
    isFiltering,
    error,
    activeFilter,
    filterByStatus,
    filterByPosition,
    searchByQuery,
    clearFilters
  };
};
