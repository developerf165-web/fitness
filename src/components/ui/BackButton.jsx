import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Универсальный компонент для кнопки "Назад"
 * Использует navigate(-1) для возврата на предыдущую страницу
 */
const BackButton = ({ onClick, className = '', ariaLabel = 'Бозгашт' }) => {
    const navigate = useNavigate();

    const handleClick = onClick || (() => navigate(-1));

    return (
        <button
            onClick={handleClick}
            className={`text-white cursor-pointer hover:text-gray-300 transition-colors p-2 ${className}`}
            aria-label={ariaLabel}
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
        </button>
    );
};

export default BackButton;
