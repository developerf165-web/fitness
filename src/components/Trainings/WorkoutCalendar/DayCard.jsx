import React from "react";
import "/src/styles/WorkoutCalendar.css";

export default function DayCard({ day, dayName, active, onClick, hasDot }) {
  return (
    <div className={`day-card ${active ? "active" : ""}`} onClick={onClick}>
      {hasDot && <div className="day-dot"></div>}
      <span className="day-name">{dayName}</span>
      <span className="day-number">{day}</span>
    </div>
  );
}
