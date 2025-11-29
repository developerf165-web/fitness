// src/pages/Services/sections/ReadyToLaunchSection.jsx

import React from 'react';
import SectionHeader from '../../components/ui/SectionHeader';
import CoursesSection from '../components/Courses/CoursesSection';

/**
 * Қисми "Готово к запуску"
 * Курсҳое, ки омодаи оғоз ҳастанд
 */
export default function ReadyToLaunchSection({ 
  courses, 
  isLoading,
  onStart, 
  onCancel 
}) {
  return (
    <div className="mb-10">
      <SectionHeader title="Готово к запуску" />
      <CoursesSection 
        items={courses}
        variant="launch"
        isLoading={isLoading}
        onStart={onStart} 
        onCancel={onCancel}
      />
    </div>
  );
}
