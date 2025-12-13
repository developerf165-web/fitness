import { useState, useCallback, useEffect } from 'react';
import { productsService } from '../services/productsService';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initial load
    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { products: data, pagination: paging } = await productsService.getAll(currentPage);
            setProducts(data);
            setPagination(paging);
        } catch (err) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    // Fetch on mount or page change
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const addProduct = async (productData) => {
        setIsLoading(true);
        try {
            await productsService.create(productData);
            await fetchProducts(); // Will fetch current page
            return { success: true };
        } catch (err) {
            setError(err.message || 'Failed to add product');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const updateProduct = async (id, productData) => {
        setIsLoading(true);
        try {
            await productsService.update(id, productData);
            await fetchProducts();
            return { success: true };
        } catch (err) {
            setError(err.message || 'Failed to update product');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setIsLoading(true);
        try {
            await productsService.delete(id);
            // Check if we need to go back a page if this was the last item
            if (products.length === 1 && currentPage > 1) {
                setCurrentPage(prev => prev - 1);
            } else {
                await fetchProducts();
            }
            return { success: true };
        } catch (err) {
            setError(err.message || 'Failed to delete product');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products,
        pagination,
        currentPage,
        isLoading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        handlePageChange,
        refetch: fetchProducts
    };
};
