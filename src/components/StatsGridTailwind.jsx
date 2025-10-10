import React from "react";

export default function StatsGrid() {
  const stats = [
    { title: "Курсы групповые", value: <>Кардио<br />нагрузки</> },
    { title: "Абонемент", value: "12" },
    { title: "Танс", value: "18" },
    { title: "Массаж", value: "15" },
    { title: "Сауна", value: "8" },
  ];

  return (
    <section className="grid grid-cols-6 gap-4 md:gap-6 mt-6 w-full">
      {stats.map((s, i) => {
        const isFeatured = i === 0;

        const cardLayoutClasses = isFeatured ? "justify-start items-start h-28 p-2" : "justify-center items-center h-28 p-4";

        const valueDisplayClasses = isFeatured ? "text-sm text-left pl-2 mt-8 sm:text-md md:text-lg lg:text-2xl" : "text-lg text-center mt-8 sm:text-5xl";

        const baseCardClasses = `
          flex flex-col min-w-0 rounded-2xl color-bg-nav text-white relative overflow-hidden
          ${isFeatured ? "justify-start items-start h-28 p-2" : "justify-center items-center h-28 p-4"}
        `;

        const titleClasses = `
          absolute top-3 left-4 font-normal text-[var(--color-text-main)]
          ${isFeatured 
            ? "text-xs sm:text-base md:text-sm lg:text-md " // калонтар мешавад бо responsive
            : "text-xs sm:text-sm md:text-base"}
        `;

        const baseValueClasses = `
          font-bold color-accent mt-8
          ${isFeatured 
            ? "pl-2 text-base sm:text-lg md:text-xl lg:text-2xl" // барои card-и якум
            : "text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center"} // барои дигарон
        `;

        return (
          <div 
            key={i} 
            className={`${baseCardClasses} ${cardLayoutClasses}`}
          >
            <p className={titleClasses}>
              {s.title}
            </p>
            
            {s.value && (
              <h1 
                className={`${baseValueClasses} ${valueDisplayClasses}`}
              >
                {s.value}
              </h1>
            )}
          </div>
        );
      })}
    </section>
  );
}