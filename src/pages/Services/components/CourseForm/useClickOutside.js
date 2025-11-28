// fileName: useClickOutside.js
import { useEffect } from 'react';

/**
 * Hook-и React барои иҷро кардани функсия вақте ки корбар берун аз элементи ref-шуда клик мекунад.
 * @param {React.MutableRefObject} ref - Ref-и элементе, ки бояд назорат карда шавад.
 * @param {function} handler - Функсияе, ки ҳангоми клики беруна иҷро мешавад.
 */
export default function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Ҳеҷ коре намекунем, агар клик дар дохили ref ё elelment-и он бошад.
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Ҳангоми клики берун аз элемент, handler-ро иҷро кунед.
      handler(event);
    };

    // Танҳо 'mousedown'-ро истифода мебарем, то пӯшидашавӣ ҳангоми scroll-и модал пешгирӣ шавад.
    document.addEventListener('mousedown', listener); 
    // document.addEventListener('touchstart', listener); // <-- ИН ХОРИҶ ШУД

    return () => {
      document.removeEventListener('mousedown', listener);
      // document.removeEventListener('touchstart', listener); 
    };
  }, [ref, handler]); // Зарур аст, ки ref ва handler-ро дар dependencies дохил кунем
}