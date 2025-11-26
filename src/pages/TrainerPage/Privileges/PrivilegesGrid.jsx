// components/trainer/Privileges/PrivilegesGrid.jsx
import React, { useState, useEffect } from 'react';
import PrivilegeCard from './PrivilegeCard';
import { privilegesData } from './privilegesData';

const PrivilegesGrid = () => {
  const [items, setItems] = useState(privilegesData);
  const [expandedId, setExpandedId] = useState(null);

  // Логикаи пӯшидан ҳангоми пахш дар ҷои дигар
  useEffect(() => {
    const handleClickOutside = () => {
      setExpandedId(null);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleToggle = (parentId, childId = null) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === parentId) {
        if (item.type === 'toggle' && !childId) {
          return { ...item, isActive: !item.isActive };
        }
        if (childId && item.items) {
          const updatedItems = item.items.map(subItem => 
            subItem.id === childId ? { ...subItem, isActive: !subItem.isActive } : subItem
          );
          return { ...item, items: updatedItems };
        }
      }
      return item;
    }));
  };

  return (
    <div className="w-full">
      <h2 className="text-white text-2xl font-semibold mb-4">Привилегии</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
        {items.map((item) => (
          // ТАҒЙИРОТ: relative, h-16 ва z-index
          <div 
            key={item.id} 
            className={`relative h-16 ${expandedId === item.id ? 'z-50' : 'z-0'}`}
            onClick={(e) => e.stopPropagation()} // Барои он ки худи кортро пахш кунӣ, пӯшида нашавад
          >
             <PrivilegeCard 
                data={item}
                isExpanded={expandedId === item.id}
                onExpand={handleExpand}
                onToggle={handleToggle}
             />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivilegesGrid;