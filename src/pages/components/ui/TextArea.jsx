import React from "react";

export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  maxLength,
  className = "",
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-neutral-300 block mb-1">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="w-full p-3 color-bg-mini-card text-xs text-white rounded-lg
                   focus:outline-none focus:color-accent focus:ring-2 resize-none"
      />
      {maxLength && (
        <p className="text-xs text-right text-neutral-500 mt-1">
          {value.length} / {maxLength} символов
        </p>
      )}
    </div>
  );
}
