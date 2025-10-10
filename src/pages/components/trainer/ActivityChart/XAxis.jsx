import React from 'react';
import { PADDING_LEFT, PADDING_RIGHT } from './constants';

const XAxis = ({ dates, width }) => (
    <div
        className="flex  justify-between items-center mt-2 text-sm text-gray-400"
        style={{
            marginLeft: `${PADDING_LEFT}px`,
            width: `100%`,
            paddingRight: `${PADDING_RIGHT}px`
        }}
    >
        {dates.map((date, index) => (
            <span key={index} className="text-xs">
                {date}
            </span>
        ))}
    </div>
);

export default XAxis;