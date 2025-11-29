// src/pages/Personal/constants/staffStatus.js

/**
 * Статусҳои персонал
 */

export const STAFF_STATUS = {
  ON_WORK: 'На работе',
  ON_HOLIDAY: 'На карантине',
  ON_VACATION: 'В отпуске',
  FIRED: 'Уволен'
};

export const STAFF_STATUS_COLORS = {
  [STAFF_STATUS.ON_WORK]: 'bg-green-500',
  [STAFF_STATUS.ON_HOLIDAY]: 'bg-yellow-500',
  [STAFF_STATUS.ON_VACATION]: 'bg-blue-500',
  [STAFF_STATUS.FIRED]: 'bg-red-500'
};

export const STAFF_STATUS_LIST = [
  { value: STAFF_STATUS.ON_WORK, label: 'На работе' },
  { value: STAFF_STATUS.ON_HOLIDAY, label: 'На карантине' },
  { value: STAFF_STATUS.ON_VACATION, label: 'В отпуске' },
  { value: STAFF_STATUS.FIRED, label: 'Уволен' }
];
