// CardioModal/CustomTableRow.jsx

import React from 'react';

export default function CustomTableRow({ participant }) {
    const isPaid = participant.payment === 'Оплачено';
    
    return (
        <tr className="border-b bottom-border-color cursor-pointer hover:bg-zinc-800 transition-colors">
            {/* ФИО */}
            <td className="p-3 text-left">{participant.name}</td>
            {/* Телефон */}
            <td className="p-3 text-center">{participant.phone}</td>
            {/* Оплата */}
            <td className="p-3 text-center">
                <span className={isPaid ? 'text-green-400' : 'text-yellow-400'}>
                    {participant.payment}
                </span>
            </td>
            {/* Дата регистрации + "x" */}
            <td className="p-3 text-center">
                <div className='flex justify-between items-center'>
                    <span>{participant.date}</span>
                    {/* Кнопка "x" для удаления */}
                    <span className='ml-4 text-gray-500 hover:text-red-500 cursor-pointer text-xl font-bold'>&times;</span>
                </div>
            </td>
        </tr>
    );
}