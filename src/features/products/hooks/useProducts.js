import { useState, useCallback, useEffect } from 'react';
import { productsService } from '../services/productsService';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initial load
    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await productsService.getAll();
            setProducts(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = async (productData) => {
        setIsLoading(true);
        try {
            const newProduct = await productsService.create(productData);
            setProducts(prev => [newProduct, ...prev]);
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
            const updatedProduct = await productsService.update(id, productData);
            setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
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
            setProducts(prev => prev.filter(p => p.id !== id));
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
        isLoading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        refetch: fetchProducts
    };
};
