import React from 'react';

export default function FormFooter({ onClose, onSubmit, isSubmitting, isFormValid = true, submitText = "Сохранить" }) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      <button
        type="button"
        onClick={onClose}
        disabled={isSubmitting}
        className="py-3.5 rounded-2xl color-bg-mini-card cursor-pointer text-white text-sm font-medium bg-hover-card transition-colors"
      >
        Отмена
      </button>

      <button
        type="button"
        disabled={isSubmitting}
        className="py-3.5 rounded-2xl color-bg-mini-card text-white cursor-pointer text-sm font-medium bg-hover-card transition-colors"
      >
        Запустить
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting || !isFormValid}
        className={
          isFormValid && !isSubmitting
            ? "py-3.5 rounded-2xl color-bg-accent text-black text-sm cursor-pointer font-bold hover:bg-[#b3e600] transition-colors"
            : "py-3.5 rounded-2xl color-bg-mini-card text-gray-400 text-sm cursor-not-allowed font-bold transition-colors"
        }
      >
        {isSubmitting ? '...' : submitText}
      </button>
    </div>
  );
}