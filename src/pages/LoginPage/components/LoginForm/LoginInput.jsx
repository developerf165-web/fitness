import React from "react";

const LoginInput = ({ value, onChange, error }) => {
  return (
    <div className="mb-4">
      <div
        className={`flex items-center bg-transparent rounded-lg p-3 border ${
          error ? "border-red-500" : "color-border-accent"
        } h-12 px-3`}
      >
        <input
          type="text"
          placeholder="Логин"
          value={value}
          onChange={onChange}
          className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default LoginInput;
