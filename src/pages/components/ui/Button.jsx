import React from 'react';

const Button = ({ children, onClick, variant = 'default', type = 'button' }) => {
  const baseClasses = "p-3 text-black cursor-pointer rounded-xl font-medium transition-colors flex items-center justify-center";
  const variants = {
    default: "color-bg-mini-card bg-hover-card",
    primary: "font-bold text-black color-bg-accent hover:bg-lime-500",
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