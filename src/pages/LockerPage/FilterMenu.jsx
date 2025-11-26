import React from 'react';
import { STATUS_COLORS, STATUSES } from './constants';

export default function FilterMenu({ filters, setFilters, onClose, position }) {

    const toggleFilter = (status) => {
        setFilters(prev => ({
            ...prev,
            [status]: !prev[status]
        }));
    };

    const isAllInactive = STATUSES.every(status => !filters[status]);

    return (
        <div 
            className="absolute z-50 rounded-xl shadow-2xl p-4 right-0 mt-2 color-bg-nav text-white"
            style={{
                top: position?.top || 'auto',
                right: position?.right || 0,
            }}
            onMouseLeave={onClose}
        >
            <div className="space-y-2 min-w-[200px]">
                {STATUSES.map(status => (
                    <div 
                        key={status} 
                        className="flex items-center space-x-3 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors"
                        onClick={() => toggleFilter(status)}
                    >
                        <div className={`w-4 h-4 rounded-full ${STATUS_COLORS[status]} ${filters[status] || isAllInactive ? 'opacity-100' : 'opacity-30'}`}></div>
                        <span className="text-sm">{status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}