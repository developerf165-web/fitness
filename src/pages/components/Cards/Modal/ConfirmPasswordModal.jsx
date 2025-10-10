import React, { useState } from 'react';
import PinInput from './PinInput';

const ConfirmPasswordModal = ({ isOpen, onClose, phoneNumber = '+992 92 000 00 00', onConfirm }) => {
    const [code, setCode] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    if (!isOpen) return null;

    const handlePinComplete = (fullPin) => {
        setCode(fullPin);
        setIsConfirmed(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.length === 4) {
            console.log('Verification Code:', code);
            onConfirm(code); 
        } else {
            alert('Лутфан кодро пурра ворид кунед!');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={onClose}>
            
            <div 
                className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-full max-w-sm shadow-2xl" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center mb-8">
                    <button onClick={onClose} className="text-white hover:text-gray-300 transition mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-bold text-white tracking-wider">ПОДТВЕРЖДЕНИЕ ПАРОЛЯ</h2>
                </div>

                <p className="text-base text-center text-white mb-6">
                    На номер <span className="font-semibold text-lime-400">{phoneNumber}</span> был отправлен код, введите код для подтверждения
                </p>

                <PinInput 
                    length={4} 
                    onComplete={handlePinComplete} 
                />

                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-1/2 mx-1 py-3 rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition duration-200 font-medium"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className={`w-1/2 mx-1 py-3 rounded-lg text-black transition duration-200 font-medium ${
                            isConfirmed ? 'bg-lime-400 hover:bg-lime-300' : 'bg-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!isConfirmed}
                    >
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPasswordModal;