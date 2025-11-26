import React from "react";

export default function PositionCell({ user }) {
  return (
    <td className="p-3">
       {/* items-center -> items-start иваз шуд */}
      <div className="flex justify-center items-center flex-col">
        <span className="font-medium flex justify-center items-center">{user.position}</span>
        {user.course && (
          <span className="text-sm mt-1 color-accent text-left">
            {user.course}
          </span>
        )}
      </div>
    </td>
  );
}