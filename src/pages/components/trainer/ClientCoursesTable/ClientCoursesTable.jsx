import React, { useState, useEffect } from 'react';
import TabNavigation from './TabNavigation';
import TableHeader from './TableHeader';
import LessonBlock from './LessonBlock';
import ClientTable from './ClientTable';
import { initialData } from '../../data/courseData';
import { tableHeaders } from '../../constants/tableConstants';

const ClientCoursesTable = ({ initialTab, showTabs = true }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'group');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="w-full mx-auto rounded-xl shadow-2xl text-white">
      {showTabs && (
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          groupCount={Object.keys(initialData.group).length}
          individualCount={initialData.individual.length}
        />
      )}
      
      <TableHeader headers={tableHeaders} />

      {activeTab === 'group' ? (
        Object.entries(initialData.group).map(([lessonTitle, lessonData]) => (
          <LessonBlock key={lessonTitle} lessonTitle={lessonTitle} lessonData={lessonData} />
        ))
      ) : (
        <ClientTable clients={initialData.individual} />
      )}
      
       <div className="text-right pt-1 px-4 pb-2 text-sm color-accent font-semibold cursor-pointer">
          Ещё
       </div>
    </div>
  );
};

export default ClientCoursesTable;
