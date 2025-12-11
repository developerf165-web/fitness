import { useState, useEffect } from 'react';
import { fetchCourses } from '../api/coursesApi';
// import coursesMockData from '../data/coursesMockData'; // Mock no longer needed by default

/**
 * Custom hook барои идораи Courses
 */
export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCourses();
        // Map API data to UI model if needed, or use as is if compatible
        // API returns: id, title, img, price, discount, etc.
        // UI expects: id, title, image, price, discount, etc.
        const mappedCourses = data.map(item => ({
          ...item,
          image: item.img, // Map img to image
          // Ensure numeric types
          price: parseFloat(item.price),
          discount: parseFloat(item.discount),
          // Default color/gradient if missing (UI uses statusColor)
          statusColor: "color-bg-accent"
        }));
        setCourses(mappedCourses);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError(err.message || "Не удалось загрузить курсы");
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  return { courses, setCourses, isLoading, error };
}
