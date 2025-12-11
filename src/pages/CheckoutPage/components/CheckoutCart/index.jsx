import React from 'react';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import CartFooter from './CartFooter';
import CartEmpty from './CartEmpty';
import { calculateItemTotal } from '../../utils/cartUtils';

export default function CheckoutCart({ items, updateQuantity, removeItem, onCheckout }) {
    // Total is calculated in parent hook (useCheckoutCart) and passed usually, but here we recalculate for display or verify props.
    // Actually, CheckoutCart receives `items` but calculateItemTotal logic was inside.

    // totalAmount is passed to CartFooter. Let's calculate it or accept it as prop?
    // The previous code calculated it inside.
    const totalAmount = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

    return (
        <div className="flex flex-col color-bg-card rounded-2xl overflow-hidden">
            {/* Header */}
            <CartHeader />

            {/* Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 min-h-[645px] max-h-[650px]">
                {items.map((item, index) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        index={index}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        calculateItemTotal={calculateItemTotal}
                    />
                ))}

                {items.length === 0 && <CartEmpty />}
            </div>

            {/* Footer (Fixed) */}
            <div className="mt-auto">
                <CartFooter
                    totalAmount={totalAmount}
                    onCheckout={onCheckout}
                    isEmpty={items.length === 0}
                />
            </div>
        </div>
    );
}
