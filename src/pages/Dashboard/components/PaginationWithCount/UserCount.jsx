import React from "react";

export default function UserCount({ total, isBlockedPage }) {
  return (
    <div className="text-gray-300 text-xl">
      Общее количество пользователей:{" "}
      <span
        className={`font-bold text-xl ${
          isBlockedPage ? "text-red-600" : "color-accent"
        }`}
      >
        {total}
      </span>
    </div>
  );
}
