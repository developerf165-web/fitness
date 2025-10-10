import React from "react";
import "/src/styles/CaloriesCircle.css";

export default function WorkoutCalendar() {
  const bigCircleValue = 652;
  const smallCirclesData = [
    { label: "Белки", value: 60, unit: "г" },
    { label: "Жиры", value: 45, unit: "г" },
    { label: "Углеводы", value: 120, unit: "г" },
  ]; 

  const startColor = "#ff4500";
  const endColor = "#b5ff00";

  return (
    <div className="circle-container">
      <div className="circle-section">

        <div className="big-circle">
          <svg viewBox="0 0 100 100">
            <defs>
              <linearGradient id="gradBig" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" className="circle-bg" />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="circle-progress"
              strokeDasharray="282"
              strokeDashoffset={282 - (bigCircleValue / 1000) * 282}
              stroke="url(#gradBig)"
            />

            <text x="95" y="55" textAnchor="middle" fill="black" fontSize="14">
              ↓
            </text>
          </svg>

          <div className="circle-text">
            <p className="value">{bigCircleValue}</p>
            <p className="label">ккал</p>
          </div>
        </div>

        <div className="small-circles">
          {smallCirclesData.map((item, idx) => (
            <div key={idx} className="small-circle">
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient
                    id={`gradSmall${idx}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor={startColor} />
                    <stop offset="100%" stopColor={endColor} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" className="circle-bg" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="circle-progress-small"
                  strokeDasharray="282"
                  strokeDashoffset={282 - (item.value / 200) * 282}
                  stroke={`url(#gradSmall${idx})`}
                />

                <text
                  x="95"
                  y="55"
                  textAnchor="middle"
                  fill="black"
                  fontSize="10"
                >
                  ↓
                </text>
              </svg>
              <div className="small-circle-text">
                <p className="small-label">{item.label}</p>
                <p className="small-value">{item.value}{item.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
