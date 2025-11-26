// src/components/navbar/Navbar.jsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import { navItems } from './navItems';
import NavItem from "./NavItem";
import MenuIcon from "./MenuIcon";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

// ⬅️ Компоненти хурд барои тугмаҳои слайдер
const ScrollButton = ({ direction, onClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={`
        hidden min-[500px]:flex items-center justify-center p-1 
        text-white/80 hover:text-[var(--color-accent)] 
        bg-[var(--bg-nav)] transition-colors duration-200 z-50
        shadow-lg h-8 w-8 flex-shrink-0 cursor-pointer
      `}
      aria-label={`${direction === 'left' ? 'Scroll Left' : 'Scroll Right'}`}
    >
      {direction === 'left' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </button>
  );
};


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null); 

  const navigate = useNavigate();
  const location = useLocation();

  const goToProfile = () => navigate('/profile');

  const isActive = location.pathname === '/profile';
  
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  
  const toggleMenu = () => setMenuOpen(prev => !prev); 
  const closeMenu = () => setMenuOpen(false); 

  const scrollMenu = useCallback((direction) => {
    if (navRef.current) {
      const scrollAmount = 200; 
      navRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth' 
      });
    }
  }, []);

  const checkScroll = useCallback(() => {
    if (navRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = navRef.current;
      const isScrollable = scrollWidth > clientWidth;
      setShowLeftScroll(isScrollable && scrollLeft > 0);
      setShowRightScroll(isScrollable && Math.ceil(scrollLeft) + clientWidth < scrollWidth);
    }
  }, []);

  useEffect(() => {
    // 💡 Мо бояд ба элементи 'nav' гӯш диҳем
    const navElement = navRef.current;
    if (navElement) {
      checkScroll();
      
      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(navElement);

      window.addEventListener('resize', checkScroll);
      
      return () => {
        resizeObserver.unobserve(navElement);
        window.removeEventListener('resize', checkScroll);
      };
    }
    // Мо checkScroll-ро илова мекунем, то боварӣ ҳосил кунем, ки navRef.current вуҷуд дорад
  }, [checkScroll, navRef.current]); // 'navRef.current' илова карда шуд


  return (
    <header 
      className={`
        bg-[var(--bg-nav)] w-full p-2 min-[500px]:p-3
        flex justify-between items-center relative 
        shadow-xl shadow-black/50 z-50 rounded-2xl
      `}
    >
      
      <div className="flex items-center z-50 flex-shrink-0">
        <h1 className={`font-extrabold text-2xl leading-none text-[var(--color-accent)] cursor-pointer`}>
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
             <ScrollButton direction="left" onClick={() => scrollMenu('left')} isVisible={showLeftScroll} />
          </div>
          
          {/* Контейнери менюи ғеҷондашаванда */}
          <nav 
            ref={navRef} 
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
            <ScrollButton direction="right" onClick={() => scrollMenu('right')} isVisible={showRightScroll} />
          </div>

      </div>

      {/* 3. Қисми Рост: Аккаунт ва Бургер */}
      <div className="flex items-center gap-4 z-50 flex-shrink-0">
        
        <div className="hidden min-[500px]:flex items-center">
          <button 
            onClick={goToProfile} 
            title="Профил"
            className={`cursor-pointer p-1 rounded-full transition 
              ${isActive ? 'border-2 border-[var(--color-accent)]' : 'border-2 border-white hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]'}
            `}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-base">
              <FaUser
                className={`
                  w-5 h-5  
                  hover:text-[var(--color-accent)] 
                  ${isActive ? 'text-[var(--color-accent)]' : 'text-white'}
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
          fixed top-[64px] left-0 right-0 w-full min-h-[calc(100vh-64px)]
          bg-[var(--bg-mobile-menu)] p-6 flex-col gap-1 shadow-2xl z-40 
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