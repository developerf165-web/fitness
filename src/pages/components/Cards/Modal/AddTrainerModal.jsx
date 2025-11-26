// AddTrainerModal.jsx
import React, { useState } from 'react';
import FileUploader from '../../ui/FileUploader';
import ColorPicker from './ColorPicker';
import CustomInput from '../../Shared/CustomInput';
import FormButton from "@/components/ui/FormButton";
import ScrollableModalContentWrapper from "@/components/Shared/ScrollableModalContentWrapper"; 

import { createTrainer } from '../../../../services/Personal/trainerService';
import { useToast } from '../../Toast/ToastContext';

const AddTrainerModal = ({ isOpen, onClose, onAddTrainer }) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    focus: '', 
    experience: '', 
    photo: null, 
    background: [],
    color: 'bg-red-600',
  });

  const isFormValid =
    formData.name &&
    formData.lastName &&
    formData.phone &&
    formData.focus &&
    // experience is not required in isFormValid since it defaults to 0 in service
    formData.photo && // photo (avatar) is required by API
    formData.color;

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name, fileOrFiles) => {
    setFormData(prev => ({ ...prev, [name]: fileOrFiles }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
        showToast('warning', 'Внимание', 'Заполните все обязательные поля (отмечены *).');
        return;
    }

    setIsLoading(true);

    try {
      // Отправка на сервер
      const response = await createTrainer(formData);
      
      // Проверка ответа (200 или 201)
      if (response.status === 200 || response.status === 201) {
        
        // Показ Toast-а успеха
        showToast('success', 'Успешно!', 'Тренер успешно добавлен в систему.');

        // Обновление списка в интерфейсе (если нужно)
        if (onAddTrainer) {
          onAddTrainer(response.data);
        }

        // Закрытие модала и очистка формы
        onClose();
        setFormData({
          name: '',
          lastName: '',
          phone: '',
          focus: '',
          experience: '',
          photo: null,
          background: [],
          color: 'bg-red-600',
        });
      }

    } catch (error) {
        // Логику в консоль убрали, показываем только Toast
        const apiError = error.response?.data;
        let toastMessage = "Произошла сетевая ошибка. Проверьте подключение.";
        let toastTitle = "Ошибка!";

        if (error.response?.status === 422) {
            // Ошибка валидации
            toastTitle = "Ошибка валидации";
            const validationErrors = apiError?.errors;
            
            if (validationErrors) {
                // Берем первое сообщение об ошибке для показа
                const firstErrorKey = Object.keys(validationErrors)[0];
                toastMessage = validationErrors[firstErrorKey][0];
            } else {
                toastMessage = apiError?.message || "Проверьте введенные данные.";
            }

        } else if (error.response?.status === 401) {
             // 401 ошибка должна обрабатываться в authAxios.js, но на всякий случай
             toastTitle = "Ошибка авторизации";
             toastMessage = "Ваша сессия истекла. Пожалуйста, войдите снова.";
        } else if (error.response?.status) {
             // Другие ошибки сервера (400, 500)
             toastTitle = `Ошибка ${error.response.status}`;
             toastMessage = apiError?.message || "Произошла ошибка сервера. Повторите попытку позже.";
        }
        
        showToast('error', toastTitle, toastMessage);

    } finally {
      setIsLoading(false);
    }
  };
  
  const modalContent = (
    <form id="add-trainer-form" className="space-y-4"> 
      <CustomInput
        label="Имя*" // required добавлено
        placeholder="Введите имя"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <CustomInput
        label="Фамилия*" // required добавлено
        placeholder="Введите фамилию"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <CustomInput
        label="Номер телефона*" // required добавлено
        placeholder="Введите номер телефона"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        type="tel"
        required
      />
      <CustomInput
        label="Направление*" // required добавлено
        placeholder="Укажите направление"
        name="focus"
        value={formData.focus}
        onChange={handleChange}
        required
      />
      <CustomInput
        label="Опыт работы (лет)" // НЕ required для FormValid
        placeholder="Укажите стаж (число)"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        type="number" 
      />

      <div className="flex flex-col sm:flex-row -mx-2 mt-6 gap-2">
        <FileUploader
          title="Фотография тренера*" // required добавлено
          description="Минимальный размер 500x500px."
          imageSrc={formData.photo}
          onUpload={(file) => handleFileChange('photo', file)}
          required
        />

        <FileUploader
          title="Фоновые фотографии"
          description="Можно загрузить несколько изображений"
          imageSrc={formData.background}
          onUpload={(files) => handleFileChange('background', files)}
          multiple
          // required: false по умолчанию
        />
      </div>

      <ColorPicker
        selectedColor={formData.color}
        onSelectColor={(color) => setFormData(prev => ({ ...prev, color }))}
      />
    </form>
  );

  const modalFooter = (
    <>
      <FormButton
        onClick={onClose}
        className="color-bg-mini-card bg-hover-card cursor-pointer"
        disabled={isLoading}
      >
        Отмена
      </FormButton>

      <FormButton
        onClick={handleSubmit} 
        disabled={!isFormValid || isLoading}
        className={
          isFormValid && !isLoading
            ? "color-bg-accent hover:bg-lime-200 cursor-pointer text-black font-semibold"
            : "color-bg-mini-card cursor-not-allowed opacity-70"
        }
      >
        {isLoading ? "Загрузка..." : "Добавить"}
      </FormButton>
    </>
  );

  return (
      <ScrollableModalContentWrapper
        title="ДОБАВИТЬ ТРЕНЕРА"
        content={modalContent}
        footer={modalFooter}
        onClose={onClose}
      />
  );
};

export default AddTrainerModal;