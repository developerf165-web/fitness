import React from "react";
import { useBalanceModalLogic } from "./useBalanceModalLogic";
import { BalanceModalView } from "./BalanceModalView";

const BalanceModal = ({
  isOpen,
  currentBalance = 500,
  currentBonuses = 100,
  mode = "refill",
  onClose,
  onConfirm,
  cardId,
}) => {
  const {
    amount,
    setAmount,
    comment,
    setComment,
    handleConfirm,
    isConfirmButtonDisabled,
    isProcessing,
    transactionError,
    setTransactionError,
  } = useBalanceModalLogic({ isOpen, mode, onConfirm, cardId });

  const handleClose = () => {
    setTransactionError(null);
    onClose();
  };

  return (
    <BalanceModalView
      isOpen={isOpen}
      mode={mode}
      onClose={onClose}
      currentBalance={currentBalance}
      currentBonuses={currentBonuses}
      amount={amount}
      setAmount={setAmount}
      comment={comment}
      setComment={setComment}
      handleConfirm={handleConfirm}
      handleClose={handleClose}
      isConfirmButtonDisabled={isConfirmButtonDisabled}
      isProcessing={isProcessing}
      transactionError={transactionError}
    />
  );
};

export default BalanceModal;