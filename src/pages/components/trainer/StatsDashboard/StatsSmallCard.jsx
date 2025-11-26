import React from "react";

export default function StatsSmallCard({ title, value, color }) {
  const match = value.match(/^([\d.,]+)\s*(.*)$/);
  const numberPart = match ? match[1] : value;
  const textPart = match && match[2] ? match[2] : "";

  return (
    <div className="color-bg-card p-4 rounded-xl shadow-lg h-32 flex flex-col relative">
      <span className="text-white text-md">{title}</span>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-end gap-1">
          <p
            className={`text-5xl font-extrabold ${
              color === "yellow" ? "color-accent" : "color-accent"
            }`}
          >
            {numberPart}
          </p>
          {textPart && (
            <p className="text-xs color-accent font-medium mb-1">{textPart}</p>
          )}
        </div>
      </div>
    </div>
  );
}
