// AddTrainerModal.jsx
import React, { useState, useMemo } from 'react';
import ScrollableModalContentWrapper from "@/components/Shared/ScrollableModalContentWrapper"; 
import { useToast } from '../../Toast/ToastContext';
import { createTrainer } from '../../../../services/Personal/trainerService';
import TrainerForm from './TrainerForm'; // Компоненти нави форма
import { 
    FOCUS_OPTIONS_FOR_SELECT, 
    getIdFromLabel, 
    getDisplayValue, 
    getSelectedLabelsFromIds 
} from './TrainerOptions'; // Функсияҳо ва маълумоти нав

const INITIAL_FORM_DATA = {
    name: '',
    lastName: '',
    phone: '',
    focus: [], // Массив барои ID-ҳо
    experience: '', 
    photo: null, 
    background: [],
    color: 'bg-red-600',
};

const AddTrainerModal = ({ isOpen, onClose, onAddTrainer }) => {
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

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
    const displayFocus = useMemo(() => getDisplayValue(formData.focus), [formData.focus]);
    
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
            const response = await createTrainer(formData);
            if (response.status === 200 || response.status === 201) {
                showToast('success', 'Успешно!', 'Тренер успешно добавлен в систему.');
                if (onAddTrainer) onAddTrainer(response.data);
                onClose();
                setFormData(INITIAL_FORM_DATA); // Тоза кардани форма
                setActiveField(null);
            }
        } catch (error) {
             // ... Логикаи коркарди хатогӣ (Toast logic)
            const apiError = error.response?.data;
            let toastMessage = "Произошла сетевая ошибка. Проверьте подключение.";
            let toastTitle = "Ошибка!";

            if (error.response?.status === 422) {
                toastTitle = "Ошибка валидации";
                const validationErrors = apiError?.errors;
                if (validationErrors) {
                    const firstErrorKey = Object.keys(validationErrors)[0];
                    toastMessage = validationErrors[firstErrorKey][0];
                } else {
                    toastMessage = apiError?.message || "Проверьте введенные данные.";
                }
            } else if (error.response?.status) {
                 toastTitle = `Ошибка ${error.response.status}`;
                 toastMessage = apiError?.message || "Произошла ошибка сервера.";
            }
            showToast('error', toastTitle, toastMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    // Истифодаи TrainerForm
    const { formContent, formFooter } = TrainerForm({
        formData,
        handleChange,
        handleFileChange,
        handleColorChange,
        activeField,
        setActiveField,
        closeActiveDropdown,
        displayFocus,
        FOCUS_OPTIONS_FOR_SELECT, // Маълумоти форматшуда барои Dropdown
        getSelectedLabels: getSelectedLabelsFromIds, // Функсияи ёрирасон
        handleFocusChange, // Функсияи идоракунӣ
        isFormValid,
        isLoading,
        handleSubmit,
        onClose
    });


    return (
        <ScrollableModalContentWrapper
            title="ДОБАВИТЬ ТРЕНЕРА"
            content={formContent}
            footer={formFooter}
            onClose={onClose}
        />
    );
};

export default AddTrainerModal;