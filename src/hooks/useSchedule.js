import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getScheduleData } from '/src/services/scheduleService';

const getISODateString = (date) => date.toISOString().slice(0, 10);

export const useSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(getISODateString(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { 
    data: scheduleData,
    isLoading,
    isError,
    isFetching,
    error,
    refetch
  } = useQuery({
    queryKey: ['schedule', getISODateString(currentDate)],
    queryFn: () => getScheduleData(currentDate).then(res => res.data),
    keepPreviousData: true,
  });

  const handlePrevWeek = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  }, []);

  const handleDayClick = useCallback((day) => {
    setSelectedDay(day.dateISO);
  }, []);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  return {
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
  };
};