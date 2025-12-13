import React from 'react';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import Pagination from '../../../pages/Dashboard/components/PaginationWithCount/Pagination';

/**
 * FitnessProductList
 * Displays the grid of products, skeletons for loading state, or error messages.
 * Also handles pagination.
 */
const FitnessProductList = ({
    isLoading,
    error,
    products,
    pagination,
    currentPage,
    onPageChange,
    onEditProduct,
    onDeleteProduct
}) => {

    // 1. Loading State or Error (Show Skeletons)
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    // 2. Error Message (if loaded but error exists)
    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                <p>Ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.</p>
                <p className="text-sm text-gray-400 mt-2">{error.message || ""}</p>
            </div>
        );
    }

    // 3. Empty State
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400">
                <p>Ничего не найдено</p>
            </div>
        );
    }

    // 4. Product Grid & Pagination
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={onEditProduct}
                        onDelete={onDeleteProduct}
                    />
                ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
                <div className="flex items-center justify-between mt-6 mb-10 bg-black rounded-lg">
                    <div className="text-gray-300 text-sm md:text-base">
                        Общее количество товаров:{" "}
                        <span className="color-accent font-bold text-lg">
                            {pagination.total}
                        </span>
                    </div>
                    <Pagination
                        totalPages={pagination.last_page}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </>
    );
};

export default FitnessProductList;
