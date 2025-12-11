import React, { useState, useEffect } from 'react';
import Modal from '@components/ui/Modal';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import DropdownField from '@components/ui/DropdownField';
import Button from '@components/ui/Button';

export default function PaymentModal({
    isOpen,
    onClose,
    onConfirm,
    totalAmount,
    userBalance = 500,
    userBonuses = 20,
    discount = 0,
    userCards = [],
    isProcessing = false // Add default false to avoid errors if prop missing
}) {
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [isCardDropdownOpen, setIsCardDropdownOpen] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            // Select first card by default if exists
            if (userCards && userCards.length > 0) {
                setSelectedCardId(userCards[0].id);
            }
            setIsCardDropdownOpen(false);
        }
    }, [isOpen, userCards]);

    const finalTotal = totalAmount; // No bonus split logic anymore
    const earnedBonuses = (finalTotal * 0.05).toFixed(2);

    // Helper to format card label
    const formatCardLabel = (card) => {
        return `${card.name || 'Карта'} (${card.card_number || '****'}) - ${card.balance} TJS`;
    };

    const selectedCardLabel = selectedCardId
        ? formatCardLabel(userCards.find(c => c.id === selectedCardId) || {})
        : '';

    const handleCardSelect = (label) => {
        const card = userCards.find(c => formatCardLabel(c) === label);
        if (card) {
            setSelectedCardId(card.id);
        }
        setIsCardDropdownOpen(false);
    };

    const content = (
        <div className="space-y-6">
            {/* Balance Info */}
            <div className="flex flex-col gap-3 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium tracking-wide">НАЛИЧНЫЕ</span>
                    <span className="text-xl font-bold color-accent tracking-wider">{Number(userBalance).toFixed(2)} TJS</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium tracking-wide">БОНУСЫ</span>
                    <span className="text-xl font-bold color-accent tracking-wider">{Number(userBonuses).toFixed(2)}</span>
                </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
                {/* Card Selection */}
                {userCards.length > 0 ? (
                    <DropdownField
                        label="Выберите карту"
                        displayValue={selectedCardLabel}
                        placeholder="Выберите карту..."
                        isActive={isCardDropdownOpen}
                        onToggle={() => setIsCardDropdownOpen(!isCardDropdownOpen)}
                        onClose={() => setIsCardDropdownOpen(false)}
                        selectedValue={selectedCardLabel}
                        onSelectChange={handleCardSelect}
                        optionsData={[{
                            title: 'Мои карты',
                            items: userCards.map(formatCardLabel)
                        }]}
                    />
                ) : (
                    <div className="text-red-500 text-sm">У пользователя нет карт. Оплата невозможна.</div>
                )}
            </div>

            {/* Summary */}
            <div className="space-y-3 pt-2 border-t border-[rgba(255,255,255,0.1)]">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Сумма скидки</span>
                    <span className="text-white">{discount.toFixed(2)} TJS</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Получение бонусов</span>
                    <span className="color-accent">+{earnedBonuses}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-[rgba(255,255,255,0.1)]">
                    <span className="font-bold text-white">ИТОГО К ОПЛАТЕ</span>
                    <span className="text-xl font-bold color-accent">={finalTotal.toFixed(2)} TJS</span>
                </div>
            </div>
        </div>
    );

    const footer = (
        <div className="flex items-center justify-between w-full gap-4">
            <Button
                type="button"
                variant="default"
                onClick={onClose}
                disabled={isProcessing}
            >
                Отмена
            </Button>
            <Button
                type="button"
                variant="primary"
                disabled={!selectedCardId || isProcessing} // Disable if no card selected or processing
                onClick={() => onConfirm(finalTotal, selectedCardId)}
            >
                {isProcessing ? 'Сохранение...' : 'Оплатить'}
            </Button>
        </div >
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ScrollableModalContentWrapper
                title="Оплата"
                content={content}
                footer={footer}
            />
        </Modal>
    );
}
