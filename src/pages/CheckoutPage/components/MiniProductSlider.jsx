import React from 'react';
import MiniItemSlider from './MiniItemSlider';

export default function MiniProductSlider({ title, products, items, onProductClick, onItemClick, isLoading, error }) {
    const actualProducts = items || products;
    const actualOnClick = onItemClick || onProductClick;

    // Component for individual product to manage its own image state
    const ProductCard = ({ product }) => {
        const [loading, setLoading] = React.useState(true);
        const [imageError, setImageError] = React.useState(false);
        const showFallback = !product.imageUrl || product.imageUrl.trim() === "" || imageError;

        return (
            <div
                key={product.id}
                onClick={() => actualOnClick && actualOnClick(product)}
                className="flex-shrink-0 w-32 bg-[#1C1C1C] rounded-lg overflow-hidden cursor-pointer group relative h-40"
            >
                {/* Image Area */}
                <div className="absolute inset-0 w-full h-full">
                    {!showFallback ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className={`w-full h-full object-cover image-hover-zoom ${loading ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => setLoading(false)}
                            onError={() => {
                                setLoading(false);
                                setImageError(true);
                            }}
                        />
                    ) : (
                        /* Fallback with Shimmer */
                        <div className="absolute inset-0 flex items-center justify-center color-bg-card text-gray-500 skeleton-shimmer z-10">
                            <div className="w-8 h-8 opacity-20 bg-gray-400 rounded-full"></div>
                        </div>
                    )}

                    {/* Loading Shimmer Overlay */}
                    {loading && (
                        <div className="absolute inset-0 color-bg-card skeleton-shimmer z-20"></div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                </div>

                {/* Discount */}
                {product.discount && (
                    <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-30">
                        -{product.discount}%
                    </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-2 z-30">
                    <h4 className="text-[11px] font-semibold text-white line-clamp-2 mb-1.5">
                        {product.name}
                    </h4>
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
        );
    };

    const renderProduct = (product) => <ProductCard key={product.id} product={product} />;

    return (
        <MiniItemSlider
            title={title}
            items={actualProducts}
            renderItem={renderProduct}
            isLoading={isLoading}
            error={error}
        />
    );
}
