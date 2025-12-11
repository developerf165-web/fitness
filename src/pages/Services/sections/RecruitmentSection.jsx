import React from 'react';
import SectionHeader from '/src/components/ui/SectionHeader';
import { CourseGrid } from '/src/components/Cards/Course';

/**
 * Қисми "Набор на курсы"
 * Курсҳои ҷорӣ барои қабул
 */
export default function RecruitmentSection({
  courses,
  isLoading,
  error,
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
      <CourseGrid
        items={courses.slice(0, 2)}
        variant="recruit"
        isLoading={isLoading}
        error={error}
        onStart={onStart}
        onCancel={onCancel}
      />
    </div>
  );
}
