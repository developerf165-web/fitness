// src/pages/Services/modals/CoursesModals.jsx

import React from 'react';
import CourseCancelConfirmationModal from '@/components/ui/CourseCancelConfirmationModal';
import CardioCourseModal from './CardioCourseModal';
import { CourseFormModal } from '../forms';

/**
 * Ҳамаи модалҳо барои Courses
 */
export default function CoursesModals({ 
  modals, 
  handlers,
  onConfirmCancel 
}) {
  return (
    <>
      {/* Модали Cardio (маълумоти курс) */}
      <CardioCourseModal
        isOpen={modals.cardio.isOpen}
        onClose={modals.cardio.close}
        courseData={modals.cardio.editingItem}
      />
      
      {/* Модали тасдиқи бекоркунӣ */}
      <CourseCancelConfirmationModal
        isOpen={modals.cancel.isOpen} 
        onClose={modals.cancel.close}
        courseData={modals.cancel.itemToDelete} 
        onActionSuccess={onConfirmCancel}
      />
      
      {/* Модали таҳрир/сохтан */}
      <CourseFormModal
        isOpen={modals.form.isOpen}
        onClose={modals.form.close}
        onSubmit={handlers.handleSubmit}
        initialData={modals.form.editingItem}
        isSubmitting={modals.form.isSubmitting}
      />
    </>
  );
}
