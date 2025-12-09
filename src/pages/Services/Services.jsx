// src/pages/Services/Services.jsx

import React from 'react';
import useServicePageLogic from './hooks/useServicePageLogic';

// Sections
import {
  ReadyToLaunchSection,
  RecruitmentSection,
  ActiveCoursesSection,
  ServicesSection,
  DirectionsSectionWrapper
} from './sections';

// Modals
import {
  ServicesModals,
  CoursesModals,
  DirectionsModals
} from './modals';

// Data
import activeMockData from './data/activeMockData';

/**
 * Саҳифаи асосии Services
 * Дар бар мегирад: Курсҳо, Хидматҳо, Самтҳо
 */
const IS_LOGGING_ENABLED = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';

if (IS_LOGGING_ENABLED) {
  console.log('🚀 [SERVICES PAGE] Logging Enabled: TRUE');
  console.log('Environment:', import.meta.env);
}

export default function Services() {
  const {
    // Data
    isLoading,
    error,
    services,
    courses,
    directions,

    // State Hooks
    serviceModals,
    courseModals,
    directionModals,

    // Handlers
    serviceHandlers,
    courseHandlers,
    directionHandlers,
    handleLaunchClick,
    handleCancelClick,
    handleConfirmCancel,

    // Toast
    showToast, // Илова
  } = useServicePageLogic();

  // Хатогӣ
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Ошибка: {error}
      </div>
    );
  }

  return (
    <>
      {/* ҚИСМҲОИ САҲИФА */}

      {/* 1. Готово к запуску */}
      <ReadyToLaunchSection
        courses={courses}
        isLoading={false}
        onStart={handleLaunchClick}
        onCancel={handleCancelClick}
      />

      {/* 2. Набор на курсы */}
      <RecruitmentSection
        courses={courses}
        isLoading={false}
        onStart={handleLaunchClick}
        onCancel={handleCancelClick}
        onAddNew={courseModals.form.openCreate}
      />

      {/* 3. Актуальные */}
      <ActiveCoursesSection items={activeMockData} />

      {/* 4. Услуги */}
      <ServicesSection
        items={services}
        isLoading={isLoading}
        onEdit={serviceModals.form.openEdit}
        onDelete={serviceModals.delete.openDelete}
        onAddNew={serviceModals.form.openCreate}
      />

      {/* 5. Направления */}
      <DirectionsSectionWrapper
        items={directions}
        onEdit={directionModals.form.openEdit}
        onDelete={directionModals.delete.openDelete}
        onAddNew={directionModals.form.openCreate}
      />

      {/* МОДАЛҲО */}

      <ServicesModals
        modals={serviceModals}
        handlers={serviceHandlers}
        showToast={showToast}
      />

      <CoursesModals
        modals={courseModals}
        handlers={courseHandlers}
        onConfirmCancel={handleConfirmCancel}
      />

      <DirectionsModals
        modals={directionModals}
        handlers={directionHandlers}
      />
    </>
  );
}
