import React from 'react';
import { X } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function CheckoutCart({ items, updateQuantity, removeItem, onCheckout }) {

    const calculateItemTotal = (item) => {
        const subtotal = item.price * item.qty;
        const discountAmount = (subtotal * item.discount) / 100;
        return subtotal - discountAmount;
    };

    const totalAmount = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

    return (
        <div className="flex flex-col h-full color-bg-card rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1.5fr_0.8fr_0.8fr_0.8fr_1fr_0.5fr] gap-2 p-4 border-b border-[rgba(255,255,255,0.05)] text-xs text-(--color-text-muted) font-medium uppercase tracking-wider">
                <div>Название</div>
                <div>Штрихкод</div>
                <div className="text-center">Кол-во</div>
                <div className="text-center">Цена</div>
                <div className="text-center">Скидка</div>
                <div className="text-right">Итого</div>
                <div></div>
            </div>

            {/* Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 max-h-[600px]">
                {items.map((item, index) => (
                    <div
                        key={item.id}
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
                ))}

                {items.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-40 text-(--color-text-muted)">
                        <p>Корзина пуста</p>
                    </div>
                )}
            </div>

            {/* Footer (Fixed) */}
            <div className="p-4 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(26,26,26,0.95)] backdrop-blur-sm">
                <div className="flex justify-between px-6">
                    <Button
                        variant="default"
                        className="flex-1 bg-[#2C2C2E] text-white hover:bg-[#3A3A3C]"
                        onClick={() => console.log('Cancel')}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="primary"
                        className="flex-1 bg-(--color-accent) text-black font-bold hover:opacity-90"
                        onClick={() => onCheckout && onCheckout(totalAmount)}
                    >
                        Оплатить
                    </Button>
                </div>
            </div>
        </div>
    );
}
