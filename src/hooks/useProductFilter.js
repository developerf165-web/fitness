// src/hooks/useProductFilter.js

import { useState, useMemo } from 'react';

/**
 * Custom Hook барои филтр кардани маҳсулот/услуги/курсҳо
 * 
 * @param {Array} items - Рӯйхати маҳсулот/услуги/курсҳо
 * @param {Array} filters - Рӯйхати филтрҳо (категорияҳо)
 * @param {string} categoryKey - Калиди категория дар объект (пешфарз: 'category')
 * @param {string} nameKey - Калиди ном дар объект (пешфарз: 'name')
 * @returns {object} - Объект бо ҳолатҳо ва функсияҳо
 */
const useProductFilter = ({ 
  items = [], 
  filters = ['Все'], 
  categoryKey = 'category',
  nameKey = 'name'
} = {}) => {
  
  // Ҳолатҳо
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все');

  // Филтр кардани маҳсулот бо useMemo (барои беҳтар кардани performance)
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Филтр аз рӯи категория
        if (activeFilter === 'Все') return true;
        return item[categoryKey] === activeFilter;
      })
      .filter((item) => {
        // Филтр аз рӯи ҷустуҷӯ (search)
        if (searchQuery === '') return true;
        const itemName = item[nameKey] || '';
        return itemName.toLowerCase().includes(searchQuery.toLowerCase());
      });
  }, [items, searchQuery, activeFilter, categoryKey, nameKey]);

  // Функсия барои тағйир додани филтри фаъол
  const setFilter = (filter) => {
    setActiveFilter(filter);
  };

  // Функсия барои тағйир додани query-и ҷустуҷӯ
  const setSearch = (query) => {
    setSearchQuery(query);
  };

  // Функсия барои reset кардани ҳамаи филтрҳо
  const resetFilters = () => {
    setActiveFilter('Все');
    setSearchQuery('');
  };

  // Баргардонидани ҳамаи чизҳои зарурӣ
  return {
    // Ҳолатҳо
    searchQuery,
    activeFilter,
    filteredItems,
    
    // Функсияҳо
    setSearch,
    setFilter,
    resetFilters,
    
    // Маълумоти иловагӣ
    totalItems: items.length,
    filteredCount: filteredItems.length,
    hasResults: filteredItems.length > 0,
  };
};

export default useProductFilter;
