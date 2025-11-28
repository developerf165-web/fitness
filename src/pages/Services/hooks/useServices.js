import { useState, useEffect } from 'react';
import { fetchServices } from '../api/servicesApi';

/**
 * Custom hook барои идораи Services
 */
export function useServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const dataFromApi = await fetchServices();
        
        const formattedData = dataFromApi.map(item => ({
          id: item.id,
          title: item.name,
          imageUrl: item.img, 
          tjs: item.price,
          pos: 'услуга',
          description: item.description || ''
        }));
        
        setServices(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, setServices, isLoading, error };
}
