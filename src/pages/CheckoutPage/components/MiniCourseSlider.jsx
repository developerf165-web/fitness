import React from 'react';
import Cards from '@components/Cards/ItemCard';
import MiniItemSlider from './MiniItemSlider';

export default function MiniCourseSlider({ title, courses, items, onCourseClick, onItemClick, isLoading, error }) {
    const actualCourses = items || courses;
    const actualOnClick = onItemClick || onCourseClick;

    const handleClick = (course) => {
        if (actualOnClick) {
            actualOnClick({ ...course, name: course.title || course.name });
        }
    };

    const renderCourse = (course) => {
        const modifiedCourse = {
            ...course,
            type: 'simple',
            hideUnit: true,
            price: course.oldPrice || course.price,
            tjs: course.oldPrice || course.price
        };

        return (
            <div
                key={course.id}
                onClick={() => handleClick(modifiedCourse)}
                className="shrink-0 w-48 relative"
            >
                <Cards
                    item={modifiedCourse}
                    onEdit={() => { }}
                    onDelete={() => { }}
                    isMini={true}
                />

                {/* Discount Badge (Top Right) */}
                {course.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-20 shadow-md">
                        -{course.discount}%
                    </div>
                )}
            </div>
        );
    };

    return (
        <MiniItemSlider
            title={title}
            items={actualCourses}
            renderItem={renderCourse}
            scrollAmount={250}
            isLoading={isLoading}
            error={error}
            skeletonClass="w-48 aspect-[16/9]"
        />
    );
}
