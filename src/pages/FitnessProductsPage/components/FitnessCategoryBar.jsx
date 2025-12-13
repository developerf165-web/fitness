import React from 'react';
import FilterChips from '../../../components/common/FilterChips';

/**
 * FitnessCategoryBar
 * Wraps the FilterChips component and displays the active filter title.
 */
const FitnessCategoryBar = ({
    categories,
    activeFilter,
    onFilterChange,
    onAddCategory,
    onEditCategory,
    onDeleteCategory
}) => {
    return (
        <>
            <FilterChips
                filters={categories}
                activeFilter={activeFilter}
                onFilterChange={onFilterChange}
                onAddCategoryClick={onAddCategory}
                showAddButton={true}
                onEdit={onEditCategory}
                onDelete={onDeleteCategory}
            />

            <h2 className="text-2xl font-bold my-4">{activeFilter}</h2>
        </>
    );
};

export default FitnessCategoryBar;
