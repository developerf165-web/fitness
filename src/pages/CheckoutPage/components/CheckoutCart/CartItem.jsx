import React from 'react';
import { X } from 'lucide-react';
import QuantityInput from './QuantityInput';

export default function CartItem({ item, index, updateQuantity, removeItem, calculateItemTotal }) {
    const handleQuantityChange = (newQty) => {
        // Use cartId if available
        updateQuantity(item.cartId || item.id, newQty);
    };

    return (
        <div className="grid grid-cols-[2fr_1.5fr_0.8fr_0.8fr_0.8fr_1fr_0.5fr] gap-2 p-3 items-center rounded-xl mb-1 transition-colors hover:bg-[rgba(255,255,255,0.02)]">
            {/* Номи маҳсулот */}
            <div className="text-sm font-medium color-text-main truncate" title={item.name}>
                {item.name}
            </div>

            {/* Штрихкод */}
            <div className="text-xs color-text-muted truncate">
                {item.barcode || '-'}
            </div>

            {/* Миқдор */}
            <div className="flex justify-center">
                <QuantityInput
                    value={item.qty}
                    onChange={handleQuantityChange}
                    min={1}
                    max={999}
                />
            </div>

            {/* Нарх */}
            <div className="text-sm color-text-main text-center">
                {Number(item.price).toFixed(2)} c.
            </div>

            {/* Тахфиф */}
            <div className="text-sm color-text-muted text-center">
                {item.discount > 0 ? `-${item.discount}%` : '-'}
            </div>

            {/* Ҷамъ */}
            <div className="text-sm font-bold color-text-main text-right">
                {calculateItemTotal(item).toFixed(2)} c.
            </div>

            {/* Тугмаи нест кардан */}
            <div className="flex justify-end">
                <button
                    onClick={() => removeItem(item.cartId || item.id)}
                    className="p-1.5 color-text-muted hover:text-red-500 hover:bg-[rgba(255,59,48,0.1)] rounded-lg transition-colors"
                    aria-label="Нест кардани маҳсулот"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
