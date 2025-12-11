import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * A reusable image component with:
 * - Skeleton Shimmer loading state
 * - Robust error handling (empty URL or load error)
 * - Fallback UI with ImageOff icon
 */
export default function ShimmerImage({
    src,
    alt,
    className = "",
    containerClassName = "",
    errorIconSize = 24,
    showShimmerOnError = false, // Keep shimmer animation if error occurs (network error)
    showShimmerOnEmpty = false, // Keep shimmer if src is missing (empty/null)
    fallback = null,            // Custom fallback content
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Reset state when src changes
    useEffect(() => {
        setLoading(true);
        setError(false);
    }, [src]);

    // Validate URL
    const hasSrc = src && typeof src === 'string' && src.trim() !== "";

    // If we have no source, it's an "error" state immediately
    const isError = !hasSrc || error;

    // Default Fallback (The original Icon behavior) if no custom fallback provided
    const DefaultFallback = (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-800/50 z-10">
            <ImageOff size={errorIconSize} className="opacity-80 mb-2 text-zinc-400" />
            <span className="text-[10px] opacity-80 text-zinc-400">Нет фото</span>
        </div>
    );

    const contentFallback = fallback !== null ? fallback : DefaultFallback;

    // Determine if we should show shimmer instead of fallback
    // 1. Error state (load error) AND showShimmerOnError is true
    // 2. Empty state (no src) AND showShimmerOnEmpty is true
    const shouldShowShimmer = (error && showShimmerOnError) || (!hasSrc && showShimmerOnEmpty);

    return (
        <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>

            {/* Valid Image */}
            {hasSrc && !error && (
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'} ${className}`}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setLoading(false);
                        setError(true);
                    }}
                />
            )}

            {/* Error/Empty State handling */}
            {isError && (
                <>
                    {shouldShowShimmer ? (
                        <div className="absolute inset-0 skeleton-shimmer z-20"></div>
                    ) : (
                        contentFallback
                    )}
                </>
            )}

            {/* Loading Shimmer (Only when loading and not errored yet) */}
            {loading && !isError && (
                <div className="absolute inset-0 skeleton-shimmer z-20"></div>
            )}
        </div>
    );
}
