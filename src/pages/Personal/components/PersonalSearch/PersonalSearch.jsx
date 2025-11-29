// src/pages/Personal/components/PersonalSearch/PersonalSearch.jsx

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

/**
 * Search компонент барои саҳифаи Personal
 * 
 * @param {Function} onSearch - Handler барои ҷустуҷӯ
 * @param {string} placeholder - Placeholder матн
 */
export default function PersonalSearch({ 
  onSearch, 
  placeholder = 'Поиск по имени, должности, email или телефону...' 
}) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce: search баъд аз 300ms
    if (value.length >= 2 || value.length === 0) {
      setTimeout(() => {
        onSearch(value);
      }, 300);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
