import React from 'react';
import ScrollButton from '../../../components/common/ScrollButton';
import useHorizontalScroll from '../../../hooks/useHorizontalScroll';
import Cards from '@components/Cards/ItemCard';

export default function MiniCourseSlider({ title, courses, items, onCourseClick, onItemClick }) {
    // 🎯 Истифодаи custom hook бо вобастагӣ ба courses
    const actualCourses = items || courses;
    const actualOnClick = onItemClick || onCourseClick;

    const { scrollRef, showLeftScroll, showRightScroll, scrollMenu, checkScroll } = useHorizontalScroll({
        scrollAmount: 250,
        dependencies: [actualCourses]
    });

    // Handler барои клик
    const handleClick = (course) => {
        if (actualOnClick) {
            actualOnClick({ ...course, name: course.title || course.name });
        }
    };

    return (
        <div className="mb-6">
            {/* Сарлавҳа бо ранги accent ва андозаи хурд */}
            <h3 className="text-sm font-medium color-accent mb-3 px-2.5">{title}</h3>

            {/* Слайдер */}
            <div className="relative">
                {/* Тугмаи чап - дар миёнаи cards */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                    <ScrollButton
                        direction="left"
                        onClick={() => scrollMenu('left')}
                        isVisible={showLeftScroll}
                    />
                </div>

                {/* Контейнери scroll танҳо барои курсҳо */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="overflow-x-auto scrollbar-hide scroll-smooth pl-2.5 pr-8"
                >
                    {/* Рӯйхати курсҳо */}
                    <div className="flex gap-3">
                        {actualCourses.map((course) => (
                            <div
                                key={course.id}
                                onClick={() => handleClick(course)}
                                className="shrink-0 w-48"
                            >
                                <Cards
                                    item={course}
                                    onEdit={() => { }}
                                    onDelete={() => { }}
                                    isMini={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Тугмаи рост - дар миёнаи cards */}
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
