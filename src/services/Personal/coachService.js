// coachService.js
import { authApi } from '/src/services/authAxios';

/**
 * Get all coaches from API
 * @returns {Promise<Array>} Array of coach objects
 */
export const getAllCoaches = async () => {
    try {
        const response = await authApi.get('/coach/get/all');
        return response.data.data; // Return the data array
    } catch (error) {
        console.error('❌ Error fetching coaches:', error);
        throw error;
    }
};

/**
 * Get coach by ID
 * @param {number|string} id - Coach ID
 * @returns {Promise<Object>} Coach object
 */
export const getCoachById = async (id) => {
    try {
        const response = await authApi.get(`/coach/get/by-id/${id}`);
        return response.data.data; // Return the data object
    } catch (error) {
        console.error(`❌ Error fetching coach ${id}:`, error);
        throw error;
    }
};
