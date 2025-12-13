import { authApi } from '../../../services/authAxios';

export const categoriesService = {
    // Get all categories form API
    getAll: async () => {
        try {
            const response = await authApi.get(`/category/get/all?t=${Date.now()}`);
            // API returns array of objects: [{id: 1, name: "протеин", ...}]
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },

    // Create a new category
    create: async (categoryName) => {
        try {
            const formData = new FormData();
            formData.append('name', categoryName);

            const response = await authApi.post('/category/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Category created response:", response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error creating category:", error);
            // Return error in a way the hook anticipates
            return { success: false, error: error.response?.data?.message || error.message };
        }
    },

    // Update a category
    update: async (id, categoryName) => {
        try {
            const formData = new FormData();
            formData.append('name', categoryName);
            formData.append('_method', 'PATCH');

            const response = await authApi.post(`/category/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Category updated response:", response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error updating category:", error);
            return { success: false, error: error.response?.data?.message || error.message };
        }
    },

    // Delete a category
    delete: async (id) => {
        try {
            const response = await authApi.delete(`/category/delete/${id}`);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error deleting category:", error);
            return { success: false, error: error.response?.data?.message || error.message };
        }
    },
};
