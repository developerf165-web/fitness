import { useState, useEffect, useCallback } from 'react';
import { categoriesService } from '../services/categoriesService';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await categoriesService.getAll();
            setCategories(data);
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const addCategory = async (categoryName) => {
        try {
            // Optimistic update could go here
            const result = await categoriesService.create(categoryName);
            if (result.success) {
                // Refresh or append
                setCategories(prev => [...prev, categoryName]);
                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (err) {
            console.error(err);
            return { success: false, error: err.message };
        }
    };

    return {
        categories,
        isLoading,
        error,
        addCategory
    };
};
