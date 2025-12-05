import React, { useState } from 'react';

// Рангҳо бо классҳои Tailwind ва hex-коди мувофиқ
const MAIN_COLORS = [
  { class: 'bg-red-600', hex: '#dc2626' },
  { class: 'bg-pink-600', hex: '#db2777' },
  { class: 'bg-orange-500', hex: '#f97316' },
  { class: 'bg-red-400', hex: '#f87171' },
  { class: 'bg-lime-500', hex: '#84cc16' },
  { class: 'bg-lime-600', hex: '#65a30d' },
  { class: 'bg-green-600', hex: '#16a34a' },
  { class: 'bg-teal-500', hex: '#14b8a6' }
];

const EXTRA_COLORS = [
  { class: 'bg-cyan-500', hex: '#06b6d4' },
  { class: 'bg-blue-600', hex: '#2563eb' },
  { class: 'bg-indigo-500', hex: '#6366f1' },
  { class: 'bg-violet-600', hex: '#7c3aed' },
  { class: 'bg-purple-600', hex: '#9333ea' },
  { class: 'bg-fuchsia-500', hex: '#d946ef' },
  { class: 'bg-rose-500', hex: '#f43f5e' },
  { class: 'bg-amber-400', hex: '#fbbf24' }
];

const ColorPicker = ({ selectedColor, onSelectColor }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedColors = showAll
    ? [...MAIN_COLORS, ...EXTRA_COLORS]
    : MAIN_COLORS;

  // Нормализатсия: агар selectedColor hex бошад, check мекунем, агар class бошад ба hex табдил медиҳем
  const normalizeColor = (color) => {
    if (!color) return null;

    // Агар hex бошад (# бо шурӯъ мешавад), normalize кунем (lowwercase)
    if (color.startsWith('#')) {
      return color.toLowerCase();
    }

    // Агар Tailwind class бошад, ба hex табдил медиҳем
    const allColors = [...MAIN_COLORS, ...EXTRA_COLORS];
    const found = allColors.find(c => c.class === color);
    return found ? found.hex : null;
  };

  const normalizedSelected = normalizeColor(selectedColor);

  return (
    <div className="mt-4">
      <p className="block color-accent text-base font-medium pl-3 mb-3">
        Выберите цвет
      </p>
      <div className="flex flex-wrap items-center">
        {displayedColors.map((colorObj, index) => {
          const isSelected = normalizedSelected === colorObj.hex;

          return (
            <div
              key={index}
              className={`relative w-13 h-13 rounded-full m-1.5 cursor-pointer border-2 transition-all duration-150 ${colorObj.class} ${isSelected
                  ? 'color-border-accent scale-110'
                  : 'border-transparent hover:scale-105'
                }`}
              onClick={() => onSelectColor(colorObj.hex)} // Ҳамеша hex мефиристем
              title={colorObj.hex}
            >
              {isSelected && (
                <span className="absolute top-0.5 right-0.5 color-accent text-xl font-bold">
                  ✓
                </span>
              )}
            </div>
          );
        })}

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
