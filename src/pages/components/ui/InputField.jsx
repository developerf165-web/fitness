import React from "react";

export default function InputField({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div className="mb-4">
      <label className="pl-4 block text-sm font-medium color-accent mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-sm px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent"
      />
    </div>
  );
}
