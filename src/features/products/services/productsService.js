import { authApi } from '../../../services/authAxios';

export const productsService = {
    // Get all products
    getAll: async () => {
        try {
            const response = await authApi.get('/product/get/all');

            const apiData = response.data.data || [];

            return apiData.map(item => {
                const originalPrice = parseFloat(item.price) || 0;
                const discount = parseFloat(item.discount) || 0;

                let currentPrice = originalPrice;
                let oldPrice = null;

                // If there is a discount, calculate the new price (selling price)
                // and set the original price as 'oldPrice' for display.
                if (discount > 0) {
                    currentPrice = originalPrice - (originalPrice * discount / 100);
                    oldPrice = originalPrice;
                }

                return {
                    id: item.id,
                    name: item.title,
                    category: item.category_id ? `Категория ${item.category_id}` : "Общее",
                    price: parseFloat(currentPrice.toFixed(2)),
                    oldPrice: oldPrice ? parseFloat(oldPrice.toFixed(2)) : null,
                    discount: discount,
                    imageUrl: item.img || 'https://via.placeholder.com/300x300.png?text=No+Image',
                    description: item.description
                };
            });
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
            formData.append('category_id', 1); // Mock category ID

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

            return {
                id: response.data.id || Date.now(), // Use real ID if returned, else mock
                ...productData,
                imageUrl: productData.image instanceof File
                    ? URL.createObjectURL(productData.image)
                    : 'https://via.placeholder.com/300x300.png?text=New+Item'
            };
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
            formData.append('category_id', 1); // Mock category ID for now

            // Defaults
            formData.append('barcode', productData.barcode || Date.now().toString());
            formData.append('status', 1);
            formData.append('result', 0);

            // Method spoofing for Laravel/PHP
            formData.append('_method', 'PUT');

            // Image handling
            if (productData.image instanceof File) {
                formData.append('img', productData.image);
            }

            const response = await authApi.post(`/product/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return {
                id,
                ...productData,
                imageUrl: productData.image instanceof File
                    ? URL.createObjectURL(productData.image)
                    : productData.imageUrl
            };
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
