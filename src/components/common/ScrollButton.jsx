// src/components/common/ScrollButton.jsx

import React from 'react';

/**
 * Компоненти тугмаи scroll (слайдер)
 * @param {string} direction - 'left' ё 'right'
 * @param {function} onClick - Функсияи клик
 * @param {boolean} isVisible - Намоиш додан ё надодан
 * @param {string} className - CSS классҳои иловагӣ (ихтиёрӣ)
 */
const ScrollButton = ({ direction, onClick, isVisible, className = '' }) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center p-1 
        color-bg-mini-card hover:bg-[rgba(208,253,62,1)]
        text-white
        transition-all duration-200 
        h-8 w-8 shrink-0 cursor-pointer rounded-md
        ${className}
      `}
      aria-label={`${direction === 'left' ? 'Scroll Left' : 'Scroll Right'}`}
    >
      {direction === 'left' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </button>
  );
};

export default ScrollButton;
