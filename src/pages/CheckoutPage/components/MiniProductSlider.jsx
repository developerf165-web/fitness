import React from 'react';
import MiniItemSlider from './MiniItemSlider';
import ShimmerImage from '../../../components/ui/ShimmerImage';

export default function MiniProductSlider({ title, products, items, onProductClick, onItemClick, isLoading, error }) {
    const actualProducts = items || products;
    const actualOnClick = onItemClick || onProductClick;

    const renderProduct = (product) => (
        <div
            key={product.id}
            onClick={() => actualOnClick && actualOnClick(product)}
            className="flex-shrink-0 w-32 color-bg-mini-card card-hover-effect rounded-lg overflow-hidden cursor-pointer group relative h-40"
        >
            {/* Image Area */}
            <div className="absolute inset-0 w-full h-full">
                <ShimmerImage
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover image-hover-zoom"
                    errorIconSize={24}
                    showShimmerOnError={false}
                    showShimmerOnEmpty={false}
                />
                {product.imageUrl && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent mix-blend-multiply"></div>
                )}
            </div>

            {/* Discount */}
            {product.discount > 0 && (
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

    return (
        <MiniItemSlider
            title={title}
            items={actualProducts}
            renderItem={renderProduct}
            isLoading={isLoading}
            error={error}
            skeletonClass="w-32 h-40"
        />
    );
}
