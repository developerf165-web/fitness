import React from "react";
import EyeIcon from "./EyeIcon";

const PasswordInput = ({ value, onChange, visible, toggleVisible, error }) => {
  return (
    <div className="mb-4">
      <div
        className={`relative flex items-center bg-transparent rounded-lg p-3 border ${
          error ? "border-red-500" : "color-border-accent"
        } h-12 px-3`}
      >
        <input
          type={visible ? "text" : "password"}
          placeholder="Пароль"
          value={value}
          onChange={onChange}
          className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none"
        />
        <button type="button" onClick={toggleVisible} className="text-gray-400 hover:text-brand-green">
          <EyeIcon visible={visible} className="w-6 h-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
