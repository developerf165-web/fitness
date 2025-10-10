import React from "react";

export default function Summary() {
  return (
    <div className="mt-4 mb-6 text-sm text-gray-300">
      <div className="flex justify-between mb-1">
        <span>Сумма без скидки</span>
        <span>0.00 TJS</span>
      </div>
      <div className="flex justify-between mb-1">
        <span>Сумма скидки</span>
        <span>0.00 TJS</span>
      </div>
      <div className="flex justify-between mb-1">
        <span>Оплата бонусами</span>
        <span>0.00 TJS</span>
      </div>
      <div className="flex justify-between mb-3">
        <span>Получение бонусов</span>
        <span>0.00 TJS</span>
      </div>

      <div className="flex justify-between items-center text-lg font-bold text-lime-400">
        <span>ИТОГО</span>
        <span>=0.00 TJS</span>
      </div>
    </div>
  );
}
