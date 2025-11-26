import React from "react";

export default function ShimmerBlock({ className }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-md
        bg-gray-700/50 
        ${className} 
      `}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
    </div>
  );
}