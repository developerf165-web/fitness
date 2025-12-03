import React from 'react';
import { X } from 'lucide-react';

export default function CartItem({ item, index, updateQuantity, removeItem, calculateItemTotal }) {
    return (
        <div
            className={`grid grid-cols-[2fr_1.5fr_0.8fr_0.8fr_0.8fr_1fr_0.5fr] gap-2 p-3 items-center rounded-xl mb-1 transition-colors hover:bg-[rgba(255,255,255,0.02)] ${index === 0 ? 'bg-[rgba(255,255,255,0.02)]' : ''}`}
        >
            <div className="text-sm font-medium text-white truncate" title={item.name}>
                {item.name}
            </div>
            <div className="text-xs text-(--color-text-muted) truncate">
                {item.barcode || '-'}
            </div>
            <div className="flex justify-center">
                <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className={`w-12 h-8 bg-[#2C2C2E] rounded-lg text-center text-white text-sm focus:outline-none focus:ring-1 ${index === 0 ? 'focus:ring-(--color-accent) ring-1 ring-(--color-accent)' : 'focus:ring-(--color-accent)'}`}
                />
            </div>
            <div className="text-sm text-white text-center">
                {item.price} c.
            </div>
            <div className="text-sm text-(--color-text-muted) text-center">
                {item.discount > 0 ? `-${item.discount}%` : '-'}
            </div>
            <div className="text-sm font-bold text-white text-right">
                {calculateItemTotal(item).toFixed(0)} c.
            </div>
            <div className="flex justify-end">
                <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-(--color-text-muted) hover:text-red-500 hover:bg-[rgba(255,59,48,0.1)] rounded-lg transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
