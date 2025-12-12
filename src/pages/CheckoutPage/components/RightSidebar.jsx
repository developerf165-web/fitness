import React from 'react';
import MiniProductSlider from './MiniProductSlider';
import MiniGenericSlider from './MiniGenericSlider';
import useProductFilter from '../../../hooks/useProductFilter';
import FilteredSection from './FilteredSection';
import { PRODUCT_CATEGORIES, SERVICE_CATEGORIES, COURSE_CATEGORIES } from '../constants/filterCategories';

/**
 * Компоненти RightSidebar - бахши рости CheckoutPage
 * Намоиши продуктҳо, услуги ва курсҳо бо филтрҳо
 */
export default function RightSidebar({
    products,
    isLoadingProducts,
    productsError,
    services,
    isLoadingServices,
    servicesError,
    courses,
    isLoadingCourses,
    coursesError,
    onProductClick
}) {
    // Филтр барои продуктҳо
    const {
        activeFilter: productFilter,
        filteredItems: filteredProducts,
        setFilter: setProductFilter
    } = useProductFilter({
        items: products || [], // Use real products
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

    // Helper to transform course data for display to match previous MiniCourseSlider logic
    const transformCourseItem = (course) => ({
        ...course,
        type: 'simple',
        hideUnit: true,
        price: course.oldPrice || course.price,
        tjs: course.oldPrice || course.price
    });

    return (
        <div className="color-bg-card rounded-2xl p-6 sticky top-4">
            {/* Продукты бо филтр */}
            {/* Show if loading, error, OR has products */}
            {(products && products.length > 0 || isLoadingProducts || productsError) && (
                <FilteredSection
                    title="Продукты"
                    categories={PRODUCT_CATEGORIES}
                    activeFilter={productFilter}
                    onFilterChange={setProductFilter}
                    filteredItems={filteredProducts}
                    SliderComponent={MiniProductSlider}
                    onItemClick={onProductClick}
                    isLoading={isLoadingProducts}
                    error={productsError}
                />
            )}

            {/* Услуги бо филтр */}
            {/* Show if loading, error, OR has services */}
            {(services && services.length > 0 || isLoadingServices || servicesError) && (
                <FilteredSection
                    title="Услуги"
                    categories={SERVICE_CATEGORIES}
                    activeFilter={serviceFilter}
                    onFilterChange={setServiceFilter}
                    filteredItems={filteredServices}
                    SliderComponent={MiniGenericSlider}
                    onItemClick={onProductClick}
                    isLoading={isLoadingServices}
                    error={servicesError}
                />
            )}

            {/* Курсы бо филтр */}
            {/* Show if loading, error or has courses */}
            {(courses && courses.length > 0 || isLoadingCourses || coursesError) && (
                <FilteredSection
                    title="Курсы"
                    categories={COURSE_CATEGORIES}
                    activeFilter={courseFilter}
                    onFilterChange={setCourseFilter}
                    filteredItems={filteredCourses}
                    SliderComponent={(props) => (
                        <MiniGenericSlider
                            {...props}
                            transformItem={transformCourseItem}
                        />
                    )}
                    onItemClick={onProductClick}
                    isLoading={isLoadingCourses}
                    error={coursesError}
                />
            )}
        </div>
    );
}
