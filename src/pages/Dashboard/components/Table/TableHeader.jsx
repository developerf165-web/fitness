import React from "react";

export default function TableHeader({ headers }) {
  return (
    <thead>
      <tr className="text-gray-300 bottom-border-color">
        {headers.map((h, i) => (
          <th
            key={h}
            className={`p-3 font-medium ${
              // 1. Агар "Статус" бошад -> Тарафи рост (text-right)
              h === "Статус работы" 
                ? "text-right pr-4" // pr-8 барои он ки ба девор начаспад
                : i === 0 || (i === 1 && h !== "Должность") 
                  ? "text-left" 
                  : "text-center"
            }`}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
}