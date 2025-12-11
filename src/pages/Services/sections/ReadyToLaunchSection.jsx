// src/pages/Services/sections/ReadyToLaunchSection.jsx

import React from 'react';
import SectionHeader from '/src/components/ui/SectionHeader';
import { CourseGrid } from '/src/components/Cards/Course';

/**
 * Қисми "Готово к запуску"
 * Курсҳое, ки омодаи оғоз ҳастанд
 */
export default function ReadyToLaunchSection({
  courses,
  isLoading,
  error,
  onStart,
  onCancel
}) {
  return (
    <div className="mb-10">
      <SectionHeader title="Готово к запуску" />
      {/* 
          Мо имкони филтр кардани курсҳоро дорем, агар лозим шавад:
          masalan: courses.filter(c => c.status === 'ready')
      */}
      <CourseGrid
        items={courses}
        variant="launch"
        isLoading={isLoading}
        error={error}
        onStart={onStart}
        onCancel={onCancel}
      />
    </div>
  );
}
