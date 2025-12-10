import React from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import DropdownMenu from '@components/ui/DropdownMenu';

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
    <div className="relative flex flex-col justify-between p-5 rounded-2xl color-bg-card group h-full border border-transparent">

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
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

    </div>
  );
}
