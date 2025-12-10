// src/pages/CheckoutPage/components/CheckoutCart/CartFooter.jsx

import React from 'react';
import Button from '@components/ui/Button';

/**
 * Footer компоненти барои Cart бо тугмаҳои Отмена ва Оплатить
 * Footer component for Cart with Cancel and Pay buttons
 */
export default function CartFooter({ totalAmount, onCheckout, onCancel }) {
    return (
        <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.05)] color-bg-card backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
                <Button
                    type="button"
                    variant="default"
                    onClick={onCancel || (() => console.log('Cancel'))}
                >
                    Отмена
                </Button>

                <Button
                    type="button"
                    variant="primary"
                    onClick={() => onCheckout && onCheckout(totalAmount)}
                >
                    Оплатить
                </Button>
            </div>
        </div>
    );
}
