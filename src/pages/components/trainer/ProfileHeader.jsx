import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path>
    </svg>
);

const ShareIcon = () => (
    <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M14.9998 1.97435C13.0668 1.97435 11.4998 3.50117 11.4998 5.38459C11.4998 7.26802 13.0668 8.79483 14.9998 8.79483C16.9328 8.79483 18.4998 7.26802 18.4998 5.38459C18.4998 3.50117 16.9328 1.97435 14.9998 1.97435ZM10.4998 5.38459C10.4998 2.96305 12.5145 1 14.9998 1C17.4851 1 19.4998 2.96305 19.4998 5.38459C19.4998 7.80614 17.4851 9.76919 14.9998 9.76919C12.5145 9.76919 10.4998 7.80614 10.4998 5.38459Z" fill="#D0FD3E" stroke="#D0FD3E"/>
        <path d="M0.650391 4.91016H10.3496C10.4448 4.91016 10.5 4.98248 10.5 5.04395C10.4997 5.10531 10.4445 5.17676 10.3496 5.17676H0.650391C0.555458 5.17676 0.500272 5.10531 0.5 5.04395C0.5 4.98248 0.555221 4.91016 0.650391 4.91016Z" fill="#D0FD3E" stroke="#D0FD3E"/>
        <path d="M19.6501 4.91016H24.3494C24.4445 4.91016 24.4998 4.98248 24.4998 5.04395C24.4995 5.10531 24.4443 5.17676 24.3494 5.17676H19.6501C19.5552 5.17676 19.5 5.10531 19.4998 5.04395C19.4998 4.98248 19.555 4.91016 19.6501 4.91016Z" fill="#D0FD3E" stroke="#D0FD3E"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.0002 19.0256C11.9332 19.0256 13.5002 17.4988 13.5002 15.6154C13.5002 13.732 11.9332 12.2052 10.0002 12.2052C8.06723 12.2052 6.50022 13.732 6.50022 15.6154C6.50022 17.4988 8.06723 19.0256 10.0002 19.0256ZM14.5002 15.6154C14.5002 18.0369 12.4855 20 10.0002 20C7.51495 20 5.50022 18.0369 5.50022 15.6154C5.50022 13.1939 7.51495 11.2308 10.0002 11.2308C12.4855 11.2308 14.5002 13.1939 14.5002 15.6154Z" fill="#D0FD3E" stroke="#D0FD3E"/>
        <path d="M24.3496 16.0898L14.6504 16.0898C14.5552 16.0175 14.5 16.0175 14.5 15.9561C14.5003 15.8947 14.5555 15.8232 14.6504 15.8232L24.3496 15.8232C24.4445 15.8232 24.4997 15.8947 24.5 15.9561C24.5 16.0175 24.4448 16.0898 24.3496 16.0898Z" fill="#D0FD3E" stroke="#D0FD3E"/>
        <path d="M5.34985 16.0898L0.650635 16.0898C0.555465 16.0898 0.500244 16.0175 0.500244 15.9561C0.500516 15.8947 0.555702 15.8232 0.650635 15.8232L5.34985 15.8232C5.44479 15.8232 5.49997 15.8947 5.50024 15.9561C5.50024 16.0175 5.44502 16.0898 5.34985 16.0898Z" fill="#D0FD3E" stroke="#D0FD3E"/>
    </svg>
);

export default function ProfileHeader ({ title, onShareClick, onBackClick, showBackButton = false, className = '', rightContent = null }) {
    const navigate = useNavigate();

    const handleBack = onBackClick || (() => navigate(-1));

    const showBack = showBackButton || onBackClick;

    const RightElement = () => {
        if (rightContent) {
            return rightContent; // Элементи навро нишон медиҳем
        }
        if (onShareClick) {
            return (
                <button 
                    onClick={onShareClick}
                    className="
                        color-bg-card
                        w-15 h-13 
                        rounded-xl 
                        shadow-lg 
                        flex items-center justify-center 
                        hover:opacity-80 transition-opacity
                        cursor-pointer
                    "
                    aria-label="Мубодила"
                >
                    <ShareIcon />
                </button>
            );
        }
        return <div className="w-10 h-10" />;
    };

    return (
        <header 
            className={`w-full mx-auto flex justify-between items-center mb-4 py-2 px-2 md:px-0 ${className}`}
        >
            
            {/* --- ҚИСМИ ЧАП --- */}
            <div className="flex-shrink-0 flex items-center gap-4">
                {showBack && ( 
                    <button 
                        onClick={handleBack}
                        className="text-white cursor-pointer hover:text-gray-300 transition-colors p-2"
                        aria-label="Бозгашт"
                    >
                        <BackIcon />
                    </button>
                )}
                
                {title && (
                    <h1 className="text-white font-medium text-3xl">
                        {title}
                    </h1>
                )}

                {!showBack && !title && <div className="w-10 h-10" />}
            </div>

            {/* --- ҚИСМИ РОСТ (Мубодила / Content-и нав) --- */}
            <RightElement />
        </header>
    );
}