import React from "react";

export default function FirstEnrollServiceCell({ value }) {
  return (
    <td className="p-3 text-center">
      <span className="font-medium block w-full">{value}</span>
    </td>
  );
}