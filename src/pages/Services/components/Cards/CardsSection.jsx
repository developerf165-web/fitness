import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../../../../components/Cards/ItemCard';
import CardSkeleton from '../../../../components/Cards/CardSkeleton'; // <-- 1. Скелетонро import мекунем

const CardsSection = React.memo(({
  items,
  onEdit,
  onDelete,
  isLoading, // <-- 2. 'isLoading'-ро ҳамчун prop қабул мекунем
  error,
  skeletonCount = 8, // Шумораи скелетонҳое, ки нишон дода мешаванд
  emptyMessage = "На данный момент услуги не найдены..."
}) => {
  const hasItems = items && items.length > 0;

  const renderContent = () => {
    // 3. Агар 'isLoading' true бошад, скелетонҳоро нишон медиҳем
    // Агар 'isLoading' true бошад ё хатогӣ бошад, скелетонҳоро нишон медиҳем
    if (isLoading || error) {
      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* Массив месозем, то 'skeletonCount' миқдор скелетонро render кунем */}
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
          {/* Агар хатогӣ бошад, дар поён нишон медиҳем */}
          {error && (
            <div className="text-center py-6 text-red-500 mt-4">
              Ошибка при загрузке услуг: {error}
            </div>
          )}
        </>
      );
    }

    // 4. Агар 'isLoading' false бошад ва itemҳо набошанд
    if (!hasItems) {
      return (
        <div className="text-gray-400 text-center py-10">
          <p>{emptyMessage}</p>
        </div>
      );
    }

    // 5. Агар 'isLoading' false бошад ва itemҳо бошанд
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map(item => (
          <ItemCard
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

CardsSection.propTypes = {
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired, // <-- 6. 'isLoading'-ро ба propTypes илова мекунем
  error: PropTypes.string,
  skeletonCount: PropTypes.number,
  emptyMessage: PropTypes.string,
};

export default CardsSection;