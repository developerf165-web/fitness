// src/pages/Services/sections/DirectionsSection.jsx

import React from 'react';
import SectionHeader from '/src/components/ui/SectionHeader';
import DirectionsSection from '../components/Directions/DirectionsSection';

/**
 * Қисми "Направления"
 * Рӯйхати самтҳо
 */
export default function DirectionsSectionWrapper({
  items,
  isLoading,
  error,
  onEdit,
  onDelete,
  onAddNew
}) {
  return (
    <div className="mt-8">
      <SectionHeader
        title="Направления"
        actionLabel="Создать"
        onAction={onAddNew}
      />
      <DirectionsSection
        items={items}
        isLoading={isLoading}
        error={error}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
