import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'default',
  type = 'button',
  className = '',
  disabled = false,
  ...rest  // Ҳамаи дигар props ба button мегузаранд (form, id, name ва ғайра)
}) => {
  const baseClasses = "p-3 text-black cursor-pointer rounded-xl font-medium transition-colors flex items-center justify-center";
  const variants = {
    default: "color-bg-mini-card bg-hover-card",
    primary: "font-bold text-black color-bg-accent hover:bg-lime-500",
  };

  // Агар className дода шавад, онро истифода барем
  // Агар не, variant-ро истифода барем (backward compatible)
  const finalClassName = className || `${baseClasses} ${variants[variant]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;