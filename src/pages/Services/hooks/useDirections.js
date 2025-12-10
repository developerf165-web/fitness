import { useState, useEffect, useCallback } from 'react';
import { fetchDirections } from '../api/directionsApi';

/**
 * Custom hook барои идораи Directions
 */
export function useDirections() {
  const [directions, setDirections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDirections = useCallback(async () => {
    setIsLoading(true);
    try {
      const dataFromApi = await fetchDirections();

      const formattedData = dataFromApi.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        iconUrl: item.icon || '',
      }));

      // Remove duplicates by ID
      const uniqueData = formattedData.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setDirections(uniqueData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDirections();
  }, [loadDirections]);

  return { directions, setDirections, isLoading, error, refetch: loadDirections };
}
