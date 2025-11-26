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
  const isSecondExtra = index === 1; // Ин тағирёбанда дар коди шумо истифода нашудааст, аммо ман онро ҳамон тавр мондам

  return (
    <div className="flex flex-col justify-between w-full h-auto color-bg-nav rounded-2xl p-6 text-[var(--color-text-main)]">
      {/* === БЛОКИ ТАҒЙИРЁФТАИ САРЛАВҲА === */}
      {/* Акнун title ва subtitle бо 'justify-between' ҷойгир мешаванд, агар subtitle вуҷуд дошта бошад */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* Қисми чап: Иконка + Сарлавҳа */}
        <div className="flex flex-row items-center gap-4">
          {icon && <div className="icon">{icon}</div>}
          <p className="font-semibold text-2xl">{title}</p>
        </div>

        {/* Қисми рост: Зерсарлавҳа (агар вуҷуд дошта бошад) */}
        {subtitle && (
          <p className="font-semibold text-2xl">{subtitle}</p>
        )}
      </div>
      {/* === АНҶОМИ БЛОКИ ТАҒЙИРЁФТА === */}

      <div className="flex justify-between items-end font-4 pt-14 gap-2">
        <div className={extra ? "hidden" : "grid grid-cols-2 gap-2"}>
          <p>Цена: {price && <span>{price}</span>}</p>
          <p>
            Скидка:{" "}
            {discount && <span className="color-accent pl-1">{discount}</span>}
          </p>
          <p>Итого: {total && <span>{total}</span>}</p>

          {/* === БЛОКИ ТАҒЙИРЁФТАИ БОНУСҲО === */}
          {/* Акнун метавонад арзишҳои сершуморро ба монанди "-12 +5" коркард кунад */}
          <p>
            Бонусы:{" "}
            {bonus &&
              (String(bonus).includes(" ") ? (
                // Агар ду арзиш бошад (масалан, "-12 +5")
                String(bonus)
                  .split(" ")
                  .map((b, i) => (
                    <span
                      key={i}
                      className={
                        b.startsWith("-")
                          ? "red pl-1"
                          : "color-accent pl-1"
                      }
                    >
                      {b}
                    </span>
                  ))
              ) : (
                // Агар танҳо як арзиш бошад
                <span
                  className={
                    String(bonus).startsWith("-")
                      ? "red pl-1"
                      : "color-accent pl-1"
                  }
                >
                  {bonus}
                </span>
              ))}
          </p>
          {/* === АНҶОМИ БЛОКИ ТАҒЙИРЁФТА === */}
        </div>
        
        {extra && (
          <div
            className={`color-accent font-medium max-w-[50%] ${
              index === 5 ? "text-[var(--color-text-muted)]" : ""
            }`}
          >
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