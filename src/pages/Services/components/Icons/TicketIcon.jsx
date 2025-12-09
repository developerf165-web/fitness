import React from 'react';

/**
 * Иконкаи Ticket (билет/нарх)
 * @param {number} width - Паҳнои иконка (default: 16)
 * @param {number} height - Баландии иконка (default: 16)
 * @param {string} fill - Ранги иконка (default: "white")
 * @param {string} className - Классҳои иловагӣ
 */
export default function TicketIcon({
    width = 16,
    height = 16,
    fill = "white",
    className = ""
}) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M16.026 4.457L12.847 0L1.158 9.338L0.51 9.331V9.341H0V21.341H21V9.341H20.038L18.124 3.742L16.026 4.457ZM17.925 9.341H7.897L15.366 6.795L16.888 6.308L17.925 9.341ZM14.05 5.131L6.34 7.759L12.446 2.881L14.05 5.131ZM2 17.51V13.17C2.4219 13.0205 2.80511 12.7787 3.1217 12.4623C3.43828 12.1459 3.68027 11.7628 3.83 11.341H17.17C17.3197 11.763 17.5616 12.1462 17.8782 12.4628C18.1948 12.7794 18.578 13.0213 19 13.171V17.511C18.578 17.6607 18.1948 17.9026 17.8782 18.2192C17.5616 18.5358 17.3197 18.919 17.17 19.341H3.832C3.68218 18.9187 3.43996 18.5351 3.12302 18.2184C2.80607 17.9016 2.4224 17.6596 2 17.51Z"
                fill={fill}
            />
        </svg>
    );
}
