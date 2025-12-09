// TrainerModal.jsx
import React, { useState, useMemo, useEffect } from 'react';
import ScrollableModalContentWrapper from "@/components/Shared/ScrollableModalContentWrapper";
import { useToast } from '../../Toast/ToastContext';
import { createTrainer, updateTrainer } from '@services/Personal/coachService';
import { getAllDirections, formatDirectionsForSelect } from '@services/Personal/directionService';
import TrainerForm from './TrainerForm';

const INITIAL_FORM_DATA = {
    name: '',
    lastName: '',
    phone: '',
    focus: [], // Массив барои ID-ҳо
    experience: '',
    photo: null,
    background: [],
    color: '#dc2626', // Default: red-600 in hex
};

const TrainerModal = ({ mode = 'add', initialData = null, isOpen, onClose, onAddTrainer }) => {
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    // State барои направленияҳои динамикӣ
    const [directions, setDirections] = useState([]);
    const [isLoadingDirections, setIsLoadingDirections] = useState(true);

    // Гирифтани направленияҳо аз сервер
    useEffect(() => {
        const fetchDirections = async () => {
            try {
                setIsLoadingDirections(true);
                const data = await getAllDirections();
                setDirections(data);
            } catch (error) {
                console.error('❌ Ошибка при загрузке направлений:', error);

                // Нишон додани паёми муфассал
                const errorMessage = error.message || 'Не удалось загрузить направления';
                showToast('error', 'Ошибка загрузки', errorMessage);

                // Агар токен набошад, корбарро ба логин равон кунем
                if (error.status === 401) {
                    setTimeout(() => {
                        // window.location.href = '/login'; // Фаъол кунед агар лозим бошад
                    }, 2000);
                }
            } finally {
                setIsLoadingDirections(false);
            }
        };

        if (isOpen) {
            fetchDirections();
        }

        // Пур кардани форма вақте ки модал кушода мешавад
        if (isOpen) {
            if (mode === 'edit' && initialData) {
                // Edit mode: пур кардани форма бо маълумоти мавҷуда
                setFormData({
                    name: initialData.name || '',
                    lastName: initialData.lastName || initialData.surname || '',
                    phone: initialData.phone || '',
                    focus: initialData.focus || initialData.direction_id || [],
                    experience: initialData.experience || initialData.work_experience || '',
                    photo: initialData.photo || initialData.avatar || null,
                    background: initialData.background || initialData.cover_img || [],
                    color: initialData.color || '#dc2626',
                });
            } else {
                // Add mode: тоза кардани форма
                setFormData(INITIAL_FORM_DATA);
            }
            setActiveField(null);
        }
    }, [isOpen, mode, initialData, showToast]);

    // Табдил додани направленияҳо ба формати SelectWithOptions
    const FOCUS_OPTIONS_FOR_SELECT = useMemo(() => {
        if (isLoadingDirections) {
            return [{ title: 'Направления', items: ['Загрузка...'] }];
        }

        const formattedDirections = formatDirectionsForSelect(directions);
        return [
            {
                title: 'Направления',
                items: formattedDirections.map(d => d.label)
            }
        ];
    }, [directions, isLoadingDirections]);

    // Функсияи ёрирасон: Ёфтани ID аз Label
    const getIdFromLabel = (label) => {
        const formatted = formatDirectionsForSelect(directions);
        return formatted.find(d => d.label === label)?.value;
    };

    // Функсияи ёрирасон: Ёфтани Label аз ID
    const getLabelFromId = (id) => {
        const formatted = formatDirectionsForSelect(directions);
        return formatted.find(d => d.value === id.toString())?.label;
    };

    // Функсияи ёрирасон: Сохтани Display Value
    const getDisplayValue = (selectedIds) => {
        if (!selectedIds || selectedIds.length === 0) return '';

        return selectedIds
            .map(id => getLabelFromId(id))
            .filter(Boolean)
            .join(', ');
    };

    // Функсияи ёрирасон: Табдил додани ID-ҳои интихобшуда ба Label-ҳо
    const getSelectedLabelsFromIds = (selectedIds) => {
        return selectedIds
            .map(id => getLabelFromId(id))
            .filter(Boolean);
    };

    // Функсияҳои идоракунӣ (Handlers)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (name, fileOrFiles) => {
        setFormData(prev => ({ ...prev, [name]: fileOrFiles }));
    };

    const handleColorChange = (color) => {
        setFormData(prev => ({ ...prev, color }));
    };

    const closeActiveDropdown = () => setActiveField(null);

    // 🚩 Логикаи ислоҳшудаи интихоб
    const handleFocusChange = (selectedLabel) => {
        // Табдил додани Label (аз SelectWithOptions) ба ID (барои state)
        const selectedId = getIdFromLabel(selectedLabel);
        if (!selectedId) return;

        setFormData(prev => {
            const currentFocus = prev.focus || [];
            if (currentFocus.includes(selectedId)) {
                return { ...prev, focus: currentFocus.filter(id => id !== selectedId) };
            }
            return { ...prev, focus: [...currentFocus, selectedId] };
        });
    };

    // Ҳисобкунаки қиматҳо
    const displayFocus = useMemo(() => {
        return getDisplayValue(formData.focus);
    }, [formData.focus, directions]); // eslint-disable-line react-hooks/exhaustive-deps

    const isFormValid =
        formData.name &&
        formData.lastName &&
        formData.phone &&
        formData.focus.length > 0 &&
        formData.photo &&
        formData.color;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            showToast('warning', 'Внимание', 'Заполните все обязательные поля (отмечены *).');
            return;
        }

        setIsLoading(true);
        try {
            let response;
            if (mode === 'edit' && initialData?.id) {
                response = await updateTrainer(initialData.id, formData);
            } else {
                response = await createTrainer(formData);
            }

            if (response.status === 200 || response.status === 201) {
                const successMessage = mode === 'edit'
                    ? 'Тренер успешно обновлен!'
                    : 'Тренер успешно добавлен в систему.';
                showToast('success', 'Успешно!', successMessage);
                if (onAddTrainer) onAddTrainer(response.data);
                onClose();
                setFormData(INITIAL_FORM_DATA);
                setActiveField(null);
            }
        } catch (error) {
            const errorAction = mode === 'edit' ? 'обновлении' : 'создании';
            console.error(`❌ Ошибка при ${errorAction} тренера:`, error);

            const apiError = error.response?.data;
            const status = error.response?.status;
            let toastMessage = "Ошибка сети. Проверьте подключение к интернету.";
            let toastTitle = "Ошибка!";

            // 1. Хатогии аутентификатсия (401)
            if (status === 401) {
                toastTitle = "Ошибка аутентификации";
                toastMessage = error.userMessage || "Токен недействителен или истек. Пожалуйста, войдите заново.";
            }
            // 2. Хатогии валидатсия (422)
            else if (status === 422) {
                toastTitle = "Ошибка валидации";
                const validationErrors = apiError?.errors;

                if (validationErrors) {
                    // Гирифтани аввалин хатогии валидатсия
                    const firstErrorKey = Object.keys(validationErrors)[0];
                    const firstError = validationErrors[firstErrorKey][0];

                    // Тарҷумаи номи майдон ба забони русӣ
                    const fieldTranslations = {
                        'name': 'Имя',
                        'surname': 'Фамилия',
                        'phone': 'Телефон',
                        'direction_id': 'Направление',
                        'work_experience': 'Опыт работы',
                        'avatar': 'Аватар',
                        'color': 'Цвет'
                    };

                    const fieldName = fieldTranslations[firstErrorKey] || firstErrorKey;
                    toastMessage = `${fieldName}: ${firstError}`;
                } else {
                    toastMessage = apiError?.message || "Проверьте введенные данные.";
                }
            }
            // 3. Хатогии сервер (500-599)
            else if (status >= 500) {
                toastTitle = `Ошибка сервера (${status})`;
                toastMessage = apiError?.message || "Внутренняя ошибка сервера. Попробуйте позже.";
            }
            // 4. Дигар хатогиҳо (403, 404, ва ғайра)
            else if (status) {
                toastTitle = `Ошибка ${status}`;
                toastMessage = apiError?.message || "Запрос не выполнен.";
            }
            // 5. Хатогии шабака (offline, timeout)
            else if (!error.response) {
                toastTitle = "Ошибка сети";
                toastMessage = "Не удалось подключиться к серверу. Проверьте интернет-соединение.";
            }

            showToast('error', toastTitle, toastMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    // Истифодаи TrainerForm
    const { formContent, formFooter } = TrainerForm({
        mode,
        formData,
        handleChange,
        handleFileChange,
        handleColorChange,
        activeField,
        setActiveField,
        closeActiveDropdown,
        displayFocus,
        FOCUS_OPTIONS_FOR_SELECT,
        isLoadingDirections,
        getSelectedLabels: getSelectedLabelsFromIds,
        handleFocusChange,
        isFormValid,
        isLoading,
        handleSubmit,
        onClose
    });


    const modalTitle = mode === 'edit' ? 'ИЗМЕНИТЬ ТРЕНЕРА' : 'ДОБАВИТЬ ТРЕНЕРА';

    return (
        <ScrollableModalContentWrapper
            title={modalTitle}
            content={formContent}
            footer={formFooter}
            onClose={onClose}
        />
    );
};

export default TrainerModal;