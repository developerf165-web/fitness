// src/hooks/useDelayedLoading.js

import { useState, useEffect } from 'react';

// Муддати ҳадди ақалле, ки боркунӣ бояд давом кунад, то нишон дода шавад
const MIN_DISPLAY_TIME = 300; // 300 миллисония

/**
 * useDelayedLoading: 
 * Барои пешгирӣ аз "дурахш" ё "лип-лип"-и индикатори боркунӣ дар дархостҳои зуд.
 *
 * @param {boolean} isLoading - Ҳолати аслии loading (масалан, аз useUsersData).
 * @returns {boolean} - Ҳолати loading, ки бо таъхир нишон дода мешавад.
 */
export function useDelayedLoading(isLoading) {
  const [showLoading, setShowLoading] = useState(false);
  
  useEffect(() => {
    let timer;

    if (isLoading) {
      // Агар isLoading ба true гузарад, таймерро насб мекунем
      // Ва setShowLoading танҳо пас аз MIN_DISPLAY_TIME ба true мегузарад
      timer = setTimeout(() => {
        setShowLoading(true);
      }, MIN_DISPLAY_TIME);
    } else {
      // Агар isLoading ба false гузарад (боркунӣ тамом шавад),
      // мо таймерро тоза мекунем ва setShowLoading-ро фавран ба false мегузаронем.
      clearTimeout(timer);
      setShowLoading(false);
    }

    // Тозакунӣ (Cleanup): Вақте ки эффект дубора кор мекунад ё компонент нест мешавад
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  return showLoading;
}