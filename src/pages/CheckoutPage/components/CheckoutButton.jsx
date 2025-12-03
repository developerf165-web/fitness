import React from 'react';
import Button from '../../components/ui/Button';

export default function CheckoutButton({ total, isDisabled, onClick, isLoading }) {
    return (
        <div className="color-bg-card rounded-2xl p-6 mt-6">
            <Button
                variant="primary"
                onClick={onClick}
                disabled={isDisabled || isLoading}
                type="button"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <span className="loader"></span>
                        Обработка...
                    </span>
                ) : (
                    `Оплатить ${total} TJS`
                )}
            </Button>
        </div>
    );
}
