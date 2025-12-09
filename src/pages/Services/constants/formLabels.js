// src/pages/Services/constants/formLabels.js

/**
 * Labels ва placeholders барои form fields
 */
export const FORM_LABELS = {
    TITLE: 'Название',
    DESCRIPTION: 'Описание',
    PRICE: 'Цена за посещение',
    DISCOUNT: 'Скидка (%)',
    VISIT_COUNT: 'Количество посещений',
    IMAGE: 'Загрузить изображение',
    STATUS: 'Статус',
};

export const FORM_PLACEHOLDERS = {
    TITLE: 'Введите название услуги',
    DESCRIPTION: 'Введите описание услуги',
    PRICE: 'Введите цену за одно посещение',
    DISCOUNT: 'Введите процент скидки',
    VISIT_COUNT: 'Введите количество посещений',
    IMAGE_TITLE: 'Загрузить изображение',
    IMAGE_DESC: 'Выберите изображение услуги',
};

export const STATUS_OPTIONS = {
    ACTIVE: { value: '1', label: 'Активный' },
    INACTIVE: { value: '0', label: 'Неактивный' },
};
