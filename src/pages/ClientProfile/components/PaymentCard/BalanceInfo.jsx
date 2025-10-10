import React from "react";

export default function BalanceInfo() {
  return (
    <div className="block items-center mb-4">
      <div className="flex justify-between">
        <p className="text-sm font-semibold">НАЛИЧНЫЕ</p>
        <p className="text-lg font-bold color-accent">500 TJS</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm font-semibold">БОНУСЫ</p>
        <p className="text-lg font-bold color-accent">100</p>
      </div>
    </div>
  );
}
