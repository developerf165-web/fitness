import React, { useRef } from "react";
import DayCard from "./DayCard";
import "/src/styles/WorkoutCalendar.css";

export default function DaysNavigation({ days, activeDay, setActiveDay, daysOfWeek }) {
  const scrollRef = useRef(null);

  // Навигатсияи кнопкаҳо бо adaptive scroll
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth * 0.6, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <div className="days-navigation">
      <button className="days-arrow" onClick={scrollLeft}>‹</button>

      <div className="days-row" ref={scrollRef}>
        {days.map((day, idx) => {
          const hasDot = day % 2 === 1;
          return (
            <DayCard
              key={day}
              day={day}
              dayName={daysOfWeek[idx % daysOfWeek.length]}
              active={day === activeDay}
              onClick={() => setActiveDay(day)}
              hasDot={hasDot}
            />
          );
        })}
      </div>

      <button className="days-arrow" onClick={scrollRight}>›</button>
    </div>
  );
} 
