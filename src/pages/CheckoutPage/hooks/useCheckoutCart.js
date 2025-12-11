import { useState, useMemo } from 'react';
import { calculateCartTotal, calculateBonus } from '../utils/cartUtils';

export const useCheckoutCart = () => {
    // State барои корзина
    const [cartItems, setCartItems] = useState([]);

    // Handler барои илова кардан ба корзина
    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    // Handler барои иваз кардани миқдор
    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, qty: parseInt(newQty) || 0 } : item
        ));
    };

    // Handler барои нест кардан аз корзина
    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
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
