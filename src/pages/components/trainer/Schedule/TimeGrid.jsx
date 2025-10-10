import React, { useMemo } from 'react';
import CourseEvent from './CourseEvent';
import AvatarEvent from './AvatarEvent';

const TimeGrid = ({ week, timeSlots, events, onEventClick }) => {
  // Сохтори Map барои суръат додани ҷустуҷӯи рӯйдодҳо
  const eventsByStart = useMemo(() => {
    const map = new Map();
    if (!events) return map;

    for (const event of events) {
      const key = `${event.day}-${event.startTime}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    }
    return map;
  }, [events]);

  // Map барои индекси вақти slot
  const timeSlotIndexMap = useMemo(() => {
    return new Map(timeSlots.map((time, index) => [time, index]));
  }, [timeSlots]);

  const slotHeight = 40; // Баландии як block вақт

  return (
    <>
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          {/* Вақт дар тарафи чап */}
          <div className="text-xs text-gray-400 pt-0 text-right pr-2">{time}</div>

          {week.map((day) => {
            const key = `${day.day}-${time}`;
            const startingEvents = eventsByStart.get(`${day.dayName}-${time}`) || [];

            return (
              <div key={key} className="relative" style={{ height: `${slotHeight}px` }}>
                {/* Рах бо span */}
                <span
                  className="absolute flex items-center justify-center mt-2 left-0 right-0 bg-gray-700"
                  style={{ height: '1px', display: 'block' }}
                ></span>

                {startingEvents.map((event, index) => {
                  const startIndex = timeSlotIndexMap.get(event.startTime);
                  const endIndex = timeSlotIndexMap.get(event.endTime);
                  const durationInSlots = endIndex > startIndex ? endIndex - startIndex : 1;
                  const eventHeight = durationInSlots * slotHeight;

                  return (
                    <div
                      key={event.id || `${event.title}-${index}`}
                      className="absolute top-0 left-1 right-1 z-10"
                      style={{ height: `${eventHeight - 2}px` }}
                    >
                      {event.type === 'avatar' && (
                        <AvatarEvent event={event} onEventClick={onEventClick} />
                      )}
                      {event.type === 'course' && (
                        <CourseEvent event={event} onEventClick={onEventClick} />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </>
  );
};

export default TimeGrid;
