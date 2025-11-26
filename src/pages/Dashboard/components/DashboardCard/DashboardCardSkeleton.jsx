// Файл: src/components/Dashboard/DashboardCardSkeleton.js
import React from "react";

export default function DashboardCardSkeleton() {
  return (
    // Мо сохтори асосӣ ва рангҳои 'DashboardCard'-ро нигоҳ медорем
    <div className="color-bg-nav p-3 rounded-2xl shadow-md">
      
      {/* Placeholder (ҷойнишин) барои Title */}
      <div className="animate-pulse color-bg-mini-card h-5 w-3/4 rounded-md mb-2"></div>
      
      {/* Placeholder (ҷойнишин) барои Value (рақами калон) */}
      <div className="animate-pulse color-bg-mini-card h-10 w-1/2 rounded-md mb-4"></div>

      <div className="flex flex-row space-x-2 items-center">
        
        {/* Placeholder (ҷойнишин) барои Change Pill (фоиз) */}
        <div className="animate-pulse color-bg-mini-card h-5 w-16 rounded-xl"></div>
        
        {/* Placeholder (ҷойнишин) барои Description */}
        <div className="animate-pulse color-bg-mini-card h-4 w-1/3 rounded-md"></div>
      
      </div>
    </div>
  );
}