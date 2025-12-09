// src/pages/Services/sections/ActiveCoursesSection.jsx

import React from 'react';
import SectionHeader from '/src/components/ui/SectionHeader';
import ActiveSection from '../components/Active/ActiveSection';

/**
 * Қисми "Актуальные"
 * Курсҳои фаъол
 */
export default function ActiveCoursesSection({ items }) {
  return (
    <>
      <SectionHeader 
        title="Актуальные" 
        customRightElement="8 курсов" 
      />
      <ActiveSection items={items} />
      <div className="mb-12"></div>
    </>
  );
}
