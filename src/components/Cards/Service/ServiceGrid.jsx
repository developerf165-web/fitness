import React from 'react';
import PropTypes from 'prop-types';
import ServiceCard from './ServiceCard';
import ServiceCardSkeleton from './ServiceCardSkeleton';

const ServiceGrid = React.memo(({
    items,
    onEdit,
    onDelete,
    isLoading,
    error,
    skeletonCount = 8,
    emptyMessage = "На данный момент услуги не найдены..."
}) => {
    const hasItems = items && items.length > 0;

    const renderContent = () => {
        if (isLoading || error) {
            return (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Array.from({ length: skeletonCount }).map((_, index) => (
                            <ServiceCardSkeleton key={index} />
                        ))}
                    </div>
                    {error && (
                        <div className="text-center py-6 text-red-500 mt-4">
                            Ошибка при загрузке услуг: {error}
                        </div>
                    )}
                </>
            );
        }

        if (!hasItems) {
            return (
                <div className="text-gray-400 text-center py-10">
                    <p>{emptyMessage}</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map(item => (
                    <ServiceCard
                        key={item.id}
                        item={item}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className="w-full mb-12">
            {renderContent()}
        </section>
    );
});

ServiceGrid.propTypes = {
    items: PropTypes.array,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    skeletonCount: PropTypes.number,
    emptyMessage: PropTypes.string,
};

export default ServiceGrid;
