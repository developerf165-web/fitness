export const STATUS_COLORS = {
    'Занято': 'bg-red-600',
    'Свободно': 'color-bg-accent',
    'Не работает': 'bg-gray-500',
};

export const STATUSES = Object.keys(STATUS_COLORS);

export const ALL_LOCKERS = [
    { id: 1, status: 'Занято', name: 'Спорт' },
    { id: 2, status: 'Свободно', name: 'Тренажер' },
    { id: 3, status: 'Занято', name: 'Менеджер' },
    { id: 4, status: 'Не работает', name: 'Сантехника' },
    { id: 9, status: 'Не работает', name: 'Даромадгоҳ' },
    { id: 10, status: 'Занято', name: 'Техник' },
    { id: 7, status: 'Свободно', name: 'Истироҳат' },
    { id: 8, status: 'Занято', name: 'Тиббӣ' },
    { id: 11, status: 'Свободно', name: 'Умумӣ' },
    { id: 12, status: 'Занято', name: 'Админ' },
];

export const STATUS_ORDER = { 
    'Занято': 1, 
    'Свободно': 2, 
    'Не работает': 3 
};