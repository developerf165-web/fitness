// TrainerOptions.js

// 1. Рӯйхати асосии вариантҳо (ID ва Label)
export const RAW_FOCUS_OPTIONS = [
    { id: 'focus_cardio', label: 'Кардио нагрузки' },
    { id: 'focus_power', label: 'Силовые тренировки' },
    { id: 'focus_yoga', label: 'Йога' },
    { id: 'focus_dance', label: 'Танцы' },
    { id: 'focus_pilates', label: 'Пилатес' },
    { id: 'focus_stretching', label: 'Стретчинг' },
];

// 2. Массив барои SelectWithOptions (Формати Гурӯҳбандӣ)
// Ин функсия data-ро ба формати SelectWithOptions (массиви sections) табдил медиҳад.
export const FOCUS_OPTIONS_FOR_SELECT = [
    {
        title: 'Направления', // Сарлавҳаи гурӯҳ барои SelectWithOptions
        // SelectWithOptions танҳо string-ро интизор аст, бинобар ин, мо танҳо Label-ҳоро мегузаронем.
        items: RAW_FOCUS_OPTIONS.map(opt => opt.label) 
    }
];

// 3. Функсияи ёрирасон: Ёфтани ID аз Label
// SelectWithOptions Label-ро бармегардонад, мо ID-и онро меёбем.
export const getIdFromLabel = (label) => {
    return RAW_FOCUS_OPTIONS.find(opt => opt.label === label)?.id;
};

// 4. Функсияи ёрирасон: Ёфтани Label аз ID
// Барои нишон додани қимат дар DropdownField Label-ҳоро меёбем.
export const getLabelFromId = (id) => {
    return RAW_FOCUS_OPTIONS.find(opt => opt.id === id)?.label;
};

// 5. Функсияи ёрирасон: Сохтани Display Value
export const getDisplayValue = (selectedIds) => {
    if (!selectedIds || selectedIds.length === 0) return '';
    
    return selectedIds
        .map(id => getLabelFromId(id))
        .filter(Boolean)
        .join(', ');
};

// 6. Функсияи ёрирасон: Табдил додани ID-ҳои интихобшуда ба Label-ҳо
// Ин барои selectedValue дар DropdownField лозим аст, то checkmark-и SelectWithOptions дуруст кор кунад.
export const getSelectedLabelsFromIds = (selectedIds) => {
    return selectedIds
        .map(id => getLabelFromId(id))
        .filter(Boolean);
};