import React from 'react';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import CartFooter from './CartFooter';
import CartEmpty from './CartEmpty';

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
            <CartHeader />

            {/* Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 max-h-[600px]">
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
            <CartFooter totalAmount={totalAmount} onCheckout={onCheckout} />
        </div>
    );
}
