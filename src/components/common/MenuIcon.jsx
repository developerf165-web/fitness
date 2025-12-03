// src/components/navbar/MenuIcon.jsx

import React from 'react';

const MenuIcon = ({ isOpen }) => (
  <svg 
    className={`w-6 h-6 transition-transform duration-300 text-white`} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
);

export default MenuIcon;