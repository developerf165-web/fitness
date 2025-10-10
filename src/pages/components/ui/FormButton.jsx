import React from "react";

export default function FormButton({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition ${className}`}
    >
      {children}
    </button>
  );
}
