import React from "react";
import ShimmerBlock from "/src/components/ui/ShimmerBlock";

export default function ClientProfileSkeleton() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="spacer">
        <span>‹</span>
      </div>

      {/* Скелети ProfileCard */}
      <section className="profile-card">
        <div className="profile-card-container">
          <div className="profile-info">
            <ShimmerBlock className="h-20 w-20 rounded-full" />
            <div className="flex flex-col gap-2">
              <ShimmerBlock className="h-7 w-48" />
              <ShimmerBlock className="h-5 w-32" />
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat-item flex flex-col items-center gap-1">
              <ShimmerBlock className="h-4 w-12" />
              <ShimmerBlock className="h-6 w-8" />
            </div>
            <div className="stat-item flex flex-col items-center gap-1">
              <ShimmerBlock className="h-4 w-12" />
              <ShimmerBlock className="h-6 w-8" />
            </div>
            <div className="stat-item flex flex-col items-center gap-1">
              <ShimmerBlock className="h-4 w-12" />
              <ShimmerBlock className="h-6 w-8" />
            </div>
          </div>
        </div>
        <ShimmerBlock className="h-8 w-8 rounded-full" />
      </section>

      {/* Скелети StatsGrid */}
      <section className="stats-grid">
        <ShimmerBlock className="h-24 rounded-lg" />
        <ShimmerBlock className="h-24 rounded-lg" />
        <ShimmerBlock className="h-24 rounded-lg" />
        <ShimmerBlock className="h-24 rounded-lg" />
        <ShimmerBlock className="h-24 rounded-lg" />
      </section>

      {/* Скелети Trainings (ва Cards) */}
      <section className="trainings">
        {/* Сарлавҳаи "Карты" */}
        <ShimmerBlock className="h-8 w-32 mt-[70px] mb-[15px]" />

        {/* Скелети MembershipCards */}
        <div className="cards-container">
          <ShimmerBlock className="h-[200px] w-full rounded-2xl" />
          <ShimmerBlock className="h-[200px] w-full rounded-2xl" />
        </div>

        {/* Скелети қисмҳои дигар (масалан Calendar ё TrainingsList) */}
        <ShimmerBlock className="h-40 w-full mt-8 rounded-lg" />
      </section>
    </div>
  );
}