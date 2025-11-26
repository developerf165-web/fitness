import React from "react";
import MembershipCard from "./MembershipCard";
import "/src/styles/MembershipCards.css";

export default function MembershipCards({ mainCard, additionalCards, userName }) {
  const normalizeCard = (card, styleType) => ({
    id: card.id,
    type: card.name || (styleType === "bronze" ? "Основная карта" : "Бонусная карта"),
    amount: `${card.balance ?? 0} TJS`,
    name: userName || "Без имени",
    number: card.card_number || "—",
    style: styleType,
  });

  const allCards = [];

  if (mainCard) {
    allCards.push(normalizeCard(mainCard, "bronze"));
  }

  if (Array.isArray(additionalCards)) {
    additionalCards.forEach((card) => allCards.push(normalizeCard(card, "bonus")));
  }

  return (
    <div>
      <p
        style={{
          color: "white",
          fontWeight: "500",
          fontStyle: "SemiBold",
          fontSize: "30px",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        Карты
      </p>

      <div className="cards-container">
        {allCards.length === 0 ? null : (
          allCards.map((card) => (
            <MembershipCard key={card.id} {...card} />
          ))
        )}
      </div>
    </div>
  );
}
