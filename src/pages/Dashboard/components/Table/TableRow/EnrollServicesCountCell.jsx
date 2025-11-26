import React from "react";
import Badge from "../Badge";

export default function EnrollServicesCountCell({ user, value, isPageBlocked }) {
  const isBlocked = isPageBlocked;

  return (
    <td className="p-3 flex items-center justify-center">
      <Badge value={value} color={isBlocked ? "blocked" : "accent"} />
    </td>
  );
}