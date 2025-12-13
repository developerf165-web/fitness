// src/components/common/FilterChips.jsx
import React from "react";
import { HiPlus, HiOutlineDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import ScrollButton from "./ScrollButton";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import DropdownMenu from "../ui/DropdownMenu";

/**
 * Компоненти FilterChips - барои намоиши категорияҳо ва филтр кардан
 * @param {Array} filters - Рӯйхати категорияҳо
 * @param {string} activeFilter - Категорияи фаъол
 * @param {function} onFilterChange - Функсия барои тағйири филтр
 * @param {function} onAddCategoryClick - Функсия барои илова кардани категория (ихтиёрӣ)
 * @param {boolean} showAddButton - Нишон додани тугмаи "+" (пешфарз: false)
 * @param {function} onEdit - Функсия барои таҳрир (ихтиёрӣ)
 * @param {function} onDelete - Функсия барои ҳазф (ихтиёрӣ)
 */
const FilterChips = ({
  filters,
  activeFilter,
  onFilterChange,
  onAddCategoryClick,
  showAddButton = false,
  onEdit,
  onDelete,
  inactiveClassName
}) => {

  const activeClass = "color-bg-accent text-black";
  // Use prop or default
  const effectiveInactiveClass = inactiveClassName || "color-bg-card text-white";

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
        {filters.map((filter, index) => {
          const isAll = filter === 'Все';
          const isActive = activeFilter === filter;

          const menuItems = [
            {
              label: "Редактировать",
              icon: <HiPencil className="w-4 h-4" />,
              action: () => onEdit && onEdit(filter),
              className: "default",
            },
            {
              label: "Удалить",
              icon: <HiTrash className="w-4 h-4" />,
              action: () => onDelete && onDelete(filter),
              className: "danger",
            },
          ];

          return (
            <div
              key={index}
              className={`group relative flex items-center px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-colors flex-shrink-0 select-none ${isActive ? activeClass : effectiveInactiveClass}`}
              onClick={() => onFilterChange(filter)}
            >
              <span className={!isAll ? "mr-1" : ""}>{filter}</span>

              {!isAll && (onEdit || onDelete) && (
                <div
                  className="max-w-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-w-[2.5rem] opacity-0 group-hover:opacity-100 flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu items={menuItems}>
                    <button className="menu-dots-button ml-1">
                      <HiOutlineDotsVertical className="w-4 h-4" />
                    </button>
                  </DropdownMenu>
                </div>
              )}
            </div>
          );
        })}

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
