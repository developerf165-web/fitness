import React from 'react';

export default function CartEmpty() {
    return (
        <div className="flex flex-col items-center justify-center h-40 text-(--color-text-muted)">
            <p>Корзина пуста</p>
        </div>
    );
}
