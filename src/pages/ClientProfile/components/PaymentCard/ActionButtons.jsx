import React from "react";

export default function ActionButtons() {
  return (
    <div className="flex justify-between">
      <button className="px-4 py-2 bg-[#2a2a2a] rounded-lg text-sm font-semibold text-gray-200 hover:bg-[#3a3a3a]">
        Отмена
      </button>
      <button className="px-4 py-2 bg-lime-500 text-black rounded-lg text-sm font-semibold hover:bg-lime-400">
        Добавить
      </button>
    </div>
  );
}
