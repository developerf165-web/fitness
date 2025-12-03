import React from 'react';
import MiniProductSlider from './MiniProductSlider';
import MiniServiceSlider from './MiniServiceSlider';
import MiniCourseSlider from './MiniCourseSlider';
import FilterChips from '../../../components/common/FilterChips';
import useProductFilter from '../../../hooks/useProductFilter';
import { PRODUCT_CATEGORIES, SERVICE_CATEGORIES, COURSE_CATEGORIES } from '../constants/filterCategories';

/**
 * Компоненти RightSidebar - бахши рости CheckoutPage
 * Намоиши продуктҳо, услуги ва курсҳо бо филтрҳо
 */
export default function RightSidebar({
    products,
    services,
    courses,
    onProductClick
}) {
    // Филтр барои продуктҳо
    const {
        activeFilter: productFilter,
        filteredItems: filteredProducts,
        setFilter: setProductFilter
    } = useProductFilter({
        items: products,
        filters: PRODUCT_CATEGORIES,
        categoryKey: 'category',
        nameKey: 'name'
    });

    // Филтр барои услуги
    const {
        activeFilter: serviceFilter,
        filteredItems: filteredServices,
        setFilter: setServiceFilter
    } = useProductFilter({
        items: services || [],
        filters: SERVICE_CATEGORIES,
        categoryKey: 'category',
        nameKey: 'title'
    });

    // Филтр барои курсҳо
    const {
        activeFilter: courseFilter,
        filteredItems: filteredCourses,
        setFilter: setCourseFilter
    } = useProductFilter({
        items: courses || [],
        filters: COURSE_CATEGORIES,
        categoryKey: 'category',
        nameKey: 'title'
    });

    return (
        <div className="color-bg-card rounded-2xl p-6 sticky top-4">
            {/* Продукты бо филтр */}
            <FilteredSection
                title="Продукты"
                categories={PRODUCT_CATEGORIES}
                activeFilter={productFilter}
                onFilterChange={setProductFilter}
                filteredItems={filteredProducts}
                SliderComponent={MiniProductSlider}
                onItemClick={onProductClick}
            />

            {/* Услуги бо филтр */}
            {services && services.length > 0 && (
                <FilteredSection
                    title="Услуги"
                    categories={SERVICE_CATEGORIES}
                    activeFilter={serviceFilter}
                    onFilterChange={setServiceFilter}
                    filteredItems={filteredServices}
                    SliderComponent={MiniServiceSlider}
                    onItemClick={onProductClick}
                />
            )}

            {/* Курсы бо филтр */}
            {courses && courses.length > 0 && (
                <FilteredSection
                    title="Курсы"
                    categories={COURSE_CATEGORIES}
                    activeFilter={courseFilter}
                    onFilterChange={setCourseFilter}
                    filteredItems={filteredCourses}
                    SliderComponent={MiniCourseSlider}
                    onItemClick={onProductClick}
                />
            )}
        </div>
    );
}

/**
 * Компоненти FilteredSection - бахши филтр бо слайдер
 * Компоненти дохилӣ барои содда кардани код
 */
function FilteredSection({
    title,
    categories,
    activeFilter,
    onFilterChange,
    filteredItems,
    SliderComponent,
    onItemClick
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
            />
        </div>
    );
}
