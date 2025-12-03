import React from 'react';
import FilterChips from '../../../components/common/FilterChips';
import useProductFilter from '../../../hooks/useProductFilter';

/**
 * Компоненти FilterSection - бахши филтр бо слайдер
 * @param {string} title - Сарлавҳаи бахш
 * @param {Array} items - Рӯйхати элементҳо
 * @param {Array} categories - Категорияҳои филтр
 * @param {string} categoryKey - Калиди категория дар объект
 * @param {string} nameKey - Калиди ном дар объект
 * @param {Component} SliderComponent - Компоненти слайдер
 * @param {function} onItemClick - Функсия барои клик
 */
export default function FilterSection({
    title,
    items,
    categories,
    categoryKey,
    nameKey,
    SliderComponent,
    onItemClick
}) {
    // Филтр барои элементҳо
    const {
        activeFilter,
        filteredItems,
        setFilter
    } = useProductFilter({
        items: items || [],
        filters: categories,
        categoryKey,
        nameKey
    });

    // Агар элементҳо нест, ҳеҷ чиз нишон намедиҳем
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="mb-6">
            {/* Сарлавҳа */}
            <h3 className="text-lg font-semibold mb-2">{title}</h3>

            {/* Филтрҳо бо scroll */}
            <FilterChips
                filters={categories}
                activeFilter={activeFilter}
                onFilterChange={setFilter}
                showAddButton={false}
            />

            {/* Слайдер бо номи филтр */}
            <SliderComponent
                title={activeFilter}
                items={filteredItems}
                onItemClick={onItemClick}
            />
        </div>
    );
}
