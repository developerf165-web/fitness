import React from 'react';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        {event.type === 'course' ? (
          <div>
            <h2 className="text-2xl font-bold mb-2 color-accent">{event.details.title}</h2>
            <p className="text-lg mb-4">Тренер: {event.details.trainer}</p>
            <p>Время: {event.time}</p>
            <p>Количество участников: {event.details.count}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-2">Индивидуальная тренировка</h2>
            <p>Время: {event.time}</p>
            <p>Детали недоступны.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;