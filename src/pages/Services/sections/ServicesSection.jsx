import React from 'react';
import SectionHeader from '/src/components/ui/SectionHeader';
import { ServiceGrid } from '/src/components/Cards/Service';

/**
 * Қисми "Услуги"
 * Рӯйхати хидматҳо
 */
export default function ServicesSection({
  items,
  isLoading,
  error,
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
      <ServiceGrid
        items={items}
        onEdit={onEdit}
        onDelete={onDelete}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
