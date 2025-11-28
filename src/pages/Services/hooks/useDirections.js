import { useState } from 'react';
import directionsMockData from '../data/directionsMockData';

/**
 * Custom hook барои идораи Directions
 */
export function useDirections() {
  const [directions, setDirections] = useState(directionsMockData);

  return { directions, setDirections };
}
