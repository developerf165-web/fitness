import React from 'react';
import { MoreVertical, Edit, Unlock, Lock, Trash2 } from "lucide-react";
import DropdownMenu from '../../pages/components/ui/DropdownMenu'; // Роҳро аз намунаи шумо гирифтам
import { STATUS_COLORS } from './constants';

export default function LockerCard({ locker, onEdit, onOpen, onLock, onDelete }) {
    const colorClass = STATUS_COLORS[locker.status] || 'bg-gray-700';

    const menuItems = [
        {
            label: 'Редактировать',
            action: () => onEdit(locker),
            icon: <Edit size={16} className="mr-2" />
        },
        {
            label: 'Открыть шкафчик',
            action: () => onOpen(locker),
            icon: <Unlock size={16} className="mr-2" />,
        },
        {
            label: 'Заблокировать',
            action: () => onLock(locker),
            icon: <Lock size={16} className="mr-2" />,
        },
        {
            label: 'Удалить',
            action: () => onDelete(locker),
            icon: <Trash2 size={16} className="mr-2" />,
            className: 'danger' 
        },
    ];

    return (
        <div 
            className={`
                ${colorClass} 
                rounded-xl 
                shadow-lg 
                p-4 
                aspect-[16/10] 
                relative 
                flex 
                flex-col 
                items-center 
                justify-center 
                transition-transform 
                hover:scale-[1.03] 
            `}
        >
            
            {/* Z-index-ро ба z-20 (ё z-30) иваз кунед */}
            <div className="absolute top-1 right-1 **z-20**"> 
                <DropdownMenu items={menuItems}>
                    <button 
                        aria-label={`Меню барои Шкафчии ${locker.id}`}
                        className="p-1 rounded-full text-black hover:bg-black/20 transition-colors"
                    >
                        <MoreVertical className='cursor-pointer' size={24} />
                    </button>
                </DropdownMenu>
            </div>
            
            <span className="text-black text-6xl font-bold leading-none">
                {locker.id}
            </span>
            
            <span className={`
                absolute 
                bottom-1 
                right-1
                text-sm 
                font-medium 
                px-2 
                py-1 
                text-black
            `}>
                {locker.status}
            </span>
        </div>
    );
}