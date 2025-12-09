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

/**
 * Create a new coach
 * @param {Object} coachData - Coach data to create
 * @returns {Promise<Object>} Created coach object
 */
export const createTrainer = async (coachData) => {
    try {
        const response = await authApi.post('/coach/create', coachData);
        return response.data;
    } catch (error) {
        console.error('❌ Error creating coach:', error);
        throw error;
    }
};

/**
 * Update a coach
 * @param {number|string} id - Coach ID
 * @param {Object} coachData - Coach data to update
 * @returns {Promise<Object>} Updated coach object
 */
export const updateTrainer = async (id, coachData) => {
    try {
        const response = await authApi.put(`/coach/update/${id}`, coachData);
        return response.data;
    } catch (error) {
        console.error(`❌ Error updating coach ${id}:`, error);
        throw error;
    }
};

/**
 * Delete a coach
 * @param {number|string} id - Coach ID
 * @returns {Promise<Object>} Response data
 */
export const deleteTrainer = async (id) => {
    try {
        const response = await authApi.delete(`/coach/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error deleting coach ${id}:`, error);
        throw error;
    }
};
