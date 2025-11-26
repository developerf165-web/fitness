import React from "react";

export default function StaffStatusCell({ value }) {
  return (
    <td
      // align-middle -> ин аниқ дар маркази амудӣ (vertical) мемонад
      // text-right -> ин матнро ба тарафи рост мебарад
      // flex-ро гирифтем, чунки барои ҷадвал align-middle беҳтар кор мекунад
      className={`p-3 pr-8 font-medium align-middle text-right ${
        value === "На работе" ? "color-accent" : "text-red-500"
      }`}
    >
      {value}
    </td>
  );
}