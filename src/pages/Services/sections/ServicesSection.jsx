// src/pages/Services/sections/ServicesSection.jsx

import React from 'react';
import SectionHeader from '../../components/ui/SectionHeader';
import CardsSection from '../components/Cards/CardsSection';

/**
 * Қисми "Услуги"
 * Рӯйхати хидматҳо
 */
export default function ServicesSection({ 
  items,
  isLoading,
  onEdit, 
  onDelete,
  onAddNew 
}) {
  return (
    <>
      <SectionHeader 
        title="Услуги" 
        actionLabel="Создать" 
        onAction={onAddNew} 
      />
      <CardsSection 
        items={items}
        onEdit={onEdit}
        onDelete={onDelete}
        isLoading={isLoading}
      />
    </>
  );
}
