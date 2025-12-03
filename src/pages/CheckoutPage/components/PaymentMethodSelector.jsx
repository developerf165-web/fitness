import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';

export default function PaymentMethodSelector({ selectedMethod, onMethodChange }) {
    // Тариқҳои пардохт
    const paymentMethods = [
        { value: 'cash', label: 'Наличными' },
        { value: 'card', label: 'Картой' },
        { value: 'app', label: 'Через приложение' }
    ];

    return (
        <div className="color-bg-card rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Выберите способ оплаты</h2>

            <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => (
                    <PaymentMethodCard
                        key={method.value}
                        method={method}
                        isSelected={selectedMethod === method.value}
                        onSelect={onMethodChange}
                    />
                ))}
            </div>
        </div>
    );
}
