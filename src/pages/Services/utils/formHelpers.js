// src/pages/Services/utils/formHelpers.js

/**
 * Helper функсияҳо барои формаҳо
 */

/**
 * Validation барои номи хидмат
 */
export const validateServiceName = (name) => {
  if (!name || !name.trim()) {
    return { valid: false, message: 'Номи хидматро пур кунед' };
  }
  if (name.length < 3) {
    return { valid: false, message: 'Номи хидмат бояд камаш 3 аломат бошад' };
  }
  return { valid: true };
};

/**
 * Validation барои нарх
 */
export const validatePrice = (price) => {
  if (!price || price <= 0) {
    return { valid: false, message: 'Нархи дурустро ворид кунед' };
  }
  return { valid: true };
};

/**
 * Форматкунии нарх (1000 → 1,000)
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US').format(price);
};

/**
 * Тозакунии маълумоти форма
 */
export const sanitizeFormData = (data) => {
  const sanitized = {};
  for (const key in data) {
    if (typeof data[key] === 'string') {
      sanitized[key] = data[key].trim();
    } else {
      sanitized[key] = data[key];
    }
  }
  return sanitized;
};
