import React from "react";
import { ChevronRight } from "lucide-react";

export default function InputField({ label, placeholder, hasArrow }) {
  return (
    <div className="mb-5">
      <p className="text-sm color-accent pl-4 mb-2">{label}</p>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-lime-400"
        />
        {hasArrow && (
          <ChevronRight className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
        )}
      </div>
    </div>
  );
}
