import { useState, useEffect, useMemo } from 'react';
import { searchUsers } from '../api/checkoutApi';
import { fetchServices } from '../../Services/api/servicesApi';
import { fetchCourses } from '../../Services/api/coursesApi';
import { productsService } from '../../../features/products/services/productsService';


export const useCheckoutSearch = (addToCart) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [foundUsers, setFoundUsers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    // Data states
    const [services, setServices] = useState([]);
    const [isLoadingServices, setIsLoadingServices] = useState(true);
    const [servicesError, setServicesError] = useState(null);

    const [courses, setCourses] = useState([]);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [coursesError, setCoursesError] = useState(null);

    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [productsError, setProductsError] = useState(null);

    // Fetch All Data on mount
    useEffect(() => {
        const loadServices = async () => {
            setIsLoadingServices(true);
            setServicesError(null);
            try {
                const data = await fetchServices();
                const mappedServices = data.map(item => ({
                    id: item.id,
                    name: item.name,
                    category: "Услуга",
                    price: parseFloat(item.price),
                    tjs: parseFloat(item.price),
                    oldPrice: null,
                    discount: item.discount ? parseFloat(item.discount) : 0,
                    visit_count: item.visit_count ? parseInt(item.visit_count) : 0,
                    type: 'service',
                    imageUrl: item.img || '/images/iim.png'
                }));
                setServices(mappedServices);
            } catch (error) {
                console.error("Failed to fetch services:", error);
                setServicesError("Не удалось загрузить услуги. Пожалуйста, проверьте подключение к интернету.");
                setServices([]);
            } finally {
                setIsLoadingServices(false);
            }
        };

        const loadCourses = async () => {
            setIsLoadingCourses(true);
            setCoursesError(null);
            try {
                const data = await fetchCourses();
                const mappedCourses = data.map(item => ({
                    id: item.id,
                    name: item.title, // API has 'title', UI often expects 'name' or 'title'
                    title: item.title,
                    category: "Курс",
                    price: item.discount_price ? parseFloat(item.discount_price) : parseFloat(item.price),
                    tjs: item.discount_price ? parseFloat(item.discount_price) : parseFloat(item.price),
                    oldPrice: item.discount > 0 ? parseFloat(item.price) : null,
                    discount: item.discount && item.price > 0 ? Math.round((parseFloat(item.discount) / parseFloat(item.price)) * 100) : 0,
                    user_max: item.user_max || 0,
                    visit_count: 0,
                    type: 'course',
                    imageUrl: item.img || '/images/iim.png'
                }));
                setCourses(mappedCourses);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setCoursesError("Не удалось загрузить курсы. Пожалуйста, проверьте подключение к интернету.");
                setCourses([]);
            } finally {
                setIsLoadingCourses(false);
            }
        };

        const loadProducts = async () => {
            setIsLoadingProducts(true);
            setProductsError(null);
            try {
                const data = await productsService.getAll();
                // productsService.getAll() already maps structure, but we might need to add type for search
                const mappedProducts = data.map(item => ({
                    ...item,
                    type: 'product' // Ensure distinct type for search logic
                }));
                setProducts(mappedProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProductsError("Не удалось загрузить продукты.");
                setProducts([]);
            } finally {
                setIsLoadingProducts(false);
            }
        };

        loadServices();
        loadCourses();
        loadProducts();
    }, []);

    // API Search with Debounce
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                try {
                    const users = await searchUsers(searchQuery);
                    // Map API data to our format
                    const mappedUsers = users.map(user => {
                        const mainCard = user.card?.find(c => c.card_type_id === 1) || {};
                        const bonusCard = user.card?.find(c => c.card_type_id === 2) || {};

                        return {
                            ...user,
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
                    setFoundUsers([]);
                }
            } else {
                setFoundUsers([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Reset active index when query changes
    useEffect(() => {
        setActiveIndex(-1);
    }, [searchQuery, foundUsers]);

    // Filtering logic
    const filteredProducts = useMemo(() => {
        const sourceData = products;
        if (!searchQuery) return sourceData;
        return sourceData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, products, isLoadingProducts]);

    const filteredServices = useMemo(() => {
        if (!searchQuery) return services;
        return services.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, services]);

    const filteredCourses = useMemo(() => {
        if (!searchQuery) return courses;
        return courses.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, courses]);

    // Handlers
    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearchQuery('');
    };

    const handleSelectProduct = (product) => {
        addToCart(product);
        setSearchQuery('');
    };

    // Keyboard Navigation Logic
    const allSearchResults = useMemo(() => {
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
                const isUser = foundUsers.includes(selectedItem);

                if (isUser) {
                    handleSelectUser(selectedItem);
                } else {
                    handleSelectProduct(selectedItem);
                }
            }
        }
    };

    return {
        searchQuery,
        setSearchQuery,
        selectedUser,
        setSelectedUser,
        foundUsers,
        activeIndex,
        filteredProducts,
        filteredServices,
        allServices: services,
        isLoadingServices,
        servicesError,
        allCourses: courses,
        isLoadingCourses,
        coursesError,
        allProducts: products,
        isLoadingProducts,
        productsError,
        filteredCourses,
        handleSelectUser,
        handleSelectProduct,
        handleKeyDown
    };
};
