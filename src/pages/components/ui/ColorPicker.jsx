import React, { useState } from 'react';

const MAIN_COLORS = [
  'bg-red-600', 'bg-pink-600', 'bg-orange-500', 'bg-red-400',
  'bg-lime-500', 'bg-lime-600', 'bg-green-600', 'bg-teal-500'
];

const EXTRA_COLORS = [
  'bg-cyan-500', 'bg-blue-600', 'bg-indigo-500', 'bg-violet-600',
  'bg-purple-600', 'bg-fuchsia-500', 'bg-rose-500', 'bg-amber-400'
];

const ColorPicker = ({ selectedColor, onSelectColor }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedColors = showAll
    ? [...MAIN_COLORS, ...EXTRA_COLORS]
    : MAIN_COLORS;

  return (
    <div className="mt-4">
      <p className="block color-accent text-base font-medium pl-3 mb-3">
        Выберите цвет
      </p>
      <div className="flex flex-wrap items-center">
        {displayedColors.map((color, index) => (
          <div
            key={index}
            className={`relative w-13 h-13 rounded-full m-1.5 cursor-pointer border-2 transition-all duration-150 ${color} ${
              selectedColor === color
                ? 'color-border-accent scale-110'
                : 'border-transparent hover:scale-105'
            }`}
            onClick={() => onSelectColor(color)}
            title={color.replace('bg-', '')}
          >
            {selectedColor === color && (
              <span className="absolute top-0.5 right-0.5 color-accent text-xl font-bold">
                ✓
              </span>
            )}
          </div>
        ))}

        {showAll ? (
          <button
            type="button"
            onClick={() => setShowAll(false)}
            className="color-accent cursor-pointer text-sm ml-2 hover:text-[rgba(208,253,62,1)] transition-colors"
          >
            Меньше
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="color-accent cursor-pointer text-sm ml-2 hover:text-[rgba(208,253,62,1)] transition-colors"
          >
            Ещё
          </button>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
