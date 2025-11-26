// === FILE: /components/Schedule/TrainerDropdown.js ===

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from './icons';
import CustomCheckbox from './CustomCheckbox';
import { trainers } from './data';

const TrainerDropdown = () => {
  // 'true' гузоштем, то ба сурат монанд шавад
  const [isOpen, setIsOpen] = useState(true); 
  
  // Ҳолати (state) интихобшудаҳоро идора мекунем
  const [selected, setSelected] = useState({
    all: true,
    1: true,
    2: true,
    3: true,
  });

  const dropdownRef = useRef(null);

  // Барои пӯшидани dropdown ҳангоми клики беруна (ихтиёрӣ, аммо таҷрибаи хуб)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  // Мантиқи интихоб (Select logic)
  const handleSelect = (id) => {
    // ... (Шумо метавонед дар ин ҷо мантиқи мураккабтари интихобро илова кунед)
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const handleSelectAll = () => {
    // ...
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-x-2 color-bg-card text-gray-300 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#374151] transition"
      >
        Все тренеры
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 color-bg-card rounded-lg shadow-xl z-20 overflow-hidden">
          <ul className="p-2 space-y-1">
            {/* Интихоби ҳама */}
            <li 
              className="flex justify-between items-center p-2 rounded-lg bg-hover-card cursor-pointer"
              onClick={handleSelectAll}
            >
              <span className="text-sm font-medium color-accent">Выбрать все</span>
              <CustomCheckbox checked={selected.all} onChange={handleSelectAll} />
            </li>
            
            {/* Рӯйхати тренерон */}
            {trainers.map(trainer => (
              <li
                key={trainer.id}
                className="flex justify-between items-center p-2 rounded-lg bg-hover-card cursor-pointer"
                onClick={() => handleSelect(trainer.id)}
              >
                <span className="text-sm text-gray-200">{trainer.name}</span>
                <CustomCheckbox 
                  checked={!!selected[trainer.id]} 
                  onChange={() => handleSelect(trainer.id)} 
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrainerDropdown;