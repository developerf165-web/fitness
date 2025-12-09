import React from 'react';
import Button from '@components/ui/Button';

export default function CartFooter({ totalAmount, onCheckout }) {
    return (
        <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.05)] color-bg-card backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
                <Button
                    variant="default"
                    className="color-bg-mini-card color-text-main hover:bg-[#3A3A3C]"
                    onClick={() => console.log('Cancel')}
                >
                    Отмена
                </Button>
                <Button
                    variant="primary"
                    className="color-bg-accent text-black font-bold hover:opacity-90"
                    onClick={() => onCheckout && onCheckout(totalAmount)}
                >
                    Оплатить
                </Button>
            </div>
        </div>
    );
}
