// CardioModal/ModalFooter.jsx

import React from 'react';

export default function ModalFooter({ onCancel, onSave, cancelText, saveText }) {
    return (
        <>
            <button
                onClick={onCancel}
                className="py-2 px-6 rounded-xl color-bg-mini-card text-white font-semibold hover:bg-zinc-700 transition-colors"
            >
                {cancelText}
            </button>
            <button
                onClick={onSave}
                className="py-2 px-8 rounded-xl color-bg-accent] text-black font-bold hover:bg-green-500 transition-colors"
            >
                {saveText}
            </button>
        </>
    );
}