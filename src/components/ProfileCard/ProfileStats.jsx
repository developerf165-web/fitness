import React from "react";

export default function ProfileStats() {
  return (
    <div className="profile-stats">
      <div className="stat-item">
        <span>Возраст</span>
        <span>25</span>
        <span></span>
      </div>
      <div className="stat-item">
        <span>Рост</span>
        <span>170</span>
        <span></span>
      </div>
      <div className="stat-item">
        <span>Вес</span>
        <span className="empty">—</span>
        <span></span>
      </div>
    </div>
  );
} 