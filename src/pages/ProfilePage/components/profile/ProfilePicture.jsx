import React from 'react';
import { HiCamera } from 'react-icons/hi'; // Аз react-icons

/**
 * @param {object} props
 * @param {string} props.imageUrl - URL-и сурати профил
 * @param {function} props.onEditClick - Функсия барои таҳрири сурат
 */
export default function ProfilePicture({ imageUrl, onEditClick }) {
  return (
    <div className="relative w-40 h-40 mx-auto">
      <img
        src={imageUrl}
        alt="Картинка профиля"
        className="w-full h-full object-cover rounded-full border-4 color-border-accent"
      />
      <button
        onClick={onEditClick}
        className="absolute bottom-1 right-1 color-bg-mini-card p-3 rounded-full text-white hover:bg-gray-700 transition-colors"
        aria-label="Изменение фотографии профиля"
      >
        <HiCamera className="w-6 h-6" />
      </button>
    </div>
  );
}