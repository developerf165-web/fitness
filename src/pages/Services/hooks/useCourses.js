import { useState } from 'react';
import coursesMockData from '../data/coursesMockData';

/**
 * Custom hook барои идораи Courses
 */
export function useCourses() {
  const [courses, setCourses] = useState(coursesMockData);

  return { courses, setCourses };
}
