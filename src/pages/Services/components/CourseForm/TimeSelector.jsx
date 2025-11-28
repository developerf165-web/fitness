// fileName: TimeSelector.jsx
import React from 'react';

export default function TimeSelector({ selectedTime, onSelectTime, onFreeTrainersClick }) {
  const times = ['15:00', '16:00'];

  return (
    <div className="flex gap-3 mt-2">
      {times.map((time) => (
        <button
          key={time}
          type="button"
          onClick={() => onSelectTime(time)}
          className={`px-6 py-3 cursor-pointer rounded-xl text-sm font-medium transition-colors border
              ${selectedTime === time
              ? 'color-bg-mini-card text-white color-border-accent'
              : 'color-bg-mini-card text-zinc-400 border-transparent bg-hover-card'}`}
        >
          {time}
        </button>
      ))}
      <button
        type="button"
        onClick={onFreeTrainersClick}
        className="flex-1 cursor-pointer color-bg-accent text-black py-3 rounded-xl text-sm font-bold hover:bg-[#b3e600] transition-colors shadow-lg"
      >
        Свободные тренеры
      </button>
    </div>
  );
}