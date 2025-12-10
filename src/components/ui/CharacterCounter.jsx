// src/components/ui/CharacterCounter.jsx

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Компоненти нишон додани шумораи аломатҳо
 * Character counter component
 */
export default function CharacterCounter({ current, max, className = '' }) {
    const percentage = (current / max) * 100;
    const isNearLimit = percentage >= 90;
    const isOverLimit = current > max;

    const colorClass = isOverLimit
        ? 'text-red-500'
        : isNearLimit
            ? 'text-yellow-500'
            : 'text-gray-400';

    return (
        <div className={`text-xs -mt-3 mb-3 text-right ${colorClass} ${className}`}>
            {current}/{max} символов
        </div>
    );
}

CharacterCounter.propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    className: PropTypes.string,
};
