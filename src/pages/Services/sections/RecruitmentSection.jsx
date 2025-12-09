// src/pages/Services/sections/RecruitmentSection.jsx

import React from 'react';
import SectionHeader from '/src/components/ui/SectionHeader';
import CoursesSection from '../components/Courses/CoursesSection';

/**
 * Қисми "Набор на курсы"
 * Курсҳои ҷорӣ барои қабул
 */
export default function RecruitmentSection({ 
  courses, 
  isLoading,
  onStart, 
  onCancel,
  onAddNew 
}) {
  return (
    <div className="mb-10">
      <SectionHeader 
        title="Набор на курсы" 
        actionLabel="Добавить" 
        onAction={onAddNew}
      />
      <CoursesSection 
        items={courses.slice(0, 2)}
        variant="recruit"
        isLoading={isLoading}
        onStart={onStart} 
        onCancel={onCancel}
      />
    </div>
  );
}
