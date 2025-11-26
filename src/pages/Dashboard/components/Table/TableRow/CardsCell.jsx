import React from "react";

export default function CardsCell({ user }) {
  const cards = user.card || [];
  
  if (!cards || cards.length === 0) {
    return (
      <td className="p-3 text-center">
        —
      </td>
    );
  }

  const firstCardName = cards[0].name;

  return (
    <td className="p-3">
      <div className="flex flex-col items-center justify-center">
        <span className="block text-center">
          {firstCardName}
        </span>
      </div>
    </td>
  );
}