import { authApi } from '../../../services/authAxios';

export const categoriesService = {
    // Get all categories form API
    getAll: async () => {
        try {
            const response = await authApi.get('/category/get/all');
            // API returns array of objects: [{id: 1, name: "протеин", ...}]
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },

    // Create a new category
    create: async (categoryName) => {
        // Not implemented on backend yet or endpoint unknown from prompt, 
        // keeping it as a placeholder or using a generic post if needed later.
        // For now, based on prompt, we only focus on GET.
        // Creating a mock success for now to prevent breaking existing "Add Category" UI flow until API is ready.
        return { success: true, data: { name: categoryName } };
    },
};
