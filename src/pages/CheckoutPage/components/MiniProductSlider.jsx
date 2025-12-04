import React from 'react';
import ScrollButton from '../../../components/common/ScrollButton';
import useHorizontalScroll from '../../../hooks/useHorizontalScroll';

export default function MiniProductSlider({ title, products, items, onProductClick, onItemClick }) {
    // 🎯 Истифодаи custom hook бо вобастагӣ ба products
    const actualProducts = items || products;
    const actualOnClick = onItemClick || onProductClick;

    const { scrollRef, showLeftScroll, showRightScroll, scrollMenu, checkScroll } = useHorizontalScroll({
        scrollAmount: 200,
        dependencies: [actualProducts]
    });

    return (
        <div className="mb-6">
            {/* Сарлавҳа бо ранги accent ва андозаи хурд */}
            <h3 className="text-sm font-medium color-accent mb-3 px-2.5">{title}</h3>

            {/* Слайдер */}
            <div className="relative">
                {/* Тугмаи чап - дар миёнаи products */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                    <ScrollButton
                        direction="left"
                        onClick={() => scrollMenu('left')}
                        isVisible={showLeftScroll}
                    />
                </div>

                {/* Контейнери scroll танҳо барои продуктҳо */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="overflow-x-auto scrollbar-hide scroll-smooth pl-2.5 pr-8"
                >
                    {/* Рӯйхати продуктҳо */}
                    <div className="flex gap-3">
                        {actualProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => actualOnClick && actualOnClick(product)}
                                className="flex-shrink-0 w-32 bg-[#1C1C1C] rounded-lg overflow-hidden cursor-pointer group relative h-40"
                            >
                                {/* Сурат - пураи карт */}
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay аз поён то боло */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                </div>

                                {/* Тахфиф */}
                                {product.discount && (
                                    <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                                        -{product.discount}%
                                    </div>
                                )}

                                {/* Мундариҷа - дар поён */}
                                <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
                                    {/* Ном */}
                                    <h4 className="text-[11px] font-semibold text-white line-clamp-2 mb-1.5">
                                        {product.name}
                                    </h4>

                                    {/* Нарх - баробар */}
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-xs font-bold text-white">
                                            {Number(product.price).toFixed(2)} TJS
                                        </span>
                                        {product.oldPrice && (
                                            <span className="text-[10px] text-gray-400 line-through">
                                                {Number(product.oldPrice).toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Тугмаи рост - дар миёнаи products */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                    <ScrollButton
                        direction="right"
                        onClick={() => scrollMenu('right')}
                        isVisible={showRightScroll}
                    />
                </div>
            </div>
        </div>
    );
}
