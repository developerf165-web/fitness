// src/components/fitness/FilterChips.jsx
import React from "react";
import { HiPlus } from "react-icons/hi";

// 💡 1. Пропи нав илова карда шуд: onAddCategoryClick
const FilterChips = ({ filters, activeFilter, onFilterChange, onAddCategoryClick }) => {
  
  const activeClass = "color-bg-accent text-black"; // Ранги сабзи равшан
  const inactiveClass = "color-bg-card text-white"; // Ранги хокистарии торик

  return (
    <div className="flex items-center space-x-2 py-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
      {filters.map((filter, index) => (
        <button
          key={index}
          onClick={() => onFilterChange(filter)} // Ҳангоми клик, функсияи 'prop'-ро даъват мекунад
          className={`px-5 py-2 cursor-pointer rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter ? activeClass : inactiveClass
          }`}
        >
          {filter}
        </button>
      ))}
      
      {/* 💡 2. Функсияи onAddCategoryClick ба тугмаи "+" пайваст карда шуд */}
      <button
        onClick={onAddCategoryClick}
        className={`flex-shrink-0 cursor-pointer w-10 h-10 color-bg-accent rounded-full flex items-center justify-center`}
      >
        <HiPlus className="w-5 h-5 text-black" />
      </button>
    </div>
  );
};

export default FilterChips;