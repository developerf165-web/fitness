import React from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/solid';

// Конфигуратсия барои ҳар навъи тоаст
const TOAST_CONFIGS = {
  success: {
    icon: CheckCircleIcon,
    iconColor: 'text-green-400',
    borderColor: 'border-green-600/30',
    sidebarColor: 'bg-green-500',
    shimmerColor: 'before:via-green-400/20',
    focusRing: 'focus:ring-green-500'
  },
  error: {
    icon: XCircleIcon,
    iconColor: 'text-red-400',
    borderColor: 'border-red-600/30',
    sidebarColor: 'bg-red-500',
    shimmerColor: 'before:via-red-400/20',
    focusRing: 'focus:ring-red-500'
  },
  warning: {
    icon: ExclamationTriangleIcon,
    iconColor: 'text-yellow-400',
    borderColor: 'border-yellow-600/30',
    sidebarColor: 'bg-yellow-500',
    shimmerColor: 'before:via-yellow-400/20',
    focusRing: 'focus:ring-yellow-500'
  },
  info: {
    icon: InformationCircleIcon,
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-600/30',
    sidebarColor: 'bg-blue-500',
    shimmerColor: 'before:via-blue-400/20',
    focusRing: 'focus:ring-blue-500'
  }
};

const ToastNotification = ({ type = 'success', title, message, onClose }) => {
  // Гирифтани конфигуратсия барои навъи ҷорӣ (пешфарз: success)
  const config = TOAST_CONFIGS[type] || TOAST_CONFIGS.success;
  const IconComponent = config.icon;

  return (
    <div
      className={`relative max-w-xs md:max-w-sm w-full rounded-xl shadow-2xl overflow-hidden pointer-events-auto bg-gray-900/90 backdrop-blur-xl border ${config.borderColor}`}
      role="alert"
    >
      {/* SHIMMER EFFECT */}
      <div className={`absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent ${config.shimmerColor} before:to-transparent before:animate-shimmer pointer-events-none rounded-xl`}></div>

      {/* CONTENT */}
      <div className="relative flex items-start p-4 z-10">
        {/* Боковая полоса (цвет зависит от типа) */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.sidebarColor}`}></div>

        {/* Иконка (динамическая) */}
        <div className="flex-shrink-0 mr-3 my-auto">
          <IconComponent className={`h-7 w-7 ${config.iconColor}`} />
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
            className={`ml-4 -mr-1 p-1.5 inline-flex h-7 w-7 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${config.focusRing} transition duration-150 ease-in-out`}
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
