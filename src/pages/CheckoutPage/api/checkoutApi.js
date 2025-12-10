
import { authApi } from "@services/authAxios";

/**
 * Search users by name.
 * @param {string} query - The name to search for.
 * @returns {Promise<Array>} - List of found users.
 */
export const searchUsers = async (query) => {
    try {
        const response = await authApi.get('/user/search', {
            params: { name: query }
        });
        // The API returns { data: [...], ... }
        return response.data.data || [];
    } catch (error) {
        console.error("Error searching users:", error);
        throw error;
    }
};

/**
 * Create a new transaction (payment).
 * @param {Object} data - The transaction payload.
 * @returns {Promise<Object>} - The API response.
 */
export const createTransaction = async (data) => {
    try {
        const response = await authApi.post('/transaction/cash', data);
        return response.data;
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
};
