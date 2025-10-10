import React, { useState, useMemo } from "react";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import InputField from "@/components/ui/InputField";
import TextArea from "@/components/ui/TextArea";
import SelectField from "@/components/ui/SelectField";
import FormButton from "@/components/ui/FormButton";

const cardOptions = [
  { value: "basic", label: "Базовая Карта" },
  { value: "bronze", label: "Бронзовая Карта" },
  { value: "silver", label: "Серебряная Карта" },
  { value: "gold", label: "Золотая Карта" }, 
];

/**
 * Модал барои амалиёти корт (Понизит ё Повисит).
 *
 * @param {boolean} isOpen - Мавҷудияти модал
 * @param {function} onClose - Функсияи пӯшидани модал
 * @param {function} onConfirm - Функсияи тасдиқи амалиёт ({ reason, description, selectedCard })
 * @param {'downgrade' | 'upgrade'} actionType - Намуди амал: 'downgrade' (понизит) ё 'upgrade' (повисит)
 * @param {Array<{value: string, label: string}>} availableCards - Рӯйхати кортҳои дастрас
 */
export default function CardActionModal({
  isOpen,
  onClose,
  onConfirm,
  actionType = "downgrade", 
  availableCards = cardOptions,
}) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  const MAX_SYMBOLS = 150;
  const isConfirmDisabled = !reason || !selectedCard;

  const { title, reasonLabel, reasonPlaceholder, confirmButtonText } = useMemo(() => {
    const isDowngrade = actionType === 'downgrade';
    return {
      title: isDowngrade ? "ПОНИЗИТЬ КАРТУ" : "ПОВЫСИТЬ КАРТУ",
      reasonLabel: isDowngrade ? "Причина понижения" : "Причина повышения",
      reasonPlaceholder: isDowngrade ? "Укажите причину понижения карты" : "Укажите причину повышения карты",
      confirmButtonText: isDowngrade ? "Понизить" : "Повысить",
    };
  }, [actionType]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleConfirm = () => {
    if (isConfirmDisabled) return;
    onConfirm({ reason, description, selectedCard, actionType });
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setReason("");
    setDescription("");
    setSelectedCard("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card title={title}>
        <InputField
          label={reasonLabel}
          placeholder={reasonPlaceholder}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <TextArea
          label="Описание для клиента"
          placeholder="Описание для клиента"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value.slice(0, MAX_SYMBOLS))
          }
          rows={3}
          maxLength={MAX_SYMBOLS}
        />

        <SelectField
          label="Карта"
          placeholder="Выберите карту"
          value={selectedCard}
          onChange={(e) => setSelectedCard(e.target.value)}
          options={availableCards}
          className="mb-8"
        />

        <div className="flex justify-end space-x-4">
          <FormButton
            onClick={handleClose}
            className="flex-1 color-bg-mini-card bg-hover-card"
          >
            Отмена
          </FormButton>

          <FormButton
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className={
              isConfirmDisabled
                ? "flex-1 bg-gray-600 cursor-not-allowed"
                : "flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold"
            }
          >
            {confirmButtonText}
          </FormButton>
        </div>
      </Card>
    </Modal>
  );
}