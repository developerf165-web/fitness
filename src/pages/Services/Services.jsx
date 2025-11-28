// src/pages/Services/Services.jsx

import React from 'react';
import useServicePageLogic from './hooks/useServicePageLogic'; // Логикаи асосӣ

// Components (Воридоти худро нигоҳ доред)
import SectionHeader from '../components/ui/SectionHeader';
import CardsSection from './components/Cards/CardsSection';
import CoursesSection from './components/Courses/CoursesSection';
import ActiveSection from './components/Active/ActiveSection';
import DirectionsSection from './components/Directions/DirectionsSection';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import CourseCancelConfirmationModal from '@/components/ui/CourseCancelConfirmationModal';
import CardioCourseModal from './components/CardioCourseModal'; 
import ServiceFormModal from './components/ServiceFormModal';
import CourseFormModal from './components/CourseForm/CourseFormModal';
import DirectionFormModal from './components/DirectionFormModal';

// Data
import activeMockData from './data/activeMockData';

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
  } = useServicePageLogic();

  if (error) {
    return <div className="text-center py-10 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <>
      {/* --- Sections: Рендеринг (Коди асосан тағйирнаёфта) --- */}
      
      {/* Готово к запуску */}
      <div className="mb-10">
        <SectionHeader title="Готово к запуску" />
        <CoursesSection 
          items={courses}
          variant="launch"
          isLoading={false}
          onStart={handleLaunchClick} 
          onCancel={handleCancelClick} // Идоракунии 'Отменить'
        />
      </div>

      {/* Набор на курсы */}
      <div className="mb-10">
        <SectionHeader 
          title="Набор на курсы" 
          actionLabel="Добавить" 
          onAction={courseModals.form.openCreate}
        />
        <CoursesSection 
          items={courses.slice(0, 2)}
          variant="recruit"
          isLoading={false}
          onStart={handleLaunchClick} 
          onCancel={handleCancelClick}
        />
      </div>

      {/* Актуальные */}
      <SectionHeader title="Актуальные" customRightElement="8 курсов" />
      <ActiveSection items={activeMockData} />
      <div className="mb-12"></div>

      {/* Услуги */}
      <SectionHeader title="Услуги" actionLabel="Создать" onAction={serviceModals.form.openCreate} />
      <CardsSection 
        items={services}
        onEdit={serviceModals.form.openEdit}
        onDelete={serviceModals.delete.openDelete}
        isLoading={isLoading}
      />

      {/* Направления */}
      <div className="mt-8">
        <SectionHeader title="Направления" actionLabel="Создать" onAction={directionModals.form.openCreate} />
        <DirectionsSection 
          items={directions} 
          onEdit={directionModals.form.openEdit}
          onDelete={directionModals.delete.openDelete}
        />
      </div>

      {/* --- МОДАЛҲО --- */}

      {/* 1. Модалҳои Services */}
      <DeleteConfirmationModal
        isOpen={serviceModals.delete.isOpen}
        onClose={serviceModals.delete.close}
        onConfirm={serviceHandlers.handleConfirmDelete}
        isDeleting={serviceModals.delete.isDeleting}
        itemName={serviceModals.delete.itemToDelete?.title}
      />
      <ServiceFormModal
        isOpen={serviceModals.form.isOpen}
        onClose={serviceModals.form.close}
        onSubmit={serviceHandlers.handleSubmit}
        initialData={serviceModals.form.editingItem}
        isSubmitting={serviceModals.form.isSubmitting}
      />

      {/* 2. Модалҳои Courses */}
      <CardioCourseModal
        isOpen={courseModals.cardio.isOpen}
        onClose={courseModals.cardio.close}
        courseData={courseModals.cardio.editingItem}
      />
      <CourseCancelConfirmationModal
        isOpen={courseModals.cancel.isOpen} 
        onClose={courseModals.cancel.close}
        courseData={courseModals.cancel.itemToDelete} 
        onActionSuccess={handleConfirmCancel} // Логикаи бекоркунӣ
      />
      <CourseFormModal
        isOpen={courseModals.form.isOpen}
        onClose={courseModals.form.close}
        onSubmit={courseHandlers.handleSubmit}
        initialData={courseModals.form.editingItem}
        isSubmitting={courseModals.form.isSubmitting}
      />

      {/* 3. Модалҳои Directions */}
      <DeleteConfirmationModal
        isOpen={directionModals.delete.isOpen}
        onClose={directionModals.delete.close}
        onConfirm={directionHandlers.handleConfirmDelete}
        isDeleting={directionModals.delete.isDeleting}
        itemName={directionModals.delete.itemToDelete?.title}
      />
      <DirectionFormModal
        isOpen={directionModals.form.isOpen}
        onClose={directionModals.form.close}
        onSubmit={directionHandlers.handleSubmit}
        initialData={directionModals.form.editingItem}
        isSubmitting={directionModals.form.isSubmitting}
      />
    </>
  );
}