import React from "react";
import "/src/styles/WorkoutCalendar.css";

export default function CalendarHeader({ monthName, prevMonth, nextMonth }) {
  return (
    <div className="calendar-header">
      <div className="title">
        <p>Тренировки</p>
        <span>Урок 5</span>
      </div>
      <div className="lesson">
        <div className="month-switch">
          <span className="arrow" onClick={prevMonth}>‹</span>
          <span className="month">{monthName}</span>
          <span className="arrow" onClick={nextMonth}>›</span>
        </div>
      </div>
    </div>
  );
} 
 