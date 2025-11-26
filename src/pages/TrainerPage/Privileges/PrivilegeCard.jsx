// components/trainer/Privileges/PrivilegeCard.jsx
import React from 'react';

// Иконаи Check (Тамға) - Рангашро мисли сурат кардам (Accent Lime/Green)
const CheckIcon = ({ active }) => (
  <div
    className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-200 flex-shrink-0
    ${active ? 'border-none color-bg-accent' : 'border-zinc-600 hover:border-zinc-400'}`}
  >
    {active && (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    )}
  </div>
);

const PrivilegeCard = ({ data, onToggle, onExpand, isExpanded }) => {
  
  // Классҳои асосӣ
  // Агар isExpanded бошад: absolute ва shadow-2xl илова мешавад
  const containerClasses = `
    w-full rounded-xl overflow-hidden transition-all duration-200 
    color-bg-card text-white border border-transparent
    ${isExpanded 
      ? 'absolute top-0 left-0 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.8)] h-auto ring-1 ring-zinc-700' 
      : 'h-16 bg-hover-card cursor-pointer'
    }
  `;

  // --- ВАРИАНТИ 1: Toggle (Мисли "Главная" ё "Финансы") ---
  if (data.type === 'toggle') {
    return (
      <div 
        onClick={() => onToggle(data.id)}
        className={`${containerClasses} p-4 flex justify-between items-center color-bg-card bg-hover-card cursor-pointer`}
      >
        <span className="font-bold uppercase text-sm tracking-wide">{data.title}</span>
        <CheckIcon active={data.isActive} />
      </div>
    );
  }

  // --- ВАРИАНТИ 2: Dropdown (Мисли "Клиенты") ---
  return (
    <div className={`${containerClasses} flex flex-col collor-bg-card`}>
      {/* Header */}
      <div 
        onClick={() => onExpand(data.id)}
        className={`p-4 flex justify-between items-center h-16 cursor-pointer ${isExpanded ? 'border-b border-zinc-800' : ''}`}
      >
        <span className="font-bold uppercase text-sm tracking-wide">{data.title}</span>
        
        <div className="flex items-center space-x-1">
          {!isExpanded && <span className="color-accent text-sm font-bold">{data.count}</span>}
          <span className={`color-accent transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>          
          {/* Агар кушода бошад, тирчаро нишон деҳ */}
          {isExpanded && (
            <span className="color-accent">
            </span>
          )}
        </div>
      </div>

      {/* List Items (Фақат вақте ки кушода аст нишон дода мешавад) */}
      {isExpanded && (
        <div className="px-2 pb-2 animate-in fade-in zoom-in-95 duration-200">
          <div className="space-y-1 pt-2">
            {data.items && data.items.map((item) => (
              <div 
                key={item.id} 
                className="flex justify-between items-center cursor-pointer group p-3 rounded-lg hover:bg-white/5 transition-colors" 
                onClick={(e) => {
                  e.stopPropagation(); // Барои пӯшида нашудани корт
                  onToggle(data.id, item.id);
                }}
              >
                <span className="text-zinc-300 text-sm font-medium group-hover:text-white transition-colors">
                  {item.label}
                </span>
                <CheckIcon active={item.isActive} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivilegeCard;