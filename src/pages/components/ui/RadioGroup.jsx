import React from "react";

export default function RadioGroup({ label, name, options, value, onChange }) {
  return (
    <div className="my-6">
      <span className="block text-sm font-semibold color-accent mb-1">{label}</span>
      <div className="flex gap-6">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="hidden peer"
            />
            <span className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:color-border-accent peer-checked:bg-color-accent"></span>
            <span className="peer-checked:text-accent text-gray-200">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
