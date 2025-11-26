// src/components/navbar/NavItem.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, label, onClick }) => {
  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => 
        `
          text-sm transition-all duration-200 px-3 py-1.5 rounded-lg whitespace-nowrap
          
          text-[var(--color-text-muted)]
          
          lg:hover:text-[var(--color-accent)] 
          lg:hover:bg-[var(--bg-hover-active-desktop)]
          
          ${isActive 
            ? `color-accent bg-[var(--bg-hover-active-desktop)]` 
            : ''
          }

          w-full text-left p-3 lg:w-auto lg:text-center lg:p-1.5 
          ${!isActive && `hover:bg-[var(--bg-mobile-menu)]`}
        `
      }
    >
      {label}
    </NavLink>
  );
};

export default NavItem;