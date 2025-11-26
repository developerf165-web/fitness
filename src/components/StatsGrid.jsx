import React from "react";
import "/src/styles/StatsGrid.css";

export default function StatsGrid({ enrollServices }) {
  const stats = enrollServices.map((service) => ({
    title: service.service.name,
    value: service.count,
  }));

  return (
    <section className="stats-grid">
      {stats.map((s) => (
        <div
          key={s.title}
          className={`stat-card ${
            typeof s.value === "number" ? "stat-card--first" : ""
          }`}
        >
          <p>{s.title}</p>
          {s.value && <h1>{s.value}</h1>}
        </div>
      ))}
    </section>
  );
}