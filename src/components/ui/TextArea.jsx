import React, { useEffect, useRef } from "react";

export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  maxLength,
  className = "",
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="text-sm font-medium color-accent pl-2.5 block mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="w-full p-3 color-bg-mini-card text-xs text-white rounded-lg
                   focus:outline-none focus:color-accent focus:ring-2 resize-none min-h-[120px]"
      />
      {maxLength && (
        <p className="text-md text-right text-neutral-500 mt-1">
          {value.length} / {maxLength} символов
        </p>
      )}
    </div>
  );
}
