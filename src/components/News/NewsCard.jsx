import React from 'react';
import { MoreVertical, Edit, Archive, Trash2 } from 'lucide-react';
import DropdownMenu from '../../pages/components/ui/DropdownMenu';

function NewsCard({ item, onEdit, onArchive, onDelete }) {


  const menuItems = [
    {
      label: 'Редактировать',
      action: () => onEdit(item.id),
      icon: <Edit size={16} className="mr-2" />
    },
    {
      label: 'Архивировать',
      action: () => onArchive(item.id),
      icon: <Archive size={16} className="mr-2" /> 
    },
    {
      label: 'Удалить',
      action: () => onDelete(item.id),
      icon: <Trash2 size={16} className="mr-2" />,
      className: 'danger' 
    },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden cursor-pointer text-white group aspect-[16/9]">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-125 contrast-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/30 to-transparent mix-blend-multiply"></div>

      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-stretch pb-1 p-5">
        <span className="block w-1 color-bg-accent"></span>
        <div className="pl-2">
          <h3 className="mb-1 font-medium">{item.title}</h3>
          <p className="text-sm mb-0 color-accent">{item.date}</p>
        </div>
      </div>



      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu items={menuItems}>
          <button className="p-1 cursor-pointer rounded-full text-white hover:bg-black/20 transition-colors duration-200">
            <MoreVertical size={20} />
          </button>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default NewsCard;