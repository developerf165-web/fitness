import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductSlider({ products, onProductClick }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative mb-6">
            {/* Тугмаи чап */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Scroll left"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Слайдер */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10"
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => onProductClick && onProductClick(product)}
                        className="flex-shrink-0 w-48 bg-[#1C1C1C] rounded-xl p-3 cursor-pointer hover:scale-105 transition-transform relative"
                    >
                        {/* Тахфиф */}
                        {product.discount && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                                -{product.discount}%
                            </div>
                        )}

                        {/* Сурат бо object-cover */}
                        <div className="w-full h-32 mb-2">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        {/* Ном */}
                        <h3 className="text-sm font-semibold mb-2 text-white line-clamp-2">
                            {product.name}
                        </h3>

                        {/* Нарх */}
                        <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-white">
                                {product.price} TJS
                            </span>
                            {product.oldPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                    {product.oldPrice} TJS
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Тугмаи рост */}
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Scroll right"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
