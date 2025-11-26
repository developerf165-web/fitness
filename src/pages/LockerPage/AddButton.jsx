import React from 'react';

export default function AddButton({ onClick }) {
    return (
        <button 
            onClick={onClick}
            className="w-35 h-12 cursor-pointer rounded-[15px] text-black font-medium color-bg-accent"
        >
            Добавить
        </button>
    );
}