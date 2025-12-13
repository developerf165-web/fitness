import React, { useMemo } from 'react';
import MiniProductSlider from './MiniProductSlider';
import MiniGenericSlider from './MiniGenericSlider';
import useProductFilter from '../../../hooks/useProductFilter';
import FilteredSection from './FilteredSection';
import { PRODUCT_CATEGORIES, SERVICE_CATEGORIES } from '../constants/filterCategories';
import { useCategories } from '../../../features/products/hooks/useCategories';
import { useDirections } from '../../../pages/Services/hooks/useDirections';

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
    // 1. Get Categories
    const { categories: dynamicProductCategories, getCategoryNameById } = useCategories();
    const { directions } = useDirections();

    // 2. Map Products (ID -> Name) for filtering
    const mappedProducts = useMemo(() => {
        if (!products) return [];
        return products.map(p => ({
            ...p,
            category: getCategoryNameById(p.category) || "Unknown"
        }));
    }, [products, getCategoryNameById]);

    // Directions Categories for Courses
    const dynamicCourseCategories = useMemo(() => {
        if (!directions || directions.length === 0) return ["Все"];
        return ["Все", ...directions.map(d => d.title)];
    }, [directions]);

    // 3. Product Filter (using mapped products and dynamic categories)
    const {
        activeFilter: productFilterReal,
        filteredItems: filteredProductsReal,
        setFilter: setProductFilterReal
    } = useProductFilter({
        items: mappedProducts,
        filters: dynamicProductCategories && dynamicProductCategories.length > 0 ? dynamicProductCategories : ["Все"],
        categoryKey: 'category',
        nameKey: 'name'
    });

    // 4. Service Filter
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

    // 5. Course Filter
    const {
        activeFilter: courseFilter,
        filteredItems: filteredCourses,
        setFilter: setCourseFilter
    } = useProductFilter({
        items: courses || [],
        filters: dynamicCourseCategories,
        categoryKey: 'category',
        nameKey: 'title'
    });

    // Helper to transform course data
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
            {(products && products.length > 0 || isLoadingProducts || productsError) && (
                <FilteredSection
                    title="Продукты"
                    categories={dynamicProductCategories && dynamicProductCategories.length > 0 ? dynamicProductCategories : ["Все"]}
                    activeFilter={productFilterReal}
                    onFilterChange={setProductFilterReal}
                    filteredItems={filteredProductsReal}
                    SliderComponent={MiniProductSlider}
                    onItemClick={onProductClick}
                    isLoading={isLoadingProducts}
                    error={productsError}
                    chipClassName="color-bg-mini-card text-white"
                />
            )}

            {/* Услуги бо филтр */}
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
                    chipClassName="color-bg-mini-card text-white"
                />
            )}

            {/* Курсы бо филтр */}
            {(courses && courses.length > 0 || isLoadingCourses || coursesError) && (
                <FilteredSection
                    title="Курсы"
                    categories={dynamicCourseCategories}
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
                    chipClassName="color-bg-mini-card text-white"
                />
            )}
        </div>
    );
}
