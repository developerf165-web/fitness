// src/pages/Personal/features/staff/api/staffApi.js

import { mockStaffData, getStaffById as mockGetById, getStaffByStatus as mockGetByStatus, getStaffByPosition as mockGetByPosition } from '../../../mocks';
import { STAFF_STATUS } from '../../../constants';

/**
 * Staff API
 * 
 * ҲОЗИР: Mock data истифода мебарад
 * ОЯНДА: Backend пайваст - танҳо ин файлро тағйир диҳед
 * 
 * Backend Requirements:
 * - GET    /api/staff              → Ҳамаи staff
 * - GET    /api/staff/:id          → Staff аз рӯи ID
 * - POST   /api/staff              → Сохтани нав
 * - PUT    /api/staff/:id          → Таҳрир
 * - DELETE /api/staff/:id          → Нест кардан
 * - GET    /api/staff?status=...   → Фильтр аз рӯи статус
 * - GET    /api/staff?position=... → Фильтр аз рӯи должность
 */

// Константа барои simulate кардани API delay
const API_DELAY = 500; // 500ms

// Helper барои simulate кардани async API call
const simulateApiCall = (data, delay = API_DELAY) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

/**
 * GET - Гирифтани ҳамаи staff
 * Backend: GET /api/staff
 */
export const getAllStaff = async () => {
  try {
    // TODO: Backend пайваст
    // const response = await fetch('/api/staff');
    // if (!response.ok) throw new Error('Failed to fetch staff');
    // return await response.json();
    
    // ҲОЗИР: Mock data
    return await simulateApiCall(mockStaffData);
  } catch (error) {
    console.error('Error fetching all staff:', error);
    throw error;
  }
};

/**
 * GET - Гирифтани staff аз рӯи ID
 * Backend: GET /api/staff/:id
 */
export const getStaffById = async (id) => {
  try {
    // TODO: Backend пайваст
    // const response = await fetch(`/api/staff/${id}`);
    // if (!response.ok) throw new Error('Staff not found');
    // return await response.json();
    
    // ҲОЗИР: Mock data
    const staff = mockGetById(id);
    if (!staff) throw new Error('Staff not found');
    return await simulateApiCall(staff);
  } catch (error) {
    console.error(`Error fetching staff with id ${id}:`, error);
    throw error;
  }
};

/**
 * POST - Сохтани staff нав
 * Backend: POST /api/staff
 */
export const createStaff = async (staffData) => {
  try {
    // TODO: Backend пайваст
    // const response = await fetch('/api/staff', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(staffData)
    // });
    // if (!response.ok) throw new Error('Failed to create staff');
    // return await response.json();
    
    // ҲОЗИР: Mock data
    const newStaff = {
      id: Date.now(),
      ...staffData,
      type: 'staff',
      status: staffData.status || STAFF_STATUS.ON_WORK
    };
    mockStaffData.push(newStaff);
    return await simulateApiCall(newStaff);
  } catch (error) {
    console.error('Error creating staff:', error);
    throw error;
  }
};

/**
 * PUT - Таҳрири staff
 * Backend: PUT /api/staff/:id
 */
export const updateStaff = async (id, staffData) => {
  try {
    // TODO: Backend пайваст
    // const response = await fetch(`/api/staff/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(staffData)
    // });
    // if (!response.ok) throw new Error('Failed to update staff');
    // return await response.json();
    
    // ҲОЗИР: Mock data
    const index = mockStaffData.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Staff not found');
    
    const updatedStaff = { ...mockStaffData[index], ...staffData };
    mockStaffData[index] = updatedStaff;
    return await simulateApiCall(updatedStaff);
  } catch (error) {
    console.error(`Error updating staff with id ${id}:`, error);
    throw error;
  }
};

/**
 * DELETE - Нест кардани staff
 * Backend: DELETE /api/staff/:id
 */
export const deleteStaff = async (id) => {
  try {
    // TODO: Backend пайваст
    // const response = await fetch(`/api/staff/${id}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) throw new Error('Failed to delete staff');
    // return await response.json();
    
    // ҲОЗИР: Mock data
    const index = mockStaffData.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Staff not found');
    
    mockStaffData.splice(index, 1);
    return await simulateApiCall({ success: true, id });
  } catch (error) {
    console.error(`Error deleting staff with id ${id}:`, error);
    throw error;
  }
};

/**
 * GET - Фильтр аз рӯи статус
 * Backend: GET /api/staff?status=...
 */
export const getStaffByStatus = async (status) => {
  try {
    // TODO: Backend пайваст
    // const response = await fetch(`/api/staff?status=${status}`);
    // if (!response.ok) throw new Error('Failed to fetch staff by status');
    // return await response.json();
    
    // ҲОЗИР: Mock data
    const filteredStaff = mockGetByStatus(status);
    return await simulateApiCall(filteredStaff);
  } catch (error) {
    console.error(`Error fetching staff with status ${status}:`, error);
    throw error;
  }
};

/**
 * GET - Фильтр аз рӯи должность
 * Backend: GET /api/staff?position=...
 */
export const getStaffByPosition = async (position) => {
  try {
    // TODO: Backend пайваст
    // const response = await fetch(`/api/staff?position=${position}`);
    // if (!response.ok) throw new Error('Failed to fetch staff by position');
    // return await response.json();
    
    // ҲОЗИР: Mock data
    const filteredStaff = mockGetByPosition(position);
    return await simulateApiCall(filteredStaff);
  } catch (error) {
    console.error(`Error fetching staff with position ${position}:`, error);
    throw error;
  }
};

/**
 * GET - Search staff
 * Backend: GET /api/staff?search=...
 */
export const searchStaff = async (query) => {
  try {
    // TODO: Backend пайваст
    // const response = await fetch(`/api/staff?search=${query}`);
    // if (!response.ok) throw new Error('Failed to search staff');
    // return await response.json();
    
    // ҲОЗИР: Mock data
    const lowerQuery = query.toLowerCase();
    const results = mockStaffData.filter(staff => 
      staff.fullName.toLowerCase().includes(lowerQuery) ||
      staff.position.toLowerCase().includes(lowerQuery) ||
      staff.email.toLowerCase().includes(lowerQuery) ||
      staff.phone.includes(query)
    );
    return await simulateApiCall(results);
  } catch (error) {
    console.error(`Error searching staff with query "${query}":`, error);
    throw error;
  }
};
