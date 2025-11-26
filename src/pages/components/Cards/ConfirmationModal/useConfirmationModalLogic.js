import { useState, useEffect, useCallback } from "react";
import { deleteUser, disableUser, activateUser } from "/src/services/ClientProfile/userService"; // activateUser-ро илова кунед

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

  const requiresReason = actionType === 'disable';
  const isConfirmButtonDisabled = isProcessing || (requiresReason && reason.trim().length === 0);

  const handleConfirm = useCallback(async () => {
    setIsProcessing(true);
    setActionError(null);

    if (requiresReason && reason.trim().length === 0) {
      setActionError("Пожалуйста, укажите причину.");
      setIsProcessing(false);
      return;
    }

    if (!targetId) {
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
      }
        
      onActionSuccess(actionType, targetId, reason.trim()); 
      onClose();
      
    } catch (err) {
      setActionError(err.message || "Произошла неизвестная ошибка при выполнении действия.");
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