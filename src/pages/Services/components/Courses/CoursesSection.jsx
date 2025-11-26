import React from 'react';
import CourseCard from './CourseCard';
import CardSkeleton from '../Cards/CardSkeleton';

export default function CoursesSection({ items, isLoading, onEdit, onDelete, variant = 'launch' }) {
  
  if (isLoading) {
    return (/* skeleton code */ <div className="text-white">Loading...</div>);
  }

  if (!items || items.length === 0) {
    return <div className="text-gray-500 py-6">Курсов пока нет</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <CourseCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          variant={variant} // <-- Ин муҳим аст!
        />
      ))}
    </div>
  );
}