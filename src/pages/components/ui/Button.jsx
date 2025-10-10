import React from 'react';

const Button = ({ children, onClick, variant = 'default', type = 'button' }) => {
  const baseClasses = "flex-1 p-3 text-white rounded-md";
  const variants = {
    default: "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700",
    primary: "font-bold text-black bg-lime-400 hover:bg-lime-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;