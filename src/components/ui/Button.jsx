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
  // Remove default disabled opacity to handle it manually
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center cursor-pointer";

  const variants = {
    default: "color-bg-mini-card color-text-main hover:bg-[#3A3A3C]",
    primary: "color-bg-accent text-black font-bold hover:opacity-90",
  };

  // Determine variant style based on disabled state
  // Disabled = Neutral background (like 'default' variant base) + Muted text
  const variantStyle = disabled
    ? "color-bg-mini-card text-zinc-500 cursor-not-allowed"
    : (variants[variant] || variants.default);

  const finalClassName = `${baseClasses} ${variantStyle} ${className}`.trim();

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