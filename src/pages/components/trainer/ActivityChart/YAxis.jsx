import React from 'react';
import { PADDING_RIGHT } from './constants';

const YAxis = ({ labels }) => (
    <div
        style={{ width: `${PADDING_RIGHT}px` }}
        className={`flex flex-col items-center h-full justify-between text-sm bg-red-700 text-gray-400 mr-8 pl-0 pt-10 pb-11`}
    >
        {labels.slice().reverse().map((label, index) => (
            <div key={index} className="translate-y-1/2">
                {label}
            </div>
        ))}
    </div>
);

export default YAxis;