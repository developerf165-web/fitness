// fileName: CourseFormModal.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';

// Компонентҳои асосӣ
import Modal from '/src/components/ui/Modal';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';

// Компонентҳои дохилӣ
import { FormFooter } from './components';
import CourseFormLayout from './CourseFormLayout';

// Маълумот (Options)
import {
  courseOptions,
  goalOptions,
  clientOptions,
  defaultTrainerOptions,
  freeTrainerOptions
} from './CourseFormData';

// Ёрии умумӣ
const getClientDisplayValue = (clients) => {
  if (clients.length === 0) return '';
  if (clients.length <= 2) return clients.join(', ');
  return `${clients[0]}, ${clients[1]} и еще ${clients.length - 2}`;
};

export default function CourseFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false
}) {
  // --- State ---
  const [formData, setFormData] = useState({
    course: '',
    goal: 'Похудение',
    clients: [],
    scheduleType: 'MWF',
    selectedFullDate: new Date(new Date().getFullYear(), new Date().getMonth(), 7),
    selectedTime: null,
    trainer: '',
  });

  const [activeField, setActiveField] = useState(null);
  const [currentTrainerOptions, setCurrentTrainerOptions] = useState([]);

  // Ref ва State барои ҷойгиркунии SelectWithOptions
  const timeSelectorRef = useRef(null);
  const [trainerDropdownStyle, setTrainerDropdownStyle] = useState({});

  // --- Effects ---
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
    // Пешфарз: ҳамаи тренерҳо
    setCurrentTrainerOptions(defaultTrainerOptions);
  }, [initialData, isOpen]);

  // --- Handlers ---
  const handleClientToggle = (client) => {
    setFormData(prev => {
      const exists = prev.clients.includes(client);
      return {
        ...prev,
        clients: exists ? prev.clients.filter(c => c !== client) : [...prev.clients, client]
      };
    });
  };

  const closeActiveDropdown = () => {
    setActiveField(null);
  }

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setActiveField(null); // Пӯшидани ҳама чиз пас аз интихоб

    // Агар Тренер интихоб шуда бошад, рӯйхатро ба ҳолати аслӣ (default) бармегардонем
    if (field === 'trainer') {
      setCurrentTrainerOptions(defaultTrainerOptions);
    }
  };

  // --- LOGIC: Кушодани "Свободные тренеры" ---
  const handleFreeTrainersClick = () => {
    // 1. Маълумоти "Свободные тренеры"-ро бор мекунем
    setCurrentTrainerOptions(freeTrainerOptions);

    // 2. Фаъол мекунем
    setActiveField('trainer');

    // 3. Ҳисоб кардани мавқеъ (Position)
    if (timeSelectorRef.current) {
      setTrainerDropdownStyle({
        top: timeSelectorRef.current.offsetTop + timeSelectorRef.current.offsetHeight + 10, // 10px поёнтар аз TimeSelector
        width: timeSelectorRef.current.offsetWidth, // Паҳнӣ баробари TimeSelector
        left: 0 // Аз тарафи чап баробар
      });
    }

    // 4. Тренери пешинаро тоза мекунем (то ки интихоби нав кунад)
    setFormData(prev => ({ ...prev, trainer: '' }));
  };

  // --- Валидатсияи форма ---
  // Санҷиши пуркунии ҳамаи майдонҳои зарурӣ
  const isFormValid = useMemo(() => {
    return (
      formData.course.trim() !== '' &&
      formData.goal.trim() !== '' &&
      formData.clients.length > 0 &&
      formData.selectedTime !== null &&
      formData.trainer.trim() !== ''
    );
  }, [formData.course, formData.goal, formData.clients, formData.selectedTime, formData.trainer]);

  // --- Content Render ---
  const formContent = (
    <CourseFormLayout
      formData={formData}
      activeField={activeField}
      timeSelectorRef={timeSelectorRef}
      trainerDropdownStyle={trainerDropdownStyle}
      currentTrainerOptions={currentTrainerOptions}
      courseOptions={courseOptions}
      goalOptions={goalOptions}
      clientOptions={clientOptions}
      handleClientToggle={handleClientToggle}
      closeActiveDropdown={closeActiveDropdown}
      handleSelectChange={handleSelectChange}
      handleFreeTrainersClick={handleFreeTrainersClick}
      setActiveField={setActiveField}
      getClientDisplayValue={getClientDisplayValue}
      setFormData={setFormData}
    />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ScrollableModalContentWrapper
        className="max-h-[85vh]" // Баландии модалро каме зиёд кардам
        title="НАБОР НА КУРСЫ"
        content={formContent}
        footer={
          <FormFooter
            onClose={onClose}
            onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}
            isSubmitting={isSubmitting}
            isFormValid={isFormValid}
          />
        }
      />
    </Modal>
  );
}