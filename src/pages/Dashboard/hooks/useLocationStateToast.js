import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook барои нишон додани Toast, ки ба sessionStorage такя мекунад.
 * triggerValue (toastTrigger) барои маҷбур кардани кор дар ҳамон саҳифа истифода мешавад.
 */
export function useLocationStateToast(showToast, refetchData, triggerValue) {
  const location = useLocation();

  useEffect(() => {
    const TOAST_KEY = 'pending_toast_message';
    const toastJson = sessionStorage.getItem(TOAST_KEY);

    if (toastJson) {
      try {
        const toastMessage = JSON.parse(toastJson);
        const { type, title, message } = toastMessage;
        
        showToast(type, title, message);
        
        sessionStorage.removeItem(TOAST_KEY);

        if (refetchData) {
          refetchData();
        }
      } catch (e) {
        sessionStorage.removeItem(TOAST_KEY);
      }
    }
  }, [location.pathname, showToast, refetchData, triggerValue]); 
  // location.pathname барои гузариш байни саҳифаҳо
  // triggerValue барои амалиёт дар ҳамон саҳифа
}