import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="navbar"> 
      <div>
        <h1 className="logo">FITNESS</h1>
        <button 
          className="burger" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      <div>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/glavnaya" className={({ isActive }) => isActive ? "active" : ""}>
            Главная
          </NavLink>
          <NavLink to="/clienti" className={({ isActive }) => isActive ? "active" : ""}>
            Клиенты
          </NavLink>
          <NavLink to="/personal" className={({ isActive }) => isActive ? "active" : ""}>
            Персонал
          </NavLink>
          <NavLink to="/uslugi" className={({ isActive }) => isActive ? "active" : ""}>
            Услуги
          </NavLink>
          <NavLink to="novosti" className={({ isActive }) => isActive ? "active" : ""}>
            Новости
          </NavLink>
          <NavLink to="/rasilki" className={({ isActive }) => isActive ? "active" : ""}>
            Рассылки
          </NavLink>
          <NavLink to="/upravlenie" className={({ isActive }) => isActive ? "active" : ""}>
            Управление
          </NavLink>
          <NavLink to="/financi" className={({ isActive }) => isActive ? "active" : ""}>
            Финансы
          </NavLink>
          <NavLink to="/shkafchiki" className={({ isActive }) => isActive ? "active" : ""}>
            Шкафчики
          </NavLink>
          <NavLink to="/producti" className={({ isActive }) => isActive ? "active" : ""}>
            Продукты
          </NavLink>


          {menuOpen && (
            <div className="nav-user-mobile">
              <span className="icon">Аккаунт</span>
            </div>
          )}
        </nav>
      </div>

      <div className={`nav-user ${menuOpen ? "hidden-mobile" : ""}`}>
        <span className="icon">
          <img src="/images/iim.png" alt="" />
        </span>
      </div>
    </header>
  );
}
