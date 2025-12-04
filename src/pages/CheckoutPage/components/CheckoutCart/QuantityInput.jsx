import React, { useRef, useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function QuantityInput({ value, onChange, min = 1, max = 999, className = '' }) {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState(value.toString());

    // Навсозии inputValue вақте ки value аз берун тағйир меёбад
    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    const handleIncrement = () => {
        const newValue = Math.min(value + 1, max);
        onChange(newValue);
    };

    const handleDecrement = () => {
        const newValue = Math.max(value - 1, min);
        onChange(newValue);
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;

        // Иҷозат додан ба холӣ будан барои таҳрир
        setInputValue(newValue);

        // Агар рақам бошад, фавран тағйир медиҳем
        if (newValue !== '') {
            const numValue = parseInt(newValue, 10);

            if (!isNaN(numValue)) {
                const clampedValue = Math.max(min, Math.min(numValue, max));
                onChange(clampedValue);
            }
        }
    };

    const handleBlur = () => {
        // Агар майдон холӣ ё нодуруст бошад, ба min табдил медиҳем
        if (inputValue === '' || isNaN(parseInt(inputValue, 10))) {
            onChange(min);
            setInputValue(min.toString());
        } else {
            // Санҷиши қимат
            const numValue = parseInt(inputValue, 10);
            const clampedValue = Math.max(min, Math.min(numValue, max));
            onChange(clampedValue);
            setInputValue(clampedValue.toString());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleIncrement();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleDecrement();
        }
    };

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <button
                onClick={handleDecrement}
                disabled={value <= min}
                className="w-6 h-6 flex items-center justify-center color-bg-mini-card rounded-md hover:bg-[rgba(60,60,62,1)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Кам кардани миқдор"
            >
                <Minus size={12} className="color-text-main" />
            </button>

            <input
                ref={inputRef}
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                min={min}
                max={max}
                className="w-12 h-8 color-bg-mini-card rounded-lg text-center color-text-main text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(208,253,62,1)] transition-all"
                aria-label="Миқдор"
            />

            <button
                onClick={handleIncrement}
                disabled={value >= max}
                className="w-6 h-6 flex items-center justify-center color-bg-mini-card rounded-md hover:bg-[rgba(60,60,62,1)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Зиёд кардани миқдор"
            >
                <Plus size={12} className="color-text-main" />
            </button>
        </div>
    );
}
