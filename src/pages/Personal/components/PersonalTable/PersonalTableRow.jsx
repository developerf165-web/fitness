// src/pages/Personal/components/PersonalTable/PersonalTableRow.jsx

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { STAFF_STATUS_COLORS } from '../../constants';

/**
 * Сатри ҷадвали staff
 * 
 * @param {Object} staff - Маълумоти staff
 * @param {Function} onEdit - Handler барои таҳрир
 * @param {Function} onDelete - Handler барои нест кардан
 */
export default function PersonalTableRow({ staff, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
      {/* Avatar ва Ном */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
            {staff.avatar ? (
              <img 
                src={staff.avatar} 
                alt={staff.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              staff.fullName.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="text-white font-medium">{staff.fullName}</div>
            <div className="text-gray-400 text-sm">{staff.email}</div>
          </div>
        </div>
      </td>

      {/* Должность */}
      <td className="px-6 py-4 text-gray-300">
        {staff.position}
      </td>

      {/* Статус */}
      <td className="px-6 py-4">
        <span 
          className={`px-3 py-1 rounded-full text-xs font-medium ${STAFF_STATUS_COLORS[staff.status]} text-white`}
        >
          {staff.status}
        </span>
      </td>

      {/* Телефон */}
      <td className="px-6 py-4 text-gray-300">
        {staff.phone}
      </td>

      {/* Зарплата */}
      <td className="px-6 py-4 text-gray-300">
        {staff.salary ? `${staff.salary} TJS` : '—'}
      </td>

      {/* Амалҳо */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(staff)}
              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
              title="Таҳрир"
            >
              <Edit size={18} />
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => onDelete(staff)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Нест кардан"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
