// StatsGrid.jsx
import React from "react";
import "/src/styles/StatsGrid.css";

export default function StatsGrid() {
  const stats = [
    { title: "Курсы групповые", value: <>Кардио<br />нагрузки</> },
    { title: "Абонемент", value: "12" },
    { title: "Танцы", value: "18" },
    { title: "Массаж", value: "15" },
    { title: "Массаж", value: "15" },
  ];

  return (
    <section className="stats-grid">
      {stats.map((s, i) => (
        <div 
          key={s.title} 
          className={`stat-card ${i === 0 ? "stat-card--first" : ""}`}
        >
          <p>{s.title}</p>
          {s.value && <h1>{s.value}</h1>}
        </div>
      ))}
    </section>
  );
}
