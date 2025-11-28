import { useState, useEffect, useCallback } from "react";
// Агар ин функсияҳо мавҷуд набошанд, ин сатрро тағир диҳед
import { deleteUser, disableUser, activateUser } from "/src/services/ClientProfile/userService"; 

export const useConfirmationModalLogic = ({ 
  isOpen, 
  actionType, 
  targetId, 
  onActionSuccess,
  onClose 
}) => {
  const [reason, setReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setActionError(null);
    }
  }, [isOpen]);

  // 'disable' ва 'cancel' сабабро талаб мекунанд
  const requiresReason = actionType === 'disable' || actionType === 'cancel'; 
  const isConfirmButtonDisabled = isProcessing || (requiresReason && reason.trim().length === 0);

  const handleConfirm = useCallback(async () => {
    setIsProcessing(true);
    setActionError(null);

    if (requiresReason && reason.trim().length === 0) {
      setActionError("Пожалуйста, укажите причину.");
      setIsProcessing(false);
      return;
    }

    if (!targetId && actionType !== 'cancel') {
      setActionError("ID цели отсутствует.");
      setIsProcessing(false);
      return;
    }

    try {
      if (actionType === 'delete') {
        await deleteUser(targetId);
      } else if (actionType === 'disable') {
        await disableUser(targetId, reason.trim());
      } else if (actionType === 'enable') {
        await activateUser(targetId);
      } else if (actionType === 'cancel') {
        // Логикаи API барои бекоркунии курс
        // Масалан: await cancelCourse(targetId, reason.trim()); 
        console.log(`API Call: Cancelling course ${targetId} with reason: ${reason}`);
        await new Promise(r => setTimeout(r, 300)); // Моки API Call
      }
        
      onActionSuccess(actionType, targetId, reason.trim()); 
      // onClose() дар onActionSuccess иҷро мешавад
      
    } catch (err) {
      setActionError(err.message || "Ошибка при выполнении действия.");
    } finally {
      setIsProcessing(false);
    }
  }, [actionType, targetId, reason, onActionSuccess, onClose, requiresReason]);

  return {
    reason,
    setReason,
    handleConfirm,
    isProcessing,
    actionError,
    isConfirmButtonDisabled,
  };
};