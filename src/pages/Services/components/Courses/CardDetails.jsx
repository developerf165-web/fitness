import React from 'react';
import { MoreVertical } from 'lucide-react';
import DropdownMenu from '@components/ui/DropdownMenu';
import { UsersIcon, TicketIcon } from '../Icons';

export default function CardDetails({ item, menuItems }) {
    return (
        <div className="flex flex-col justify-between color-bg-card flex-grow rounded-xl p-3">

            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className={`w-1 h-4 rounded-sm ${item.statusColor || 'color-bg-accent'}`}></span>
                    <h3 className="text-sm font-bold text-white leading-tight">{item.title}</h3>
                </div>
            </div>

            <div className="flex items-center justify-between text-xs pr-6 text-white mt-2 relative">
                <div className="flex items-center gap-2">
                    <UsersIcon />
                    <span className="text-white font-semibold text-sm">{item.price}</span>
                </div>
                <div className="flex items-center gap-1">
                    <TicketIcon />
                    {item.price && <span>{item.price}</span>}
                </div>

                <div className="absolute -right-3 -bottom-1.5 z-20">
                    <DropdownMenu items={menuItems}>
                        <button className="p-2 cursor-pointer rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                            <MoreVertical size={18} />
                        </button>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}