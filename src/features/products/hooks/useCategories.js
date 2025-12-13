import { useState, useEffect, useCallback } from 'react';
import { categoriesService } from '../services/categoriesService';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [rawCategories, setRawCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await categoriesService.getAll();
            setRawCategories(data);
            // Data is [{id:1, name: "foo"}, ...]. Map to strings and add "Все" at the beginning
            const categoryNames = data.map(cat => cat.name);
            setCategories(["Все", ...categoryNames]);
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

    const getCategoryNameById = useCallback((id) => {
        if (!id) return '';
        const category = rawCategories.find(c => c.id === Number(id));
        return category ? category.name : String(id);
    }, [rawCategories]);

    const getCategoryIdByName = useCallback((name) => {
        if (!name) return null;
        const category = rawCategories.find(c => c.name === name);
        return category ? category.id : null;
    }, [rawCategories]);

    const addCategory = async (categoryName) => {
        try {
            const result = await categoriesService.create(categoryName);
            if (result.success) {
                // Optimistically add to UI
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
        rawCategories,
        isLoading,
        error,
        addCategory,
        getCategoryNameById
    };
};
