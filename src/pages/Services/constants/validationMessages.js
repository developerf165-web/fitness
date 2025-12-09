// src/pages/Services/constants/validationMessages.js

/**
 * Ҳамаи матнҳои validation барои форма
 */
export const VALIDATION_MESSAGES = {
    // Title
    TITLE_REQUIRED: 'Пожалуйста, заполните название услуги',

    // Description
    DESCRIPTION_REQUIRED: 'Пожалуйста, заполните описание услуги',

    // Price
    PRICE_REQUIRED: 'Пожалуйста, укажите корректную цену',
    PRICE_INVALID: 'Цена должна быть больше 0',

    // Discount
    DISCOUNT_REQUIRED: 'Пожалуйста, укажите скидку',
    DISCOUNT_RANGE: 'Скидка должна быть от 0 до 100',

    // Visit Count
    VISIT_COUNT_REQUIRED: 'Пожалуйста, укажите количество посещений',
    VISIT_COUNT_INVALID: 'Количество посещений должно быть >= 0',

    // Image
    IMAGE_REQUIRED: 'Пожалуйста, выберите изображение услуги',
};
