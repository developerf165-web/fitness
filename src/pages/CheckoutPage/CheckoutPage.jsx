import React, { useState, useRef } from 'react';
import CheckoutHeader from './components/CheckoutHeader';
import UserLoyaltyCard from './components/UserLoyaltyCard';
import RightSidebar from './components/RightSidebar';
import SearchComponent from '../Dashboard/components/SearchComponent';
import CheckoutCart from './components/CheckoutCart';
import PaymentModal from './components/PaymentModal';
import CheckoutSearchResults from './components/CheckoutSearchResults';
import { useToast } from '../components/Toast/ToastContext';
import { useCheckoutCart } from './hooks/useCheckoutCart';
import { useCheckoutSearch } from './hooks/useCheckoutSearch';
import { useCheckoutPayment } from './hooks/useCheckoutPayment';

import useClickOutside from '../../hooks/useClickOutside';

export default function CheckoutPage() {
    const { showToast } = useToast();
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const searchContainerRef = useRef(null);

    useClickOutside(searchContainerRef, () => {
        setIsResultsVisible(false);
    });

    // 1. Cart Logic
    const {
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeItem,
        totalAmount,
        bonusAmount,
        finalTotal
    } = useCheckoutCart();

    // 2. Search Logic
    const {
        searchQuery,
        setSearchQuery,
        selectedUser,
        setSelectedUser,
        foundUsers,
        activeIndex,
        filteredProducts,
        filteredServices,
        allServices,
        isLoadingServices,
        servicesError,
        allCourses,
        isLoadingCourses,
        coursesError,
        allProducts,
        isLoadingProducts,
        productsError,
        filteredCourses,
        handleSelectUser,
        handleSelectProduct,
        handleKeyDown
    } = useCheckoutSearch(addToCart);

    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    // 3. Payment Logic
    const {
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        handleCheckoutClick,
        handleConfirmPayment
    } = useCheckoutPayment(cartItems, setCartItems, showToast);

    // Wrapper for payment confirmation to show loading state
    const handleProcessPayment = async (total, cardId) => {
        setIsPaymentProcessing(true);
        // Simulate API delay (or await real API if handleConfirmPayment was async)
        await new Promise(resolve => setTimeout(resolve, 1500));

        await handleConfirmPayment(total, cardId); // Execute actual logic

        setIsPaymentProcessing(false);
        setIsPaymentModalOpen(false); // Ensure modal closes
    };

    return (
        <div className="min-h-screen text-white pt-4">
            {/* Сарлавҳа */}
            <CheckoutHeader />

            <div className="mb-6 relative" ref={searchContainerRef}>
                <SearchComponent
                    query={searchQuery}
                    setQuery={(val) => {
                        setSearchQuery(val);
                        if (val) setIsResultsVisible(true);
                    }}
                    onKeyDown={handleKeyDown}
                />
                {searchQuery && (
                    <CheckoutSearchResults
                        results={{
                            users: foundUsers,
                            products: filteredProducts,
                            services: filteredServices,
                            courses: filteredCourses
                        }}
                        onSelectUser={handleSelectUser}
                        onSelectProduct={handleSelectProduct}
                        isVisible={!!searchQuery && isResultsVisible}
                        activeIndex={activeIndex}
                    />
                )}
            </div>

            {/* ҚИСМИ АСОСӢ */}
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">

                {/* ҚИСМИ ЧАП - Форма */}
                <div className="flex flex-col gap-6 h-full">
                    <UserLoyaltyCard
                        userData={selectedUser || {
                            avatar: '/images/avatar.jpg',
                            name: 'АЗИЗА СУЛТАНОВА',
                            phone: '+992 92 000 0000',
                            balance: '500.00 TJS',
                            tier: 'Bronze',
                            points: bonusAmount.toFixed(2)
                        }}
                        priceData={{
                            price: `${totalAmount.toFixed(2)} c.`,
                            bonus: `${bonusAmount.toFixed(2)} c.`,
                            total: `${finalTotal.toFixed(2)} c.`
                        }}
                    />

                    <div className="flex-1">
                        <CheckoutCart
                            items={cartItems}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                            onCheckout={handleCheckoutClick}
                        />
                    </div>
                </div>

                {/* ҚИСМИ РОСТ - Слайдерҳои хурд */}
                <div className="h-full">
                    <RightSidebar
                        products={allProducts}
                        isLoadingProducts={isLoadingProducts}
                        productsError={productsError}
                        services={allServices}
                        isLoadingServices={isLoadingServices}
                        servicesError={servicesError}
                        courses={allCourses}
                        isLoadingCourses={isLoadingCourses}
                        coursesError={coursesError}
                        onProductClick={addToCart}
                    />
                </div>

            </div>

            {/* Модали пардохт */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => !isPaymentProcessing && setIsPaymentModalOpen(false)}
                onConfirm={handleProcessPayment}
                isProcessing={isPaymentProcessing}
                totalAmount={totalAmount}
                userBalance={selectedUser ? parseFloat(selectedUser.balance) : 0}
                userBonuses={selectedUser ? parseFloat(selectedUser.points) : 0}
                userCards={selectedUser ? selectedUser.card : []}
                discount={0}
            />
        </div>
    );
}
