// CardioModal/ParticipantsTable.jsx

import React from 'react';
import CustomTableRow from './CustomTableRow';

export default function ParticipantsTable({ participants }) {
    return (
        <div className="rounded-xl overflow-hidden color-bg-mini-card shadow-lg shadow-black/30">
            <table className="w-full border-collapse text-white text-sm">
                <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                        <th className="p-3 text-left font-medium">ФИО</th>
                        <th className="p-3 text-center font-medium">Телефон</th>
                        <th className="p-3 text-center font-medium">Оплата</th>
                        <th className="p-3 text-center font-medium">Дата регистрации</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((p) => (
                        <CustomTableRow key={p.id} participant={p} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}