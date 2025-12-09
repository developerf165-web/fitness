import React from 'react';
import BackButton from '@components/ui/BackButton';

export default function CheckoutHeader() {
    return (
        <div className="flex items-center gap-4 mb-6">
            {/* Тугмаи бозгашт */}
            <BackButton ariaLabel="Назад" />

            {/* Сарлавҳа */}
            <h1 className="text-3xl font-bold text-white">Касса</h1>
        </div>
    );
}
