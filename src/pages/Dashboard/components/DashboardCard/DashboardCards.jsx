import React from "react";
import DashboardCard from "./DashboardCard";
import { CardData } from "/src/pages/Dashboard/data/CardData.js";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {CardData.map((card, index) => (
        <DashboardCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          description={card.description}
        />
      ))}
    </div>
  );
}
