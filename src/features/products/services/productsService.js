import { authApi } from '../../../services/authAxios';

export const productsService = {
    // Get all products
    // Get all products with pagination
    getAll: async (page = 1) => {
        try {
            const response = await authApi.get(`/product/get/all?page=${page}`);
            const { data, ...pagination } = response.data;
            const apiData = data || [];

            const products = apiData.map(item => {
                const originalPrice = parseFloat(item.price) || 0;
                const discount = parseFloat(item.discount) || 0;

                let currentPrice = originalPrice;
                let oldPrice = null;

                if (discount > 0) {
                    currentPrice = originalPrice - (originalPrice * discount / 100);
                    oldPrice = originalPrice;
                }

                return {
                    id: item.id,
                    name: item.title,
                    category: item.category_id,
                    price: parseFloat(currentPrice.toFixed(2)),
                    oldPrice: oldPrice ? parseFloat(oldPrice.toFixed(2)) : null,
                    discount: discount,
                    imageUrl: item.img || 'https://via.placeholder.com/300x300.png?text=No+Image',
                    description: item.description
                };
            });

            return { products, pagination };
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },

    // Create a new product
    create: async (productData) => {
        try {
            const formData = new FormData();

            // Required fields
            formData.append('title', productData.name);
            formData.append('description', productData.description || 'Описание отсутствует');
            formData.append('price', productData.price);
            formData.append('discount', productData.discount || 0);
            formData.append('category_id', productData.category);

            // Defaults
            formData.append('barcode', productData.barcode || Date.now().toString());
            formData.append('status', 1);
            formData.append('result', 0);

            // Image handling
            if (productData.image instanceof File) {
                formData.append('img', productData.image);
            }

            const response = await authApi.post('/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Product created (API Response):", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    },

    // Update a product
    update: async (id, productData) => {
        try {
            const formData = new FormData();

            // Required fields
            formData.append('title', productData.name);
            formData.append('description', productData.description || 'Описание отсутствует');
            formData.append('price', productData.price);
            formData.append('discount', productData.discount || 0);
            formData.append('category_id', productData.category);

            // Defaults
            formData.append('barcode', productData.barcode || Date.now().toString());
            formData.append('status', 1);
            formData.append('result', 0);

            // Method spoofing for Laravel/PHP
            formData.append('_method', 'PATCH');

            // Image handling
            if (productData.image instanceof File) {
                formData.append('img', productData.image);
            }

            const response = await authApi.post(`/product/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Product updated (API Response):", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    },

    // Delete a product
    delete: async (id) => {
        try {
            await authApi.delete(`/product/delete/${id}`);
            return id;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
};
