// src/components/navbar/Navbar.jsx

import React, { useState } from "react";
import { navItems } from './navItems';
import NavItem from "./NavItem";
import MenuIcon from "../common/MenuIcon";
import ScrollButton from "../common/ScrollButton";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🎯 Истифодаи custom hook барои слайдер
  const { scrollRef, showLeftScroll, showRightScroll, scrollMenu, checkScroll } = useHorizontalScroll({
    scrollAmount: 200
  });

  const navigate = useNavigate();
  const location = useLocation();

  const goToProfile = () => navigate('/profile');
  const isActive = location.pathname === '/profile';

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`
        bg-(--bg-nav) w-full p-2 min-[500px]:p-3
        flex justify-between items-center relative 
        shadow-xl shadow-black/50 z-50 rounded-2xl
      `}
    >

      {/* 1. Логотип */}
      <div className="flex items-center z-50 shrink-0">
        <h1 className={`font-extrabold text-2xl leading-none text-(--color-accent) cursor-pointer`}>
          FITNESS
        </h1>
      </div>

      {/* 2. Контейнери асосии Desktop Menu (Бо тирчаҳо) */}
      <div
        className="
          hidden min-[500px]:flex items-center mx-3 flex-1 justify-center relative 
          min-w-0
        "
      >

        {/* Тугмаи Чап */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50">
          <ScrollButton
            direction="left"
            onClick={() => scrollMenu('left')}
            isVisible={showLeftScroll}
            className="hidden min-[500px]:flex"
          />
        </div>

        {/* Контейнери менюи ғеҷондашаванда */}
        <nav
          ref={scrollRef}
          id="nav-menu-desktop"
          className={`
              flex flex-row gap-2 items-center mx-10
              min-[500px]:flex-nowrap               
              min-[500px]:overflow-x-auto           
              min-[500px]:overflow-y-hidden         
              scrollbar-hide
            `}
          onScroll={checkScroll}
        >
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              onClick={closeMenu}
            />
          ))}
        </nav>

        {/* Тугмаи Рост */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50">
          <ScrollButton
            direction="right"
            onClick={() => scrollMenu('right')}
            isVisible={showRightScroll}
            className="hidden min-[500px]:flex"
          />
        </div>

      </div>

      {/* 3. Қисми Рост: Аккаунт ва Бургер */}
      <div className="flex items-center gap-4 z-50 shrink-0">

        <div className="hidden min-[500px]:flex items-center">
          <button
            onClick={goToProfile}
            title="Профил"
            className={`cursor-pointer p-1 rounded-full transition 
              ${isActive ? 'border-2 border-(--color-accent)' : 'border-2 border-white hover:text-(--color-accent) hover:border-(--color-accent)'}
            `}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-base">
              <FaUser
                className={`
                  w-5 h-5  
                  hover:text-(--color-accent) 
                  ${isActive ? 'text-(--color-accent)' : 'text-white'}
                  transition-colors duration-200
                `}
              />
            </div>
          </button>
        </div>

        <button
          className={`
            cursor-pointer p-1.5 rounded transition-colors duration-200
            hover:bg-white/10 min-[500px]:hidden
          `}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon isOpen={menuOpen} />
        </button>
      </div>

      {/* 4. Менюи Мобилӣ */}
      <nav
        id="nav-menu-mobile"
        className={`
          fixed top-16 left-0 right-0 w-full min-h-[calc(100vh-64px)]
          bg-(--bg-mobile-menu) p-6 flex-col gap-1 shadow-2xl z-40 
          transition-transform duration-300 ease-in-out
          
          ${menuOpen ? 'translate-x-0 flex' : 'translate-x-full hidden'}
          
          min-[500px]:hidden 
        `}
        onClick={closeMenu}
      >
        {navItems.map((item) => (
          <NavItem
            key={`mobile-${item.to}`}
            to={item.to}
            label={item.label}
            onClick={closeMenu}
          />
        ))}
      </nav>

    </header>
  );
}
