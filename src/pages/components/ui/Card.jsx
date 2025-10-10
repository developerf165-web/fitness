import React from "react";

export default function Card({ title, children, className }) {
  return (
    <div className={`color-bg-nav text-white p-6 rounded-2xl shadow-2xl w-[400px] ${className}`}>
      {title && <h2 className="text-lg font-bold text-center mb-3">{title}</h2>}
      {children}
    </div>
  );
}