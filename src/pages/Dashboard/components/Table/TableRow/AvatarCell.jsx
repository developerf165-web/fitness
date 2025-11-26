import React from "react";

export default function AvatarCell({ user, value }) {
  return (
    // Тағйирот: w-[40%] -> w-[250px]
    // Ҳоло сутун ҳамагӣ 250px ҷой мегирад (хурдтар ва зеботар)
    <td className="p-3 w-[350px]"> 
      <div className="flex items-center gap-3">
        <img
          src={value}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        {/* truncate ва max-w-[200px] номро дар дохили ҳамин 250px ғунҷонида мемонад */}
        <span className="truncate max-w-[200px] block font-medium">
          {user.name}
        </span>
      </div>
    </td>
  );
}