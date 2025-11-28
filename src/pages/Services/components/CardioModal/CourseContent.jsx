// CardioModal/CourseContent.jsx

import React from 'react';
import ParticipantsTable from './ParticipantsTable';

export default function CourseContent({ searchQuery, setSearchQuery, participants }) {
    // В данном случае, SearchComponent используется в упрощенном виде,
    // так как его стили в модале отличаются от стилей в nav.
    // Если бы мы хотели использовать его полностью, нужно было бы передать rightAccessory
    // и настроить стили. Здесь мы используем простую форму для соответствия макету.

    return (
        <>
            {/* Секция поиска */}
            <div className="mb-4">
                <div className="relative w-full mb-2">
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 p-3 rounded-xl color-bg-mini-card text-white text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                        />
                    </svg>
                </div>
                <p className="text-xs text-gray-400 ml-1">
                    Добавление нового пользователя по поиску
                </p>
            </div>

            {/* Таблица участников */}
            <ParticipantsTable participants={participants} />
        </>
    );
}