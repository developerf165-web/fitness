import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import InputField from "@/components/ui/InputField";
import FormButton from "@/components/ui/FormButton";

const BalanceModal = ({
  isOpen,
  currentBalance = 500,
  currentBonuses = 100,
  mode = "refill", 
  onClose,
  onConfirm,
}) => {
  const [amount, setAmount] = useState("");   
  const [comment, setComment] = useState(""); 

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      setComment("");
    }
  }, [isOpen]);



  const handleConfirm = () => {
    if (mode === "refill") {
      const numericAmount = parseFloat(amount);
      if (numericAmount > 0) {
        onConfirm(numericAmount);
        setAmount("");
      } else {
        alert("Пожалуйста, введите корректную сумму.");
      }
    } else if (mode === "withdraw") {
      if (comment.trim().length > 0) {
        onConfirm(comment.trim());
        setComment("");
      } else {
        alert("Пожалуйста, введите причину снятия");
      }
    }
  };

  const handleClose = () => {
    setAmount("");
    setComment("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="max-w-[350px]" title={mode === "refill" ? "ПОПОЛНИТЬ КАРТУ" : "СНЯТЬ ДЕНЬГИ"}>
        <InputField
          label="Сумма"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Введите сумму"

        />

        {mode === "withdraw" && (
          <div className="mb-5">
            <label className="block text-sm font-medium pl-4 mb-2 color-accent">
              Причина снятия
            </label>
            <textarea
              className="w-full p-3 text-xs rounded-lg color-bg-mini-card text-white resize-none focus:outline-none focus:ring-2 focus:color-accent"
              rows={4}
              maxLength={150}
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 150))}
              placeholder="Укажите причину снятия наличных"
            />
            <p className="text-right text-xs mt-1 text-gray-400">
              {comment.length}/150
            </p>
          </div>
        )}


        <div className="space-y-2 my-8 p-0 rounded-lg">
          <div className="flex justify-between">
            <span className="text-neutral-300 font-medium">На счету</span>
            <span className="color-accent font-semibold">
              {currentBalance} TJS
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-300 font-medium">Бонусы</span>
            <span className="color-accent font-semibold">
              {currentBonuses}
            </span>
          </div>
        </div>

        <div className="flex justify-between space-x-4">
          <FormButton
            onClick={handleClose}
            className="color-bg-mini-card hover:bg-hover-card text-white"
          >
            Отмена
          </FormButton>

          <FormButton
            onClick={handleConfirm}
            className={
              mode === "refill"
                ? parseFloat(amount) > 0
                  ? "color-bg-accent hover:bg-lime-200 text-black font-semibold"
                  : "color-bg-mini-card cursor-not-allowed text-white"
                : comment.trim().length > 0
                ? "color-bg-accent hover:bg-lime-200 text-black font-semibold"
                : "color-bg-mini-card cursor-not-allowed text-white"
            }
            disabled={
              mode === "refill"
                ? !(parseFloat(amount) > 0)
                : !(comment.trim().length > 0)
            }
          >
            {mode === "refill" ? "Пополнить" : "Снять"}
          </FormButton>
        </div>
      </Card>
    </Modal>
  );
};

export default BalanceModal;
