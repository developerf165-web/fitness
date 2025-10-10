import React, {useState, useEffect} from "react";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import FormButton from "@/components/ui/FormButton";
import AlertIcon from "@/components/Icons/AlertIcon";

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  dataItems = [],
  confirmButtonText,
  onClose,
  onConfirm,
  isDestructive = true,
  showTextarea = false,
  textareaLabel = "Причина блокировки",
  textareaPlaceholder = "Укажите причину блокировки",
}) {
  const [reason, setReason] = useState("");


  const confirmButtonClass = isDestructive
    ? "bg-red-600 hover:bg-red-700"
    : "color-bg-accent hover:bg-lime-200 text-black";

      useEffect(() => {
    if (isOpen) {
      setReason("");
    }
  }, [isOpen]);
    
  const handleConfirm = () => {
    onConfirm(showTextarea ? reason : undefined);
      };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="w-[400px]">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-red-600 rounded-full mb-4">
            <AlertIcon />
          </div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="px-13 text-xs text-neutral-400">{message}</p>
        </div>

        {showTextarea && (
          <div className="mb-6 w-[90%] ml-2">
            <label className="block text-sm font-medium color-accent pl-6 mb-2">
              {textareaLabel}
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value.slice(0, 150))}
              placeholder={textareaPlaceholder}
              className="w-full m-2 text-xs h-24 p-2 bg-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:color-accent"
            />
            <p className="text-right text-xs text-neutral-400 mt-1">
              {reason.length} / 150
            </p>
          </div>
        )}

        {dataItems.length > 0 && (
          <div className="space-y-3 mb-6 px-16 rounded-lg">
            {dataItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-neutral-300 font-medium">{item.label}</span>
                <span className="color-accent font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        )}


        <div className="flex justify-center text-xs space-x-20 px-8">
          <FormButton
            onClick={onClose}
            className="flex-1 color-bg-mini-card cursor-pointer bg-hover-card"
          >
            Отмена
          </FormButton>

          <FormButton
            onClick={onConfirm}
            className={`flex-1 text-white cursor-pointer ${confirmButtonClass}`}
          >
            {confirmButtonText}
          </FormButton>
        </div>
      </Card>
    </Modal>
  );
}
