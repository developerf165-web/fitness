// /src/pages/components/Toast/ToastContext.js

import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastNotification from './ToastNotification'; 

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast должен использоваться внутри ToastProvider');
  }
  return context;
};

// --- ҚАДАМИ 1: ToastContainer-ро БЕРУН мебарорем ---
// Акнун ин як компоненти муқаррарӣ аст, ки дар дохили Provider сохта намешавад.
const ToastContainer = () => {
  // --- ҚАДАМИ 2: Мо ҳолати toast ва функсияи hideToast-ро аз Context мегирем ---
  const { toast, hideToast } = useToast(); 

  if (!toast) return null;

  return (
    <div 
      className="fixed top-7 right-5 z-[100] transition-opacity duration-500"
    >
      <ToastNotification
        title={toast.title}
        message={toast.message}
        // --- ҚАДАМИ 3: Тугмаи "X"-ро фаъол мекунем ---
        onClose={hideToast} 
      />
    </div>
  );
};


export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null); 
  const TOAST_DURATION = 4000;

  const showToast = useCallback((type, title, message) => {
    if (type !== 'success') return; 

    setToast({ 
      id: Date.now(),
      type, 
      title, 
      message 
    });

    const timer = setTimeout(() => {
      setToast(null);
    }, TOAST_DURATION);

    // Тоза кардан (cleanup) агар компонент нест шавад
    return () => clearTimeout(timer);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // --- ҚАДАМИ 4: Мо худи 'toast' ва 'hideToast'-ро ба Context медиҳем ---
  const contextValue = {
    showToast,
    hideToast,
    toast // <- Ҳолати toast ҳоло дар context дастрас аст
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* --- ҚАДАМИ 5: Мо ToastContainer-и УСТУВОР-ро (stable) render мекунем --- */}
      <ToastContainer /> 
    </ToastContext.Provider>
  );
};