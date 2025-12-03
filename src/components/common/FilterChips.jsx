// src/components/common/FilterChips.jsx
import React from "react";
import { HiPlus } from "react-icons/hi";
import ScrollButton from "./ScrollButton";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";

/**
 * Компоненти FilterChips - барои намоиши категорияҳо ва филтр кардан
 * @param {Array} filters - Рӯйхати категорияҳо
 * @param {string} activeFilter - Категорияи фаъол
 * @param {function} onFilterChange - Функсия барои тағйири филтр
 * @param {function} onAddCategoryClick - Функсия барои илова кардани категория (ихтиёрӣ)
 * @param {boolean} showAddButton - Нишон додани тугмаи "+" (пешфарз: false)
 */
const FilterChips = ({
  filters,
  activeFilter,
  onFilterChange,
  onAddCategoryClick,
  showAddButton = false
}) => {

  const activeClass = "color-bg-accent text-black";
  const inactiveClass = "color-bg-card text-white";

  // Истифодаи scroll hook
  const { scrollRef, showLeftScroll, showRightScroll, scrollMenu, checkScroll } = useHorizontalScroll({
    scrollAmount: 200,
    dependencies: [filters]
  });

  return (
    <div className="relative">
      {/* Тугмаи чап */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <ScrollButton
          direction="left"
          onClick={() => scrollMenu('left')}
          isVisible={showLeftScroll}
        />
      </div>

      {/* Контейнери филтрҳо */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center space-x-2 py-4 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth px-8"
      >
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => onFilterChange(filter)}
            className={`px-5 py-2 cursor-pointer rounded-full text-sm font-medium transition-colors flex-shrink-0 ${activeFilter === filter ? activeClass : inactiveClass
              }`}
          >
            {filter}
          </button>
        ))}

        {/* Тугмаи "+" - танҳо вақте ки showAddButton === true */}
        {showAddButton && onAddCategoryClick && (
          <button
            onClick={onAddCategoryClick}
            className={`flex-shrink-0 cursor-pointer w-10 h-10 color-bg-accent rounded-full flex items-center justify-center`}
          >
            <HiPlus className="w-5 h-5 text-black" />
          </button>
        )}
      </div>

      {/* Тугмаи рост */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <ScrollButton
          direction="right"
          onClick={() => scrollMenu('right')}
          isVisible={showRightScroll}
        />
      </div>
    </div>
  );
};

export default FilterChips;
