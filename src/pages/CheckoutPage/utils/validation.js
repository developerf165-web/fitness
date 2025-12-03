// Validation functions

export const validateFullName = (fullName) => {
    if (!fullName || fullName.trim().length === 0) {
        return 'Пожалуйста, введите ФИО';
    }
    if (fullName.trim().length < 3) {
        return 'ФИО должно содержать минимум 3 символа';
    }
    return '';
};

export const validatePhone = (phone) => {
    if (!phone || phone.trim().length === 0) {
        return 'Пожалуйста, введите номер телефона';
    }

    // Формат: +992 XX XXX XX XX
    const phoneRegex = /^\+992\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

    if (!phoneRegex.test(phone.trim())) {
        return 'Неверный формат. Используйте: +992 XX XXX XX XX';
    }

    return '';
};

export const validateForm = (formData) => {
    const errors = {
        fullName: validateFullName(formData.fullName),
        phone: validatePhone(formData.phone)
    };

    const isValid = !errors.fullName && !errors.phone;

    return { errors, isValid };
};
