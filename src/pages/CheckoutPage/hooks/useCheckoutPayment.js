import { useState } from 'react';
import { createTransaction } from '../api/checkoutApi';

export const useCheckoutPayment = (cartItems, setCartItems, showToast) => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // Handler барои кушодани модал
    const handleCheckoutClick = () => {
        if (cartItems.length === 0) {
            showToast('error', 'Ошибка', 'Ваша корзина пуста');
            return;
        }
        setIsPaymentModalOpen(true);
    };

    // Handler барои тасдиқи пардохт
    const handleConfirmPayment = async (amount, cardId) => {
        try {
            // Group items by type
            const productIds = [];
            const serviceIds = [];
            const courseIds = [];

            cartItems.forEach(item => {
                const itemPayload = {
                    id: parseInt(item.id),
                    count: parseInt(item.qty)
                };

                if (item.type === 'product') {
                    productIds.push(itemPayload);
                } else if (item.type === 'service') {
                    serviceIds.push(itemPayload);
                } else if (item.type === 'course') {
                    courseIds.push(itemPayload);
                } else {
                    // Fallback to product if type is missing
                    productIds.push(itemPayload);
                }
            });

            const payload = {
                card_id: parseInt(cardId),
                payment_type: "1",
                product_ids: productIds,
                service_ids: serviceIds,
                course_ids: courseIds
            };

            await createTransaction(payload);

            setIsPaymentModalOpen(false);
            showToast('success', 'Успешно', 'Оплата успешно проведена');
            setCartItems([]);

        } catch (error) {
            console.error("Payment Error:", error);
            if (error.response && error.response.data) {
                console.error("Server Validation Error:", error.response.data);
                showToast('error', 'Ошибка валидации', JSON.stringify(error.response.data) || 'Проверьте данные');
            } else {
                showToast('error', 'Ошибка', error.message || 'Не удалось провести оплату');
            }
        }
    };

    return {
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        handleCheckoutClick,
        handleConfirmPayment
    };
};
