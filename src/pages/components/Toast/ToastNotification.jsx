import React from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

const ToastNotification = ({ title, message, onClose }) => {
  return (
    <div
      className="relative max-w-xs md:max-w-sm w-full rounded-xl shadow-2xl overflow-hidden pointer-events-auto bg-gray-900/90 backdrop-blur-xl border border-green-600/30"
      role="alert"
    >
      {/* --- SHIMMER EFFECT --- */}
      <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-green-400/20 before:to-transparent before:animate-shimmer pointer-events-none rounded-xl"></div>

      {/* --- CONTENT --- */}
      <div className="relative flex items-start p-4 z-10">
        {/* Боковая зеленая полоса */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>

        {/* Иконка Успеха */}
        <div className="flex-shrink-0 mr-3 my-auto">
          <CheckCircleIcon className="h-7 w-7 text-green-400" />
        </div>

        {/* Текст */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white leading-snug">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-300">{message}</p>
        </div>

        {/* Кнопка закрытия */}
        {onClose && (
          <button
            type="button"
            className="ml-4 -mr-1 p-1.5 inline-flex h-7 w-7 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition duration-150 ease-in-out"
            onClick={onClose}
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ToastNotification;
