import React from 'react';
import PropTypes from 'prop-types'; 
import NewsCard from './NewsCard';
import CreateNewsCard from './CreateNewsCard';

const NewsSection = React.memo(({
  title,
  items,
  showCreateCard = false,
  onCreate,
  onAction, 
  emptyMessage = "Нет новости..."
}) => {
  const hasItems = items.length > 0;

  return (
    <section className="w-full mb-12">
      <h2 className="text-3xl font-medium mb-5 text-white">{title}</h2>

      {!hasItems && !showCreateCard && (
        <div className="text-gray-400 text-center py-10">
          <p>{emptyMessage}</p>
        </div>
      )}

      {(hasItems || showCreateCard) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map(item => (
            <NewsCard
              key={item.id}
              item={item}
              onAction={onAction}
            />
          ))}
          {showCreateCard && <CreateNewsCard onClick={onCreate} />}
        </div>
      )}
    </section>
  );
});

NewsSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  showCreateCard: PropTypes.bool,
  onCreate: PropTypes.func,
  onAction: PropTypes.func,
  emptyMessage: PropTypes.string,
};

export default NewsSection;