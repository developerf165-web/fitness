import { useState, useEffect, useCallback } from 'react';
import { fetchServices } from '../api/servicesApi';

/**
 * Custom hook барои идораи Services
 */
export function useServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const dataFromApi = await fetchServices();

      const formattedData = dataFromApi.map(item => ({
        id: item.id,
        title: item.name,
        imageUrl: item.img,
        tjs: item.price,
        pos: 'услуга',
        description: item.description || '',
        // Add other fields if needed for full state
        discount: item.discount,
        visit_count: item.visit_count,
        status: item.status
      }));

      // Remove duplicates by ID (keeping the last one or first one? reduce keeps first usually with this logic)
      const uniqueData = formattedData.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setServices(uniqueData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return { services, setServices, isLoading, error, refetch: loadServices };
}
