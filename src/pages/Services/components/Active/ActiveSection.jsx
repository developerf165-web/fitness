import React, { useState } from 'react';
import ActiveItem from './ActiveItem';

export default function ActiveSection({ items }) {
  // useState для хранения ID элемента, который сейчас открыт.
  // null означает, что ни один элемент не открыт.
  const [activeId, setActiveId] = useState(null);

  // Функция для обработки клика:
  // Если кликнули на уже открытый элемент, он закрывается (activeId = null).
  // Если кликнули на другой элемент, он открывается, а предыдущий автоматически закрывается.
  const handleItemToggle = (itemId) => {
    setActiveId(itemId === activeId ? null : itemId);
  };
  
  if (!items || items.length === 0) {
    return <div className="text-gray-500 py-4">Нет актуальных записей</div>;
  }

  return (
    <div className="w-full flex flex-col">
      {items.map((item) => (
        <ActiveItem 
          key={item.id} 
          item={item} 
          // Передаем, является ли текущий элемент открытым
          isOpen={item.id === activeId}
          // Передаем функцию для обработки открытия/закрытия
          onToggle={handleItemToggle} 
        />
      ))}
    </div>
  );
}