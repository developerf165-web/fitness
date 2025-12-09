import React from 'react';
import ScrollButton from '../../../components/common/ScrollButton';
import useHorizontalScroll from '../../../hooks/useHorizontalScroll';
import Cards from '@components/Cards/ItemCard';

export default function MiniServiceSlider({ title, services, items, onServiceClick, onItemClick }) {
    // 🎯 Истифодаи custom hook бо вобастагӣ ба services
    const actualServices = items || services;
    const actualOnClick = onItemClick || onServiceClick;

    const { scrollRef, showLeftScroll, showRightScroll, scrollMenu, checkScroll } = useHorizontalScroll({
        scrollAmount: 200,
        dependencies: [actualServices]
    });

    // Handler барои клик
    const handleClick = (service) => {
        if (actualOnClick) {
            actualOnClick({ ...service, name: service.title || service.name });
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

                {/* Контейнери scroll танҳо барои услуги */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="overflow-x-auto scrollbar-hide scroll-smooth pl-2.5 pr-8"
                >
                    {/* Рӯйхати услуги */}
                    <div className="flex gap-3">
                        {actualServices.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => handleClick(service)}
                                className="shrink-0 w-48"
                            >
                                <Cards
                                    item={service}
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
