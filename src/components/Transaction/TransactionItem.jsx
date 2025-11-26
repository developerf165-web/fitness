import React, { useState } from "react";

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const IGNORED_KEYS = new Set([
  'id',
  'card_id',
  'payment',
  'payment_type',
  'message',
  'created_at',
  'updated_at',
  'amount'
]);

export default function TransactionItem({ transaction }) {
  const [isOpen, setIsOpen] = useState(false);

  const amount = transaction.amount || transaction.payment || 0;
  const isNegative = amount < 0;
  
  const amountColor = isNegative ? "red" : "color-accent";
  
  const date = new Date(transaction.created_at).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Мо массивҳои ашёҳои харидашударо дар ин ҷо ҷамъ меорем
  const purchasedItems = Object.entries(transaction).reduce((acc, [key, value]) => {
    // Ин қисмат ҳамон тавре ки буд, мемонад
    if (!IGNORED_KEYS.has(key) && Array.isArray(value)) {
      acc.push(...value);
    }
    return acc;
  }, []);

  let totalInternalPrice = 0;
  purchasedItems.forEach(item => {
    totalInternalPrice += parseFloat(item.price || item.price || 0);
  });

  return (
    <div className="color-bg-nav rounded-xl shadow-sm p-4 text-[var(--color-text-main)]">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">{transaction.message || "Транзакция"}</p>
          <p className="text-sm text-[var(--color-text-muted)]">{date}</p>
        </div>
        
        <p className={`font-bold text-lg ${amountColor}`}>
          {totalInternalPrice.toFixed(2)} с.
        </p>
      </div>

      <div
        className="mt-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">Список</span>
        <span
          className={`
            text-[var(--color-text-muted)] 
            transition-transform duration-300 ease-in-out
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
        >
          <ChevronDownIcon />
        </span>
      </div>

      <div
        className={`
          transition-[max-height,padding,margin,border] 
          duration-500 ease-in-out overflow-hidden
          ${
            isOpen
              ? "max-h-[1000px] mt-4 pt-4 border-t color-boder-mini-card"
              : "max-h-0 mt-0 pt-0 border-t border-transparent"
          }
        `}
      >
        <p className="font-semibold text-sm mb-2">
          Детали транзакции:
        </p>
        {purchasedItems.length === 0 && (
          <p className="text-sm text-[var(--color-text-muted)]">
            Нет деталей
          </p>
        )}

        {purchasedItems.map((item, index) => ( // 👈 Иловаи index
          <div
            // ИСЛОҲИ КАЛИДИ ТАКРОРӢ: Комбинатсияи ID-и ашё ва Index
            key={`${item.id || 'no-id'}-${index}`} // Агар item.id вуҷуд надошта бошад, "no-id" истифода мешавад
            className="flex justify-between text-sm mb-1"
          >
            <span>{item.title || item.name}</span>
            <span>
              {parseFloat(item.price || 0).toFixed(2)} с.
            </span>
          </div>
        ))}

        <div className="flex justify-between font-bold mt-2 pt-2 border-t color-boder-mini-card">
          <span>Итого:</span>
          <span>{totalInternalPrice.toFixed(2)} с.</span>
        </div>
      </div>
    </div>
  );
}