import React from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import DropdownMenu from '@components/ui/DropdownMenu';

export default function DirectionCard({ item, onEdit, onDelete }) {
  const menuItems = [
    {
      label: 'Редактировать',
      action: () => onEdit(item.id),
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
    <div className="relative flex flex-col justify-between p-5 rounded-2xl color-bg-card group h-full border border-transparent hover:border-gray-800">

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-4">
            {item.description}
          </p>
        </div>

        <div className="relative ml-3">
          <DropdownMenu items={menuItems}>
            <button className="menu-dots-button">
              <MoreVertical size={18} />
            </button>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
        <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center overflow-hidden border border-white/10">
          {item.iconUrl ? (
            <img src={item.iconUrl} alt="icon" className="w-full h-full object-cover" />
          ) : (
            <div className="w-3 h-3 rounded-full color-bg-accent"></div>
          )}
        </div>
      </div>

    </div>
  );
}
