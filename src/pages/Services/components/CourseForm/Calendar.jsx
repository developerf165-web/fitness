import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const WEEK_DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const DATE_OPTIONS = { month: 'long', year: 'numeric' };

export default function Calendar({ selectedFullDate, onDateSelect, scheduleType }) {
  // currentDate моҳ ва солро барои намоиш идора мекунад
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDayDetails = (date) => {
    // getDay() 0=Якшанбе, 1=Душанбе ... 6=Шанбе
    // Мо ба 0=Душанбе, 6=Якшанбе табдил медиҳем
    let dayIndex = date.getDay() - 1;
    if (dayIndex === -1) dayIndex = 6; // Якшанбе (0) ба 6 табдил дода мешавад

    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    const isToday = date.toDateString() === new Date().toDateString();

    let isActiveScheduleDay = false;
    if (isCurrentMonth) {
      // 0=Пн, 2=Ср, 4=Пт
      const MWF_DAYS = [0, 2, 4];
      // 1=Вт, 3=Чт, 5=Сб
      const TTS_DAYS = [1, 3, 5];

      if (scheduleType === 'MWF' && MWF_DAYS.includes(dayIndex)) {
        isActiveScheduleDay = true;
      } else if (scheduleType === 'TTS' && TTS_DAYS.includes(dayIndex)) {
        isActiveScheduleDay = true;
      }
    }

    const isSelected = selectedFullDate && date.toDateString() === selectedFullDate.toDateString();

    return { date, dayIndex, isCurrentMonth, isSelected, isToday, isActiveScheduleDay };
  };

  const generateMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // 1. Рӯзҳои моҳи ҷорӣ
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // 2. Рӯзҳои пешина (Padding)
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek < 0) startDayOfWeek = 6; // Якшанбе ба 6 табдил дода мешавад (барои дар охири ҳафта будан)

    const prevMonthDays = [];
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = 0; i < startDayOfWeek; i++) {
      const day = new Date(year, month - 1, prevMonthLastDate - startDayOfWeek + i + 1);
      prevMonthDays.push(getDayDetails(day));
    }

    // 3. Рӯзҳои моҳи ҷорӣ
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => {
      const day = new Date(year, month, i + 1);
      return getDayDetails(day);
    });

    const allDays = [...prevMonthDays, ...currentMonthDays];

    // 4. Рӯзҳои оянда (Padding)
    const totalDays = allDays.length;
    const remainingSlots = 42 - totalDays; // Календар 6x7 = 42 рӯзро нишон медиҳад
    
    const nextMonthDays = Array.from({ length: remainingSlots }, (_, i) => {
      const day = new Date(year, month + 1, i + 1);
      return getDayDetails(day);
    });

    return [...allDays, ...nextMonthDays];
  };

  const days = useMemo(() => generateMonthDays(currentDate), [currentDate, scheduleType, selectedFullDate]);

  const changeMonth = (amount) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + amount, 1);
      return newDate;
    });
  };

  const handleDayClick = (day) => {
    if (day.isCurrentMonth) {
      onDateSelect(day.date);
    }
    // Метавонед ин ҷо logic илова кунед, ки моҳро ба моҳи пахшшуда тағйир диҳед, агар он моҳи пешина ё оянда бошад.
  };

  return (
    <div className="color-bg-mini-card rounded-xl p-4 mt-4 select-none">
      {/* Сарлавҳаи Навигатсия */}
      <div className="flex justify-between items-center mb-4 text-white text-sm font-medium">
        <span className="text-lg font-bold">
          {currentDate.toLocaleDateString('ru-RU', DATE_OPTIONS)}
        </span>
        <div className="flex items-center">
          <ChevronLeft size={20} className="color-accent mr-2 cursor-pointer hover:opacity-80" onClick={() => changeMonth(-1)} />
          <ChevronRight size={20} className="color-accent cursor-pointer hover:opacity-80" onClick={() => changeMonth(1)} />
        </div>
      </div>

      {/* Рӯзҳои Ҳафта */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {WEEK_DAYS.map((d) => (
          <div key={d} className="text-zinc-500 text-xs uppercase font-medium">{d}</div>
        ))}
      </div>

      {/* Шабакаи Санаҳо */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center">
        {days.map((day, index) => {
          const { date, isCurrentMonth, isSelected, isToday, isActiveScheduleDay } = day;
          
          // Танҳо санаҳои моҳи ҷорӣ клик карда мешаванд
          const isClickable = isCurrentMonth;

          // Мавқеи ранги рӯз
          const dayClasses = `
            text-sm w-8 h-8 flex items-center justify-center rounded-full transition-all
            ${isClickable ? 'cursor-pointer' : 'opacity-40 pointer-events-none'}
            
            ${isToday && !isSelected ? 'border color-border-accent' : ''}

            ${isSelected 
              ? 'color-bg-accent text-black font-bold' 
              : ''}
            
            ${!isSelected && isActiveScheduleDay && isCurrentMonth
              ? 'bg-[#3f4035] color-accent' 
              : ''}
              
            ${!isSelected && !isActiveScheduleDay && isCurrentMonth
              ? 'text-white bg-hover-card' 
              : ''}
              
            ${!isCurrentMonth ? 'text-zinc-400' : ''}
          `;

          return (
            <div key={index} className="flex justify-center items-center h-8">
              <span
                className={dayClasses}
                onClick={() => isClickable && handleDayClick(day)}
              >
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}