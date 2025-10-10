import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import DaysNavigation from "./DaysNavigation";
import { months, daysOfWeek, getDaysInMonth } from "./utils";
import "/src/styles/WorkoutCalendar.css";

export default function WorkoutCalendar() {
  const year = new Date().getFullYear();
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [activeDay, setActiveDay] = useState(new Date().getDate());

  const daysInMonth = getDaysInMonth(monthIndex, year);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    setMonthIndex(prev => (prev === 0 ? 11 : prev - 1));
    setActiveDay(1);
  };

  const nextMonth = () => {
    setMonthIndex(prev => (prev === 11 ? 0 : prev + 1));
    setActiveDay(1);
  };
 
  return (
    <div className="calendar-container">
      <CalendarHeader 
        monthName={months[monthIndex]} 
        prevMonth={prevMonth} 
        nextMonth={nextMonth} 
      />
      <DaysNavigation 
        days={days} 
        activeDay={activeDay} 
        setActiveDay={setActiveDay} 
        daysOfWeek={daysOfWeek} 
      />
    </div>
  );
} 
