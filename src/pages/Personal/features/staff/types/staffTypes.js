// src/pages/Personal/features/staff/types/staffTypes.js

/**
 * Types ва Constants барои Staff API
 */

// API Endpoints
export const API_ENDPOINTS = {
  BASE: '/api/staff',
  BY_ID: (id) => `/api/staff/${id}`,
  BY_STATUS: (status) => `/api/staff?status=${status}`,
  BY_POSITION: (position) => `/api/staff?position=${position}`,
  SEARCH: (query) => `/api/staff?search=${query}`
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

// Response Status
export const RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error'
};

// Майдонҳои зарурӣ барои сохтани staff
export const REQUIRED_FIELDS = [
  'fullName',
  'position',
  'phone',
  'email',
  'hireDate'
];

// Майдонҳои ихтиёрӣ
export const OPTIONAL_FIELDS = [
  'avatar',
  'salary',
  'status'
];
