import React from 'react';
import { Edit, Trash2, Play, X } from 'lucide-react';
import CardImage from './CardImage';
import CardDetails from './CardDetails';

export default function CourseCard({ item, onStart, onCancel, variant = 'launch' }) {
  const isLaunch = variant === 'launch';
  const isRecruit = variant === 'recruit';
  
  let menuItems = [];

  if (isLaunch) {
    menuItems = [
      {
        label: 'Запустить',
        action: () => onStart(item),
        icon: <Play size={16} className="mr-2" />
      },
      {
        label: 'Отменить',
        action: () => onCancel(item),
        icon: <X size={16} className="mr-2" />,
        className: 'danger'
      },
    ];
  } else if (isRecruit) {
    menuItems = [
      {
        label: 'Готово к запуску',
        action: () => onStart(item),
        icon: <Play size={16} className="mr-2" />
      },
      {
        label: 'Отменить',
        action: () => onCancel(item),
        icon: <X size={16} className="mr-2" />,
        className: 'danger'
      },
    ];
  } else {
    menuItems = [
      {
        label: 'Запустить',
        action: () => onStart(item),
        icon: <Play size={16} className="mr-2" />
      },
      {
        label: 'Отменить',
        action: () => onCancel(item),
        icon: <X size={16} className="mr-2" />,
        className: 'danger'
      },
    ];
  }

  const wrapperBorderClass = isLaunch 
    ? "border-2 border-[#d9fb4d]" 
    : "border border-transparent";

  return (
    <div className="relative flex flex-col transition-all duration-300 group cursor-pointer z-10">
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
