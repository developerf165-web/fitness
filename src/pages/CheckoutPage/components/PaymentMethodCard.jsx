import React from 'react';
import { Banknote, CreditCard, Smartphone } from 'lucide-react';

export default function PaymentMethodCard({ method, isSelected, onSelect }) {
    // Иконкаҳо барои ҳар як тариқ
    const icons = {
        cash: Banknote,
        card: CreditCard,
        app: Smartphone
    };

    const Icon = icons[method.value];

    return (
        <div
            onClick={() => onSelect(method.value)}
            className={`
        relative cursor-pointer rounded-xl p-4 transition-all duration-200
        ${isSelected
                    ? 'color-bg-accent border-2 color-border-accent'
                    : 'color-bg-mini-card border-2 border-transparent hover:border-gray-600'
                }
      `}
        >
            <div className="flex items-center gap-3">
                {/* Иконка */}
                <div className={`
          p-2 rounded-lg
          ${isSelected ? 'bg-black/20' : 'bg-gray-700/50'}
        `}>
                    <Icon
                        size={24}
                        className={isSelected ? 'text-black' : 'text-white'}
                    />
                </div>

                {/* Матн */}
                <span className={`
          font-medium text-base
          ${isSelected ? 'text-black' : 'text-white'}
        `}>
                    {method.label}
                </span>
            </div>

            {/* Radio indicator */}
            <div className={`
        absolute top-4 right-4 w-5 h-5 rounded-full border-2
        ${isSelected
                    ? 'border-black bg-black'
                    : 'border-gray-400'
                }
      `}>
                {isSelected && (
                    <div className="absolute inset-1 rounded-full bg-white" />
                )}
            </div>
        </div>
    );
}
