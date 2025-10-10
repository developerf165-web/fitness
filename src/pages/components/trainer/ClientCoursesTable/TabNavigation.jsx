import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, groupCount, individualCount }) => (
  <div className="flex text-lg font-semibold pb-3 mb-6">
    <button
      onClick={() => setActiveTab('group')}
      className={`pb-2 px-4 cursor-pointer transition-colors duration-200 ${activeTab === 'group' ? 'color-accent border-b-2 color-border-accent' : 'text-white hover:text-[rgba(208,253,62,1)]'}`}
    >
      Групповой ({groupCount})
    </button>
    <button
      onClick={() => setActiveTab('individual')}
      className={`pb-2 px-4 cursor-pointer transition-colors duration-200 ${activeTab === 'individual' ? 'color-accent border-b-2 color-border-accent' : 'text-white hover:text-[rgba(208,253,62,1)]'}`}
    >
      Индивидуальный ({individualCount})
    </button>
  </div>
);

export default TabNavigation;