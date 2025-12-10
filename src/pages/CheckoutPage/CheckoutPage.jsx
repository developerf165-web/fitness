import React, { useState, useMemo, useEffect } from 'react';
import CheckoutHeader from './components/CheckoutHeader';
import UserLoyaltyCard from './components/UserLoyaltyCard';
import RightSidebar from './components/RightSidebar';
import SearchComponent from '../Dashboard/components/SearchComponent';
import CheckoutCart from './components/CheckoutCart';
import PaymentModal from './components/PaymentModal';
import CheckoutSearchResults from './components/CheckoutSearchResults';
import { searchUsers, createTransaction } from './api/checkoutApi'; // Import API
import { mockSliderProducts, mockServices, mockCourses } from './data/checkoutMockData';
import { useToast } from '../components/Toast/ToastContext';

export default function CheckoutPage() {
    const { showToast } = useToast();

    // State барои ҷустуҷӯ
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [foundUsers, setFoundUsers] = useState([]); // State for API results
    const [activeIndex, setActiveIndex] = useState(-1); // For keyboard navigation

    // API Search with Debounce
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                try {
                    const users = await searchUsers(searchQuery);
                    // Map API data to our format
                    const mappedUsers = users.map(user => {
                        // Find main card logic - user example has 'card' array
                        const mainCard = user.card?.find(c => c.card_type_id === 1) || {};
                        const bonusCard = user.card?.find(c => c.card_type_id === 2) || {};

                        return {
                            ...user, // Spread first to avoid overwriting custom fields
                            id: user.id || Math.random(),
                            name: `${user.name} ${user.surname || ''}`,
                            avatar: user.img || '/images/avatar.jpg',
                            phone: user.username || '',
                            balance: mainCard.balance ? `${mainCard.balance} TJS` : '0 TJS',
                            tier: 'Bronze',
                            points: bonusCard.balance || 0,
                        };
                    });
                    setFoundUsers(mappedUsers);
                } catch (error) {
                    console.error("Failed to search users", error);
                    // Should we clear users or show error? For now, maybe just keep empty
                    setFoundUsers([]);
                }
            } else {
                setFoundUsers([]);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Reset active index when query changes
    useEffect(() => {
        setActiveIndex(-1);
    }, [searchQuery, foundUsers]);

    // Filtering logic

    // Users are now from API (foundUsers)
    // Products/Services/Courses still filtered locally from mocks for now as per instructions "ва продуктҳоро аз локалний дата бигарад"


    // State барои корзина
    const [cartItems, setCartItems] = useState([]);

    /* 
    const filteredUsers = useMemo(() => {
       // Old local filter logic removed
    }, [searchQuery]); 
    */

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

    // Sidebar Data (Should pass all or filtered? Keeping original sidebar logic for now, but usually sidebars might not filter by global search in this robust way if search is for dropdown. 
    // User requested "Found: N" dropdown. 
    // Let's keep Sidebar displaying everything IF query is empty, OR filtered if query exists. 
    // BUT the prompt implies the search input controls the DROPDOWN results primarily.
    // Let's make Sidebar generic (showing all recommended) and SearchDropdown specific.

    // Actually, looking at previous code, `filteredProducts` was used for Sidebar. 
    // I will keep `filteredProducts` logic for Sidebar as is (filtered by query), BUT also use lists for dropdown.

    // Wait, if I type "Aziza", products will be empty in sidebar. That's fine.

    // Handler selection
    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearchQuery(''); // Close search
    };

    const handleSelectProduct = (product) => {
        addToCart(product);
        setSearchQuery(''); // Close search
    };

    // Keyboard Navigation Logic
    const allSearchResults = useMemo(() => {
        // Must match the order in CheckoutSearchResults
        return [...foundUsers, ...filteredServices, ...filteredCourses, ...filteredProducts];
    }, [foundUsers, filteredServices, filteredCourses, filteredProducts]);

    const handleKeyDown = (e) => {
        if (!searchQuery) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev < allSearchResults.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < allSearchResults.length) {
                const selectedItem = allSearchResults[activeIndex];
                // Determine type based on item properties or check existence in lists
                const isUser = foundUsers.includes(selectedItem);

                if (isUser) {
                    handleSelectUser(selectedItem);
                } else {
                    handleSelectProduct(selectedItem);
                }
            }
        }
    };

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
    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => {
            const subtotal = item.price * item.qty;
            const discountAmount = (subtotal * item.discount) / 100;
            return sum + (subtotal - discountAmount);
        }, 0);
    };

    const totalAmount = calculateTotal();
    const bonusPercentage = 5; // Bronze tier bonus (5%)
    const bonusAmount = (totalAmount * bonusPercentage) / 100;
    const finalTotal = totalAmount - bonusAmount;

    // State барои модали пардохт
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

                // Determine type based on category or logic from mock data
                // In mock data we added 'type' field: 'product', 'service', 'course'
                if (item.type === 'product') {
                    productIds.push(itemPayload);
                } else if (item.type === 'service') {
                    serviceIds.push(itemPayload);
                } else if (item.type === 'course') {
                    courseIds.push(itemPayload);
                } else {
                    // Fallback if type is missing (e.g. legacy mocks)
                    // Try to guess or just default to product? 
                    // Let's assume everything is a product if unknown or fix mock data
                    productIds.push(itemPayload);
                }
            });

            const payload = {
                card_id: parseInt(cardId),
                payment_type: "1", // Default cash/card mix?
                product_ids: productIds,
                service_ids: serviceIds,
                course_ids: courseIds
            };

            console.log("Processing Payment Payload:", payload);

            await createTransaction(payload);

            setIsPaymentModalOpen(false);
            showToast('success', 'Успешно', 'Оплата успешно проведена');
            setCartItems([]);
            // Optionally clear selected user or keep?
            // setSelectedUser(null); 

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

    return (
        <div className="min-h-screen text-white pt-4">
            {/* Сарлавҳа */}
            <CheckoutHeader />

            <div className="mb-6 relative">
                <SearchComponent
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    onKeyDown={handleKeyDown}
                />
                {searchQuery && (
                    <CheckoutSearchResults
                        results={{
                            users: foundUsers, // Use foundUsers from API
                            products: filteredProducts,
                            services: filteredServices,
                            courses: filteredCourses
                        }}
                        onSelectUser={handleSelectUser}
                        onSelectProduct={handleSelectProduct}
                        isVisible={!!searchQuery}
                        activeIndex={activeIndex}
                    />
                )}
            </div>

            {/* ҚИСМИ АСОСӢ */}
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">

                {/* ҚИСМИ ЧАП - Форма */}
                <div className="flex flex-col gap-6 h-full">
                    <UserLoyaltyCard
                        userData={selectedUser || { // Use selected user or default/null
                            avatar: '/images/avatar.jpg',
                            name: 'АЗИЗА СУЛТАНОВА',
                            phone: '+992 92 000 0000',
                            balance: '500.00 TJS',
                            tier: 'Bronze',
                            points: bonusAmount.toFixed(2) // Kept original logic for points/balance for now if not overridden
                        }}
                        // If selectedUser has specific data we should potentially use it, but calculation logic (bonus etc) might need adjustment. 
                        // For now, I'll overlay selectedUser properties on top of the structure.
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
                        products={searchQuery ? filteredProducts : mockSliderProducts} // Show all if no search, else filtered
                        services={searchQuery ? filteredServices : mockServices}
                        courses={searchQuery ? filteredCourses : mockCourses}
                        onProductClick={addToCart}
                    />
                </div>

            </div>

            {/* Модали пардохт */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onConfirm={handleConfirmPayment}
                totalAmount={totalAmount}
                userBalance={selectedUser ? parseFloat(selectedUser.balance) : 0}
                userBonuses={selectedUser ? parseFloat(selectedUser.points) : 0}
                userCards={selectedUser ? selectedUser.card : []} // Pass user cards
                discount={0}
            />
        </div>
    );
}
