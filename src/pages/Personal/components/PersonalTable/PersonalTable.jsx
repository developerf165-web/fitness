// src/pages/Personal/components/PersonalTable/PersonalTable.jsx

import React from 'react';
import PersonalTableRow from './PersonalTableRow';

/**
 * Table компонент барои намоиши рӯйхати staff
 * 
 * @param {Array} staff - Рӯйхати staff
 * @param {string} title - Сарлавҳаи ҷадвал
 * @param {Function} onEdit - Handler барои таҳрир
 * @param {Function} onDelete - Handler барои нест кардан
 * @param {boolean} isLoading - Ҳолати боргирӣ
 */
export default function PersonalTable({ 
  staff = [], 
  title,
  onEdit, 
  onDelete,
  isLoading = false 
}) {
  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-400 mt-4">Загрузка...</p>
      </div>
    );
  }

  if (staff.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-8 text-center">
        <p className="text-gray-400">Маълумот ёфт нашуд</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                ФИО
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Должность
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Телефон
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Зарплата
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item) => (
              <PersonalTableRow
                key={item.id}
                staff={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
