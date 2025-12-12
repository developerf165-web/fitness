import { useState, useMemo } from 'react';
import { calculateCartTotal, calculateBonus } from '../utils/cartUtils';

export const useCheckoutCart = () => {
    // State барои корзина
    const [cartItems, setCartItems] = useState([]);

    // Handler барои илова кардан ба корзина
    const addToCart = (product) => {
        // Generate a unique ID based on type and ID to prevent collisions (e.g. product-1 vs service-1)
        const type = product.type || 'unknown';
        const uniqueId = `${type}-${product.id}`;

        setCartItems(prev => {
            const existingItem = prev.find(item => item.cartId === uniqueId);
            if (existingItem) {
                return prev.map(item =>
                    item.cartId === uniqueId
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }
            // Add new item with cartId
            return [...prev, { ...product, cartId: uniqueId, qty: 1 }];
        });
    };

    // Handler барои иваз кардани миқдор
    const updateQuantity = (cartId, newQty) => {
        if (newQty < 1) return;
        setCartItems(prev => prev.map(item =>
            item.cartId === cartId ? { ...item, qty: parseInt(newQty) || 0 } : item
        ));
    };

    // Handler барои нест кардан аз корзина
    const removeItem = (cartId) => {
        setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    };

    // Ҳисоб кардани нархи умумӣ
    const totalAmount = useMemo(() => {
        return calculateCartTotal(cartItems);
    }, [cartItems]);

    const bonusPercentage = 5; // Bronze tier bonus (5%)
    const bonusAmount = calculateBonus(totalAmount, bonusPercentage);
    const finalTotal = totalAmount - bonusAmount;

    return {
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeItem,
        totalAmount,
        bonusAmount,
        finalTotal
    };
};
