// src/pages/Services/utils/transformers.js

/**
 * Transformers барои табдил додани API response ба формати UI
 */

/**
 * Табдили Service response аз API ба формати UI
 */
export const transformServiceResponse = (apiService) => ({
    id: apiService.id,
    title: apiService.name,
    name: apiService.name, // Барои backwards compatibility
    imageUrl: apiService.img,
    tjs: apiService.price,
    price: apiService.price,
    pos: 'услуга',
    description: apiService.description || '',
    discount: apiService.discount || 0,
    discount: apiService.discount || 0,
    visit_count: apiService.price_visit || apiService.visit_count || 0,
    status: apiService.status !== undefined ? apiService.status : 1,
});

/**
 * Табдили массиви services
 */
export const transformServicesArray = (services = []) => {
    return services.map(transformServiceResponse);
};
