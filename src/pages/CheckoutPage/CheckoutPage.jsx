import React, { useState, useMemo } from 'react';
import CheckoutHeader from './components/CheckoutHeader';
import UserLoyaltyCard from './components/UserLoyaltyCard';
import RightSidebar from './components/RightSidebar';
import SearchComponent from '../Dashboard/components/SearchComponent';
import CheckoutCart from './components/CheckoutCart';
import { mockSliderProducts, mockServices, mockCourses } from './data/checkoutMockData';
import { useToast } from '../components/Toast/ToastContext';

export default function CheckoutPage() {
    // Toast
    const { showToast } = useToast();

    // State барои ҷустуҷӯ
    const [searchQuery, setSearchQuery] = useState('');

    // State барои корзина
    const [cartItems, setCartItems] = useState([]);

    // Filtering logic
    const filteredProducts = useMemo(() => {
        if (!searchQuery) return mockSliderProducts;
        return mockSliderProducts.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const filteredServices = useMemo(() => {
        if (!searchQuery) return mockServices;
        return mockServices.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const filteredCourses = useMemo(() => {
        if (!searchQuery) return mockCourses;
        return mockCourses.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

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

    // Handler барои пардохт
    const handleCheckout = (amount) => {
        if (cartItems.length === 0) {
            showToast('Корзина пуста', 'error');
            return;
        }
        showToast(`Оплата успешно завершена! Сумма: ${amount} TJS`, 'success');
        setCartItems([]);
    };

    return (
        <div className="min-h-screen text-white pt-4">
            {/* Сарлавҳа */}
            <CheckoutHeader />

            <div className="mb-6">
                <SearchComponent
                    query={searchQuery}
                    setQuery={setSearchQuery}
                />
            </div>

            {/* ҚИСМИ АСОСӢ */}
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">

                {/* ҚИСМИ ЧАП - Форма */}
                <div className="flex flex-col gap-6 h-full">
                    <UserLoyaltyCard />

                    <div className="flex-1">
                        <CheckoutCart
                            items={cartItems}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                            onCheckout={handleCheckout}
                        />
                    </div>
                </div>

                {/* ҚИСМИ РОСТ - Слайдерҳои хурд */}
                <div className="h-full">
                    <RightSidebar
                        products={filteredProducts}
                        services={filteredServices}
                        courses={filteredCourses}
                        onProductClick={addToCart}
                    />
                </div>

            </div>
        </div>
    );
}
