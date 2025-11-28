import React from 'react';

const CustomInput = ({ label, placeholder, type = 'text', required = false, children, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block color-accent pl-4 text-base font-medium mb-1">
        {label}
        {required && <span className="color-accent"></span>}
      </label>
      {children ? (
        <div 
          className="w-full color-bg-mini-card text-gray-400 py-3 px-4 rounded-lg flex justify-between items-center cursor-pointer bg-hover-card transition duration-200"
          {...props}
        >
          {placeholder}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full color-bg-mini-card text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:color-accent transition duration-200"
          {...props}
        />
      )}
    </div>
  );
};

export default CustomInput;