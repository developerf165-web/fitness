import React from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function ClubHeader({ clubInfo, onEditInfo }) {
  return (
    <div className="mb-6 color-bg-card p-6 rounded-2xl">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <img
            src="/images/fitness-logo.png"
            alt="Fitness Logo"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{clubInfo.activity}</h2>
            <p className="text-sm color-accent font-medium">Фитнес клуб</p>
          </div>
        </div>

        <button
          onClick={onEditInfo}
          className="p-2 rounded-full bg-hover-card cursor-pointer hover:bg-opacity-70"
        >
          <FaPencilAlt />
        </button>
      </div>

      <p className="text-sm text-gray-300">{clubInfo.description}</p>
    </div>
  );
}
