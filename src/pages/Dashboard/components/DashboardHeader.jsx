import React from "react";

export default function DashboardHeader({ onAdd, pageName }) {
  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-medium text-3xl">{pageName}</h1>
        <button
          onClick={onAdd}
          className="w-35 h-12 cursor-pointer rounded-[15px] text-black font-medium color-bg-accent"
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
