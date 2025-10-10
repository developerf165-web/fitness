import React, { useState } from "react";
import Card from "@/components/ui/Card";
import InputField from "@/components/ui/InputField";
import FormButton from "@/components/ui/FormButton";
import Modal from "@/components/ui/Modal";

const cardOptions = [
  { value: "gold", label: "gold" },
  { value: "platinum", label: "platinum" },
  { value: "premium", label: "premium" },
];

export default function UpgradeCardModal({
  isOpen,
  onClose,
  onConfirm,
  availableCards = cardOptions,
}) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  const MAX_SYMBOLS = 150;
  const isConfirmDisabled = !reason || !selectedCard;

  const resetForm = () => {
    setReason("");
    setDescription("");
    setSelectedCard("");
  };

  const handleConfirm = () => {
    if (isConfirmDisabled) {
      alert("Лутфан сабаб ва навъи кортро интихоб кунед.");
      return;
    }

    onConfirm({ reason, description, selectedCard });
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card
        title="ПОВЫСИТЬ КАРТУ"
      >
        <InputField
          label="Причина повышения"
          placeholder="Укажите причину повышения карты"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="text-xs"
        />

        <div className="mb-4">
          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value.slice(0, MAX_SYMBOLS))
            }
            rows="3"
            placeholder="Описание для клиента"
            className="w-full text-xs px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent resize-none"
          ></textarea>
          <p
            className={`text-xs text-right mt-1 ${
              description.length >= MAX_SYMBOLS - 10
                ? "text-red-400"
                : "text-neutral-400"
            }`}
          >
            {description.length} / {MAX_SYMBOLS} символов
          </p>
        </div>

        <div className="mb-10 ">
          <label className="pl-4 block text-sm font-medium color-accent mb-1">
            Карта
          </label>
          <select
            value={selectedCard}
            onChange={(e) => setSelectedCard(e.target.value)}
            className="w-full px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent cursor-pointer"
          >
            {availableCards.map((card) => (
              <option key={card.value} value={card.value} className="bg-neutral-800 hover:bg-neutral-700">
                {card.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <FormButton
            onClick={handleClose}
            className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold"
          >
            Отмена
          </FormButton>

          <FormButton
            onClick={handleConfirm}
            className={`flex-1 font-semibold text-white ${
              isConfirmDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-lime-600 hover:bg-lime-700"
            }`}
            disabled={isConfirmDisabled}
          >
            Повысить
          </FormButton>
        </div>
      </Card>
    </Modal>
  );
}
