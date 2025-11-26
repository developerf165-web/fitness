import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  // Манеи scroll-и body ҳангоми кушода будани модал
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Пӯшидан бо Esc
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-transparent-blur z-50"
      onClick={onClose} // Click дар backdrop модалро пӯшонад
    >
      <div
        onClick={(e) => e.stopPropagation()} // Click дар content модалро пӯшонад нест кунад
        className="w-full max-w-lg px-4"
      >
        {children}
      </div>
    </div>
  );
}
