// src/pages/Personal/utils/filterHelpers.js

/**
 * Helper функсияҳо барои фильтрҳо
 */

/**
 * Фильтр staff аз рӯи статус
 */
export const filterByStatus = (staff, status) => {
  if (!status) return staff;
  return staff.filter(s => s.status === status);
};

/**
 * Фильтр staff аз рӯи должность
 */
export const filterByPosition = (staff, position) => {
  if (!position) return staff;
  return staff.filter(s => s.position === position);
};

/**
 * Search staff
 */
export const searchStaff = (staff, query) => {
  if (!query) return staff;
  
  const lowerQuery = query.toLowerCase();
  return staff.filter(s => 
    s.fullName.toLowerCase().includes(lowerQuery) ||
    s.position.toLowerCase().includes(lowerQuery) ||
    s.email.toLowerCase().includes(lowerQuery) ||
    s.phone.includes(query)
  );
};

/**
 * Sort staff
 */
export const sortStaff = (staff, sortBy, order = 'asc') => {
  const sorted = [...staff].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
};
