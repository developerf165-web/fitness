// src/pages/Services/sections/DirectionsSection.jsx

import React from 'react';
import SectionHeader from '../../components/ui/SectionHeader';
import DirectionsSection from '../components/Directions/DirectionsSection';

/**
 * Қисми "Направления"
 * Рӯйхати самтҳо
 */
export default function DirectionsSectionWrapper({ 
  items,
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
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
