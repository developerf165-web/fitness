// src/pages/Personal/components/PersonalHeader/PersonalHeader.jsx

import React from 'react';
import { Plus } from 'lucide-react';

/**
 * Header компонент барои саҳифаи Personal
 * 
 * @param {string} title - Сарлавҳа
 * @param {Function} onAdd - Handler барои тугмаи "Добавить"
 */
export default function PersonalHeader({ title = 'Персонал', onAdd }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-white">
        {title}
      </h1>
      
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Добавить</span>
        </button>
      )}
    </div>
  );
}
