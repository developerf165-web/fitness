import React from "react";
import "/src/styles/InfoCard.css";
 
export default function InfoCard({
  icon,
  title,
  subtitle,
  price,
  discount,
  total,
  bonus,
  date_start,
  date_end,
  extra,
  type,
  index, 
}) {
  const isSecondExtra = index === 1; 
  return (
    <div className="flex flex-col justify-between w-full h-auto color-bg-nav rounded-2xl p-6 text-[var(--color-text-main)]">
      <div className="flex flex-row items-center gap-4 ">
        {icon && <div className="icon">{icon}</div>}
        <div className="flex flex-row font-semibold text-2xl">
          <p >{title}</p>
          {subtitle && <p className="pl-8">{subtitle}</p>}
        </div> 
      </div>

      <div className="flex justify-between items-end font-4 pt-14 gap-2">
        <div className={extra ? "hidden" : "grid grid-cols-2 gap-2"}>
          <p>Цена: {price && <span>{price}</span>}</p>
          <p>Скидка: {discount && <span className="color-accent pl-1">{discount}</span>}</p>
          <p>Итого: {total && <span>{total}</span>}</p>
          <p>
            Бонусы:{" "}
            {bonus && (
              <span className={String(bonus).startsWith("-") ? "red pl-1" : "color-accent pl-1"}>
                {bonus}
              </span>
            )}
          </p>
        </div>
        {extra && (
          <div className={`color-accent font-medium max-w-[50%] ${index === 5 ? "text-[var(--color-text-muted)]" : ""}`}>
            {extra}
          </div>
        )}

        <div className="flex flex-col max-w-[50%] text-sm font-normal text-[var(--color-text-muted)]">
          {date_start && <div>{date_start}</div>}
          {date_end && <div>{date_end}</div>}
        </div>
      </div>
    </div>
  );
}
