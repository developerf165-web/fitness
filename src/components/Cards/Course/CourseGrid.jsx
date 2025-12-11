import React from 'react';
import CourseCard from './CourseCard';
import CourseCardSkeleton from './CourseCardSkeleton';

export default function CourseGrid({ items, isLoading, error, onStart, onCancel, variant = 'launch' }) {

    if (isLoading || error) {
        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((key) => (
                        <CourseCardSkeleton key={key} />
                    ))}
                </div>
                {error && (
                    <div className="text-center py-6 text-red-500 mt-4">
                        Ошибка при загрузке курсов: {error}
                    </div>
                )}
            </>
        );
    }

    if (!items || items.length === 0) {
        return <div className="text-gray-500 py-6">Курсов пока нет</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <CourseCard
                    key={item.id}
                    item={item}
                    onStart={onStart}
                    onCancel={onCancel}
                    variant={variant}
                />
            ))}
        </div>
    );
}
