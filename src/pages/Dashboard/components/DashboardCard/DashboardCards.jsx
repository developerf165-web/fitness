import React from "react";
import DashboardCard from "./DashboardCard";
import { useStatistics } from "@/Dashboard/hooks/useStatistics";
import DashboardCardSkeleton from "./DashboardCardSkeleton"; // <-- 1. Скелетонро import мекунем

export default function DashboardCards() {
  const { data: cardData, isLoading, error } = useStatistics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <DashboardCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <DashboardCardSkeleton key={index} />
          ))}
        </div>
        <div className="text-center p-6 text-red-600 font-bold">Ошибка: {error}</div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <DashboardCard
          key={index}
          title={card.title}
          value={card.amount}
          change={card.percent}
          description="от предыдущего периода"
        />
      ))}
    </div>
  );
}