import React from 'react';
import Button from '../../../../components/ui/Button';

export default function CartFooter({ totalAmount, onCheckout }) {
    return (
        <div className="p-4 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(26,26,26,0.95)] backdrop-blur-sm">
            <div className="flex gap-4">
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
                    Оплатить {totalAmount > 0 && `(${totalAmount} c.)`}
                </Button>
            </div>
        </div>
    );
}
