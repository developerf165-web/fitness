import React from "react";

export default function ProfileStats({ age, height, weight }) {
  // Мо тафтиш мекунем, ки оё арзиш "falsy" аст (null, undefined, 0, "")
  const isAgeEmpty = !age;
  const isHeightEmpty = !height;
  const isWeightEmpty = !weight;

  return (
    <div className="profile-stats">
      {/* Синфи 'empty'-ро ба худи div.stat-item илова мекунем */}
      <div className={`stat-item ${isAgeEmpty ? "empty" : ""}`}>
        <span>Возраст</span>
        <span>{age || "—"}</span>
        <span></span> {/* Ин хати поён аст */}
      </div>

      <div className={`stat-item ${isHeightEmpty ? "empty" : ""}`}>
        <span>Рост</span>
        <span>{height || "—"}</span>
        <span></span> {/* Ин хати поён аст */}
      </div>

      <div className={`stat-item ${isWeightEmpty ? "empty" : ""}`}>
        <span>Вес</span>
        {/* Синфи 'empty' дигар дар ин ҷо лозим нест */}
        <span>{weight || "—"}</span>
        <span></span> {/* Ин хати поён аст */}
      </div>
    </div>
  );
}