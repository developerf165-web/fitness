import React from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import DropdownMenu from '/src/pages/components/ui/DropdownMenu'; // Роҳро санҷед

export default function DirectionCard({ item, onEdit, onDelete }) {
  
  const menuItems = [
    {
      label: 'Редактировать',
      action: () => onEdit(item),
      icon: <Edit size={16} className="mr-2" />
    },
    {
      label: 'Удалить',
      action: () => onDelete(item),
      icon: <Trash2 size={16} className="mr-2" />,
      className: 'danger'
    },
  ];

  return (
    <div className="relative flex flex-col justify-between p-5 rounded-2xl color-bg-mini-card hover:bg-[#1a1a1a] transition-colors duration-300 group h-full border border-transparent hover:border-gray-800">
      
      {/* Қисми болоӣ: Сарлавҳа ва Матн */}
      <div>
        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-4">
          {item.description}
        </p>
      </div>

      {/* Қисми поёнӣ: Икона ва Меню */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
        {/* Иконаи хурд (дар доира) */}
        <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center overflow-hidden border border-white/10">
            {item.iconUrl ? (
                <img src={item.iconUrl} alt="icon" className="w-full h-full object-cover" />
            ) : (
                // Агар икона набошад, як ранги оддӣ
                <div className="w-3 h-3 rounded-full color-bg-accent"></div>
            )}
        </div>

        {/* Тугмаи меню */}
        <div className="relative">
            <DropdownMenu items={menuItems}>
            <button className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <MoreVertical size={18} />
            </button>
            </DropdownMenu>
        </div>
      </div>
    </div>
  );
}