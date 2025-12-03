import React from 'react';

export default function CartHeader() {
    return (
        <div className="grid grid-cols-[2fr_1.5fr_0.8fr_0.8fr_0.8fr_1fr_0.5fr] gap-2 p-4 border-b border-[rgba(255,255,255,0.05)] text-xs text-(--color-text-muted) font-medium uppercase tracking-wider">
            <div>Название</div>
            <div>Штрихкод</div>
            <div className="text-center">Кол-во</div>
            <div className="text-center">Цена</div>
            <div className="text-center">Скидка</div>
            <div className="text-right">Итого</div>
            <div></div>
        </div>
    );
}
