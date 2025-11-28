import React from 'react';

export default function ScheduleToggle({ scheduleType, onToggle }) {
  return (
    <div className="flex gap-3 mt-4">
      <button
        type="button"
        onClick={() => onToggle('MWF')}
        className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
            ${scheduleType === 'MWF'
            ? 'color-bg-accent text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]'
            : 'color-bg-mini-card text-zinc-400 bg-hover-card'}`}
      >
        Пн, Ср, Пт
      </button>
      <button
        type="button"
        onClick={() => onToggle('TTS')}
        className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
            ${scheduleType === 'TTS'
            ? 'color-bg-accent text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]'
            : 'color-bg-mini-card text-zinc-400 bg-hover-card'}`}
      >
        Вт, Чт, Сб
      </button>
    </div>
  );
}