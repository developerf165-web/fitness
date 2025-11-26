import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import CardImage from './CardImage';
import CardDetails from './CardDetails';

export default function CourseCard({ item, onEdit, onDelete, variant = 'launch' }) {
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

  const isLaunch = variant === 'launch';
  
  const wrapperBorderClass = isLaunch 
    ? "border-2 border-[#d9fb4d]" 
    : "border border-transparent";

  return (
    <div className={`relative flex flex-col transition-all duration-300 group cursor-pointer z-10 `}>
      
      <CardImage
        item={item}
        wrapperBorderClass={wrapperBorderClass}
      />
      
      <CardDetails
        item={item}
        menuItems={menuItems}
      />

    </div>
  );
}