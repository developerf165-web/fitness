import React from 'react';

export default function OrderItem({ item }) {
    return (
        <div className="flex gap-4 pb-4 border-b border-gray-700 last:border-0 last:pb-0">
            {/* Сурат - МУҲИМ: object-cover! */}
            <div className="w-20 h-20 flex-shrink-0">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Маълумот */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-white mb-1">
                        {item.title}
                    </h3>
                    <p className="text-xs color-text-muted">
                        {item.category}
                    </p>
                </div>

                {/* Нарх */}
                <p className="text-base font-bold text-white">
                    {item.price} TJS
                </p>
            </div>
        </div>
    );
}
