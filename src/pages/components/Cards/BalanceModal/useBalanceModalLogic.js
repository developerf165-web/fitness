import { useState, useEffect, useCallback } from "react";
import { refillCard, withdrawFromCard } from "/src/services/ClientProfile/transactionService"; 

export const useBalanceModalLogic = ({ isOpen, mode, onConfirm, cardId }) => {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionError, setTransactionError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      setComment("");
      setTransactionError(null);
    }
  }, [isOpen]);

  const handleConfirm = useCallback(async () => {
    setIsProcessing(true);
    setTransactionError(null);

    if (!cardId) {
      setTransactionError("Card ID is missing. Cannot perform transaction.");
      setIsProcessing(false);
      return;
    }

    const numericAmount = parseFloat(amount);
    if (numericAmount <= 0 || isNaN(numericAmount)) {
      alert("Пожалуйста, введите корректную сумму.");
      setIsProcessing(false);
      return;
    }

    try {
      if (mode === "refill") {
        await refillCard(cardId, numericAmount, comment.trim());
        // Ҳоло onConfirm (ки handleActionSuccess аст) танҳо actionType-ро талаб мекунад
        onConfirm(mode, cardId, numericAmount); 
      } else if (mode === "withdraw") {
        if (comment.trim().length === 0) {
          alert("Пожалуйста, введите причину снятия.");
          setIsProcessing(false);
          return;
        }
        await withdrawFromCard(cardId, numericAmount, comment.trim());
        // Ҳоло onConfirm (ки handleActionSuccess аст) танҳо actionType-ро талаб мекунад
        onConfirm(mode, cardId, numericAmount, comment.trim());
      }
    } catch (err) {
      console.error("Transaction Error:", err);
      setTransactionError(err.message || "Произошла неизвестная ошибка при выполнении операции.");
    } finally {
      setIsProcessing(false);
    }
  }, [amount, comment, mode, onConfirm, cardId]);
  
  const isConfirmButtonDisabled = 
    isProcessing || 
    !(parseFloat(amount) > 0) ||
    (mode === "withdraw" && comment.trim().length === 0);
      

  return {
    amount,
    setAmount,
    comment,
    setComment,
    handleConfirm,
    isConfirmButtonDisabled,
    isProcessing,
    transactionError,
    setTransactionError,
  };
};