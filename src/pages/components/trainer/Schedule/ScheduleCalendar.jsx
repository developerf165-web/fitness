import React from 'react';
import { useSchedule } from '../../../../hooks/useSchedule';
import ScheduleHeader from './ScheduleHeader';
import WeekDays from './WeekDays';
import TimeGrid from './TimeGrid';
import Loader from './Loader';
import EventModal from './EventModal';

import './Schedule.css';

const TIME_COLUMN_WIDTH = '40px'; 

const ScheduleCalendar = () => {
  // Тамоми мантиқ, ҳолатҳо ва функсияҳо аз ин як сатр меоянд!
  const {
    scheduleData,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
    selectedDay,
    isModalOpen,
    selectedEvent,
    handlePrevWeek,
    handleNextWeek,
    handleDayClick,
    handleEventClick,
    handleCloseModal
  } = useSchedule();

  if (isLoading) return <Loader />;
  
  if (isError) return (
    <div className="text-red-500 text-center p-8">
      Хатогӣ: {error.message}
      <button onClick={() => refetch()} className="ml-4 px-2 py-1 bg-blue-500 rounded">Такрор кардан</button>
    </div>
  );
  
  if (!scheduleData) return <div className="text-center p-8">Маълумот ёфт нашуд.</div>;
  
  const { currentMonth, currentWeek, timeSlots, events } = scheduleData;

  return (
    <>
      <div className="relative w-full mx-auto color-bg-card p-4 md:p-6 rounded-xl shadow-2xl text-white">
        
        {isFetching && (
          <div className="absolute inset-0 color-bg-card bg-opacity-60 flex items-center justify-center z-10 rounded-xl">
            <div className="text-white text-lg">Загрузка...</div> 
          </div>
        )}
        
        <ScheduleHeader 
          month={currentMonth} 
          onPrev={handlePrevWeek}
          onNext={handleNextWeek}
        />

        <div 
          className="grid relative"
          style={{ gridTemplateColumns: `${TIME_COLUMN_WIDTH} repeat(${currentWeek.length}, 1fr)` }}
        >
          <div className="col-span-1"></div>
          <WeekDays 
            week={currentWeek}
            selectedDay={selectedDay}
            onDayClick={handleDayClick}
          />
          <TimeGrid 
            week={currentWeek} 
            timeSlots={timeSlots} 
            events={events}
            onEventClick={handleEventClick}
          />
        </div>
      </div>
      
      {/* {isModalOpen && <EventModal event={selectedEvent} onClose={handleCloseModal} />} */}
    </>
  );
};

export default ScheduleCalendar;