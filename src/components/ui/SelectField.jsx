import React from "react";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  children,
  className = "",
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="text-sm font-medium color-accent pl-4 block mb-1">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 color-bg-mini-card text-white rounded-lg  
                   focus:outline-none focus:color-accent appearance-none cursor-pointer"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children ? children : options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
