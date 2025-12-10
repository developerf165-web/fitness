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
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    default: "color-bg-mini-card color-text-main hover:bg-[#3A3A3C]",
    primary: "color-bg-accent text-black font-bold hover:opacity-90",
  };

  // Ҳамеша baseClasses + variant + className илова мекунем
  const finalClassName = `${baseClasses} ${variants[variant] || ''} ${className}`.trim();

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