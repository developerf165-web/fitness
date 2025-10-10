import React, { useState } from "react";

export default function ServiceTabs() {
  const [active, setActive] = useState("Услуги");

  return (
    <div className="flex color-bg-mini-card rounded-lg p-0 mx-4 mb-6">
      {["Услуги", "Курсы"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
            active === tab
              ? "bg-active-card text-black"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
