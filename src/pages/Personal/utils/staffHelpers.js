// src/pages/Personal/utils/staffHelpers.js

/**
 * Helper функсияҳо барои staff
 */

/**
 * Форматкунии телефон
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  // +992 900 123 456 → +992 900 123 456
  return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
};

/**
 * Гирифтани initials аз ном
 */
export const getInitials = (fullName) => {
  if (!fullName) return '?';
  const parts = fullName.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return fullName[0].toUpperCase();
};

/**
 * Ҳисоби миқдори рӯзҳои кор
 */
export const getWorkDays = (hireDate) => {
  if (!hireDate) return 0;
  const start = new Date(hireDate);
  const today = new Date();
  const diffTime = Math.abs(today - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Тасдиқи email
 */
export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

/**
 * Тасдиқи телефон
 */
export const isValidPhone = (phone) => {
  return /^\+?[0-9\s-()]+$/.test(phone);
};
