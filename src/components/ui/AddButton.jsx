import React from 'react';
import PropTypes from 'prop-types';

export default function AddButton({ onClick, label, className = '' }) {
    return (
        <button 
            onClick={onClick}
            // Класси 'btn-card'-ро истифода мебарем + ҳама гуна класси иловагӣ
            className={`btn-card flex items-center justify-center ${className}`}
        >
            {/* Агар label бошад, онро нишон медиҳад, агар не - "Добавить" менависад */}
            {label || 'Добавить'}
        </button>
    );
}

AddButton.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    className: PropTypes.string
};