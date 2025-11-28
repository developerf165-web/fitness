// CardioModal/CourseHeader.jsx

import React from 'react';

export default function CourseHeader() {
    return (
        <div className="text-white mb-6">
            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                {/* Изображение курса */}
                <img
                    src="placeholder_image.jpg"
                    alt="Кардио нагрузки"
                    className="w-full h-full object-cover"
                />
                {/* Значок скидки */}
                <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                    -5%
                </div>
            </div>

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-bold">КАРДИО НАГРУЗКИ</h1>
                    <p className="text-sm text-gray-400">Групповой курс</p>
                </div>
                {/* Аватар тренера */}
                <img
                    src="placeholder_avatar.jpg"
                    alt="Тренер"
                    className="w-12 h-12 rounded-full border-2 border-gray-600"
                />
            </div>

            {/* Информация о цене */}
            <div className="space-y-1 mt-4 border-t border-gray-700 pt-4">
                <div className="flex justify-between text-gray-300">
                    <span>Цена курса:</span>
                    <span className="font-semibold">600 смн</span>
                </div>
                <div className="flex justify-between text-red-400">
                    <span>Скидка:</span>
                    <span className="font-semibold">-5%</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-green-400">
                    <span>Цена со %:</span>
                    <span>580 смн</span>
                </div>
            </div>
        </div>
    );
}