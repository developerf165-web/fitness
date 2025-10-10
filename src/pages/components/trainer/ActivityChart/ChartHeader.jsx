import React from 'react';

const ChartHeader = ({ year }) => (
    <div className="flex justify-between w-full items-center mb-4">
        <div className="flex space-x-4 text-sm font-medium">
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-400 mr-1.5"></span>
                Кардио нагрузки
            </div>
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-fuchsia-500 mr-1.5"></span>
                Силовые нагрузки
            </div>
        </div>
        <div className="text-xl font-bold color-accent">
            {year}
        </div>
    </div>
);

export default ChartHeader;