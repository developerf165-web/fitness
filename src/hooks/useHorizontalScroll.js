// src/hooks/useHorizontalScroll.js

import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom Hook барои идораи слайдери горизонталӣ
 * @param {object} options - Танзимот
 * @param {number} options.scrollAmount - Миқдори scroll (пешфарз: 200px)
 * @param {Array} options.dependencies - Вобастагиҳо барои санҷидани дубора (масалан, рӯйхати филтршуда)
 * @returns {object} - Объект бо ref, функсияҳо ва ҳолатҳо
 */
const useHorizontalScroll = ({ scrollAmount = 200, dependencies = [] } = {}) => {
  const scrollRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  // Функсия барои scroll кардан
  const scrollMenu = useCallback((direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [scrollAmount]);

  // Функсия барои санҷидани ҳолати scroll
  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      const isScrollable = scrollWidth > clientWidth;

      setShowLeftScroll(isScrollable && scrollLeft > 0);
      setShowRightScroll(isScrollable && Math.ceil(scrollLeft) + clientWidth < scrollWidth);
    }
  }, []);

  // Effect барои тамошо кардани тағйироти андоза ва scroll
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      checkScroll();

      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(scrollElement);

      window.addEventListener('resize', checkScroll);

      return () => {
        resizeObserver.unobserve(scrollElement);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll]);

  // Effect барои санҷидани дубора вақте ки вобастагиҳо тағйир меёбанд
  useEffect(() => {
    // Интизори як лаҳза барои рендер шудани элементҳои нав
    const timer = setTimeout(() => {
      checkScroll();
    }, 100);

    return () => clearTimeout(timer);
  }, dependencies);

  return {
    scrollRef,           // ref барои элементи scroll
    showLeftScroll,      // оё тугмаи чапро нишон диҳем
    showRightScroll,     // оё тугмаи ростро нишон диҳем
    scrollMenu,          // функсия барои scroll кардан
    checkScroll          // функсия барои санҷидани ҳолати scroll
  };
};

export default useHorizontalScroll;
