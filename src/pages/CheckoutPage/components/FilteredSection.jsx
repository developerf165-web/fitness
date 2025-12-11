import React from 'react';
import FilterChips from '../../../components/common/FilterChips';

/**
 * Компоненти FilteredSection - бахши филтр бо слайдер
 */
export default function FilteredSection({
    title,
    categories,
    activeFilter,
    onFilterChange,
    filteredItems,
    SliderComponent,
    onItemClick,
    isLoading,
    error
}) {
    return (
        <div className="mb-6">
            {/* Сарлавҳа */}
            <h3 className="text-lg font-semibold mb-2">{title}</h3>

            {/* Филтрҳо бо scroll */}
            <FilterChips
                filters={categories}
                activeFilter={activeFilter}
                onFilterChange={onFilterChange}
                showAddButton={false}
            />

            {/* Слайдер бо номи филтр */}
            <SliderComponent
                title={activeFilter}
                items={filteredItems}
                onItemClick={onItemClick}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}
