import React, { useMemo } from 'react';
import OrderItem from './OrderItem';

export default function OrderSummary({ items }) {
    // Ҳисоби ҷамъи нарх
    const total = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price, 0);
    }, [items]);

    return (
        <div className="color-bg-card rounded-2xl p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Ваша покупка</h2>

            {/* Рӯйхати продуктҳо */}
            {items.length > 0 ? (
                <div className="space-y-4 mb-6">
                    {items.map((item) => (
                        <OrderItem key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center py-8">
                    Корзина пуста
                </p>
            )}

            {/* Ҷамъи нарх */}
            {items.length > 0 && (
                <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-white">
                            Итого:
                        </span>
                        <span className="text-2xl font-bold color-accent">
                            {total} TJS
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
