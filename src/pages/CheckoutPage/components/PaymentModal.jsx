import React, { useState, useEffect } from 'react';
import Modal from '@components/ui/Modal';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import InputField from '@components/ui/InputField';
import Button from '@components/ui/Button';

export default function PaymentModal({
    isOpen,
    onClose,
    onConfirm,
    totalAmount,
    userBalance = 500,
    userBonuses = 20,
    discount = 0
}) {
    const [cashAmount, setCashAmount] = useState('');
    const [bonusAmount, setBonusAmount] = useState('');

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCashAmount(totalAmount.toString());
            setBonusAmount('');
        }
    }, [isOpen, totalAmount]);

    const handleCashChange = (e) => {
        setCashAmount(e.target.value);
    };

    const handleBonusChange = (e) => {
        const val = e.target.value;
        // Validate bonus amount (cannot exceed user bonuses)
        if (val === '' || (parseFloat(val) >= 0 && parseFloat(val) <= userBonuses)) {
            setBonusAmount(val);
        }
    };

    const parsedCash = parseFloat(cashAmount) || 0;
    const parsedBonus = parseFloat(bonusAmount) || 0;
    const finalTotal = Math.max(0, totalAmount - parsedBonus);

    // Earned bonuses (e.g., 5% of cash payment)
    const earnedBonuses = (parsedCash * 0.05).toFixed(2);

    const content = (
        <div className="space-y-6">
            {/* Balance Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="color-bg-mini-card p-4 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">НАЛИЧНЫЕ</div>
                    <div className="text-xl font-bold text-white">{Number(userBalance).toFixed(2)} TJS</div>
                </div>
                <div className="color-bg-mini-card p-4 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">БОНУСЫ</div>
                    <div className="text-xl font-bold color-accent">{Number(userBonuses).toFixed(2)}</div>
                </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
                <InputField
                    label="Оплата наличными"
                    placeholder="Наличные"
                    type="number"
                    value={cashAmount}
                    onChange={handleCashChange}
                />
                <InputField
                    label="Оплата бонусами"
                    placeholder="Бонусы"
                    type="number"
                    value={bonusAmount}
                    onChange={handleBonusChange}
                />
            </div>

            {/* Summary */}
            <div className="space-y-3 pt-2 border-t border-[rgba(255,255,255,0.1)]">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Сумма без скидки</span>
                    <span className="text-white">{totalAmount.toFixed(2)} TJS</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Сумма скидки</span>
                    <span className="text-white">{discount.toFixed(2)} TJS</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Оплата бонусами</span>
                    <span className="text-red-400">-{parsedBonus.toFixed(2)} TJS</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Получение бонусов</span>
                    <span className="color-accent">+{earnedBonuses}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-[rgba(255,255,255,0.1)]">
                    <span className="font-bold text-white">ИТОГО</span>
                    <span className="text-xl font-bold color-accent">={finalTotal.toFixed(2)} TJS</span>
                </div>
            </div>
        </div>
    );

    const footer = (
        <div className="flex justify-between w-full gap-4">
            <Button
                variant="default"
                className="flex-1 color-bg-mini-card color-text-main hover:bg-[#3A3A3C]"
                onClick={onClose}
            >
                Отмена
            </Button>
            <Button
                variant="primary"
                className="flex-1 color-bg-accent text-black font-bold hover:opacity-90"
                onClick={() => onConfirm(finalTotal)}
            >
                Оплатить
            </Button>
        </div>
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
