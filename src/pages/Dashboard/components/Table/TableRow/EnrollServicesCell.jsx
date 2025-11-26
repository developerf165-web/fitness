import React from "react";
import Badge from "../Badge";

export default function EnrollServicesCell({ user, value, isPageBlocked }) {
  const isBlocked = isPageBlocked;

  const colorCycle = [
    "yellow", "blue", "red", "green", "purple",
    "pink", "indigo", "teal", "orange", "gray", "accent",
  ];

  const services = Array.isArray(value) ? value : [];
  const servicesToShow = services.slice(0, 4);
  const remainingCount = services.length - servicesToShow.length;
  const blocked = "bg-[rgba(173,173,173,1)] text-white";
  const blockedColor = blocked;

  return (
    <td className="p-3">
      <div className="group relative flex items-center justify-center -space-x-2 overflow-visible cursor-pointer">
        {services.length === 0 ? (
          <Badge
            value="0"
            color={isBlocked ? blockedColor : "accent"}
          />
        ) : (
          <>
            {servicesToShow.map((s, j) => (
              <div
                key={s.id || j}
                className={`relative transition-all duration-300 z-[${50 - j * 10}]`}
              >
                <Badge
                  value={s.count ?? s.name ?? ""}
                  color={isBlocked ? blocked : colorCycle[j % colorCycle.length]}
                />
              </div>
            ))}

            {remainingCount > 0 && (
              <Badge
                value={`+${remainingCount}`}
                color={isBlocked ? blocked : "accent"}
                className="relative z-0 transition-colors duration-300 text-black"
              />
            )}

            {services.length > 5 && (
              <div className="absolute top-full mt-2 hidden group-hover:flex flex-wrap gap-2 p-3 bg-white shadow-xl rounded-2xl border border-gray-200 z-50">
                {services.map((s, j) => (
                  <Badge
                    key={s.id || `popup-${j}`}
                    value={s.count ?? s.name ?? ""}
                    color={
                      isBlocked ? blockedColor : colorCycle[j % colorCycle.length]
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </td>
  );
}
