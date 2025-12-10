import React, { useEffect, useRef } from 'react';

export default function CheckoutSearchResults({
    results,
    onSelectUser,
    onSelectProduct,
    isVisible,
    activeIndex // New prop
}) {
    if (!isVisible) return null;

    const { users = [], services = [], courses = [], products = [] } = results;

    const hasResults = users.length > 0 || services.length > 0 || courses.length > 0 || products.length > 0;

    if (!hasResults) return null;

    // Helper for rendering count with accent color
    const CountBadge = ({ count }) => (
        <div className="flex items-center gap-1">
            <span>Найдено:</span>
            <span className="color-accent">{count}</span>
        </div>
    );

    // Global index tracker
    let globalIndex = -1;

    // Helper to check if current item is active
    const getItemProps = (item, type) => {
        globalIndex++;
        const isActive = globalIndex === activeIndex;

        return {
            className: `flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 
                ${isActive ? 'bg-[rgba(208,253,62,0.15)] border border-[var(--color-border-accent)]' : 'hover:bg-[rgba(255,255,255,0.05)] border border-transparent'}`,
            ref: (el) => {
                if (isActive && el) {
                    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            },
            onClick: () => {
                if (type === 'user') onSelectUser(item);
                else onSelectProduct(item);
            }
        };
    };

    return (
        <div
            className="absolute top-full left-0 right-0 mt-3 rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.1)] z-50 max-h-[500px] overflow-y-auto custom-scrollbar"
            style={{
                backgroundColor: 'rgba(15, 15, 15, 0.95)', // Darker, cleaner background
                backdropFilter: 'blur(20px)', // Stronger blur
                WebkitBackdropFilter: 'blur(20px)',
            }}
        >

            {/* Users Section */}
            {users.length > 0 && (
                <div className="p-2">
                    <div className="flex justify-between items-center px-3 py-2 text-sm text-[var(--color-text-muted)] font-medium tracking-wide uppercase text-xs">
                        <span className="color-accent">Пользователи</span>
                        <CountBadge count={users.length} />
                    </div>
                    {users.map((user) => (
                        <div key={user.id} {...getItemProps(user, 'user')}>
                            {/* REMOVED AVATAR AS REQUESTED */}
                            <span className="text-white text-base font-medium">{user.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Services Section */}
            {services.length > 0 && (
                <div className="p-2 border-t border-[rgba(255,255,255,0.05)]">
                    <div className="flex justify-between items-center px-3 py-2 text-sm text-[var(--color-text-muted)] font-medium tracking-wide uppercase text-xs">
                        <span className="color-accent">Услуги</span>
                        <CountBadge count={services.length} />
                    </div>
                    {services.map((service) => (
                        <div key={service.id} {...getItemProps(service, 'product')}>
                            <span className="text-white text-base font-medium">{service.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Courses Section */}
            {courses.length > 0 && (
                <div className="p-2 border-t border-[rgba(255,255,255,0.05)]">
                    <div className="flex justify-between items-center px-3 py-2 text-sm text-[var(--color-text-muted)] font-medium tracking-wide uppercase text-xs">
                        <span className="color-accent">Курсы</span>
                        <CountBadge count={courses.length} />
                    </div>
                    {courses.map((course) => (
                        <div key={course.id} {...getItemProps(course, 'product')}>
                            <span className="text-white text-base font-medium">{course.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Products Section */}
            {products.length > 0 && (
                <div className="p-2 border-t border-[rgba(255,255,255,0.05)]">
                    <div className="flex justify-between items-center px-3 py-2 text-sm text-[var(--color-text-muted)] font-medium tracking-wide uppercase text-xs">
                        <span className="color-accent">Продукты</span>
                        <CountBadge count={products.length} />
                    </div>
                    {products.map((product) => (
                        <div key={product.id} {...getItemProps(product, 'product')}>
                            <span className="text-white text-base font-medium">{product.name}</span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
