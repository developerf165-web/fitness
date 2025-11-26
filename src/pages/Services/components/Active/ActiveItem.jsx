import React from 'react';
import { ChevronRight } from 'lucide-react';

// Компонент принимает 'isOpen' (открыт ли он) и 'onToggle' (функция-переключатель)
export default function ActiveItem({ item, isOpen, onToggle }) {

  const hasSubItems = item.subItems && item.subItems.length > 0;
  
  const mainRowClasses = [
    "flex items-center justify-between p-2 rounded-2xl color-bg-card transition-all cursor-pointer group border-2",
    hasSubItems ? 'bg-hover-card' : '',
    // Стиль границы зависит от состояния 'isOpen', которое приходит из ActiveSection
    isOpen ? 'color-border-accent' : 'border-transparent hover:border-gray-700',
  ].join(' ');

  return (
    <div className="w-full mb-4">
      <div 
        className={mainRowClasses}
        // При клике вызываем функцию onToggle из родительского компонента
        onClick={() => onToggle(item.id)}
        role={hasSubItems ? "button" : "listitem"}
        aria-expanded={hasSubItems ? isOpen : undefined}
        aria-controls={hasSubItems ? `sub-items-${item.id}` : undefined}
      >
        
        {/* Левая Часть: Аватар и Имя */}
        <div className="flex items-center gap-4 w-1/2 md:w-1/3">
          <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-colors ${isOpen ? 'color-border-accent' : 'border-transparent group-hover:border-[rgba(208,253,62,1)]'}`}>
            <img 
              src={item.avatar} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm md:text-base">{item.name}</h4>
            {item.role && <p className="text-xs text-gray-500">{item.role}</p>}
          </div>
        </div>

        {/* Средняя Часть: Категория */}
        <div className="flex-1 text-left pl-4 hidden sm:block"> 
          <span className="text-gray-300 text-sm font-medium">
            {item.category}
          </span>
        </div>

        {/* Правая Часть: Значок и Действие */}
        <div className="flex items-center gap-4 justify-end min-w-16">
           
           {hasSubItems ? (
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d9fb4d] text-black font-bold text-sm hover:bg-[#c2e530] transition shadow-lg shadow-lime-900/20">
                <span>+{item.count}</span>
                <ChevronRight 
                  size={16} 
                  // Вращение зависит от состояния 'isOpen'
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} 
                />
             </div>
           ) : (
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E1E1E] text-white font-bold text-sm">
                <span>+{item.count}</span>
                <ChevronRight size={16} className="text-gray-500" />
             </div>
           )}
        </div>
      </div>

      {/* Выпадающая Часть: Зер-гурӯҳҳо (SubItems) */}
      {hasSubItems && (
        <div 
          id={`sub-items-${item.id}`}
          className={`
            transition-all duration-500 ease-in-out overflow-hidden
            ${isOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}
          `}
        >
          {item.subItems.map((sub, index) => (
            <div key={index} className="flex items-center justify-between pl-20 pr-6 py-2">
                <div className="text-gray-400 text-sm w-1/3 min-w-[70px]">{sub.type}</div>
                <div className="text-white text-sm flex-1 text-left">{sub.time}</div>
                <div className="flex -space-x-2 justify-end w-1/3">
                    {sub.avatars.map((av, i) => (
                        <img 
                          key={i} 
                          src={av} 
                          className="w-6 h-6 rounded-full border border-[#1E1E1E] object-cover" 
                          alt={`Аватар ${i+1}`}
                        />
                    ))}
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}