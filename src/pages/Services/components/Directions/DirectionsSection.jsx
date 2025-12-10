import React from 'react';
import DirectionCard from './DirectionCard';
import DirectionCardSkeleton from './DirectionCardSkeleton';

export default function DirectionsSection({ items, onEdit, onDelete, isLoading, error }) {

  // Агар loading бошад ё хатогӣ бошад - скелетонҳоро нишон медиҳем
  if (isLoading || error) {
    return (
      <section className="w-full mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <DirectionCardSkeleton key={index} />
          ))}
        </div>
        {/* Агар хатогӣ бошад, дар поён нишон медиҳем */}
        {error && (
          <div className="text-center py-6 text-red-500 mt-4">
            Ошибка при загрузке направлений: {error}
          </div>
        )}
      </section>
    );
  }

  // Санҷиш барои холии рӯйхат
  if (!items || items.length === 0) {
    return <div className="text-gray-500 text-center py-8">Направления пока не созданы</div>;
  }

  return (
    <section className="w-full mb-12">
      {/* Grid: Дар телефон 1, планшет 2 ва дар экранҳои калон 4 сутун */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <DirectionCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}