// src/pages/Personal/modals/AddStaffModal/AddStaffForm.jsx

import React from 'react';
import { POSITIONS_LIST, STAFF_STATUS_LIST } from '../../constants';

/**
 * Форма барои сохтани staff нав
 */
export default function AddStaffForm({ formData, errors, onChange }) {
  return (
    <div className="space-y-4">
      {/* ФИО */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          ФИО <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          className={`w-full px-4 py-2 bg-gray-800 text-white rounded-lg border ${
            errors.fullName ? 'border-red-500' : 'border-gray-700'
          } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          placeholder="Иванов Иван Иванович"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Должность */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Должность <span className="text-red-500">*</span>
        </label>
        <select
          name="position"
          value={formData.position}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {POSITIONS_LIST.map(pos => (
            <option key={pos.value} value={pos.value}>
              {pos.label}
            </option>
          ))}
        </select>
      </div>

      {/* Телефон */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Телефон <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          className={`w-full px-4 py-2 bg-gray-800 text-white rounded-lg border ${
            errors.phone ? 'border-red-500' : 'border-gray-700'
          } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          placeholder="+992 900 123 456"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className={`w-full px-4 py-2 bg-gray-800 text-white rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-700'
          } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Сана (Hire Date) */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Дата приема <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="hireDate"
          value={formData.hireDate}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Зарплата */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Зарплата (TJS)
        </label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="5000"
        />
      </div>

      {/* Статус */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Статус
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {STAFF_STATUS_LIST.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
