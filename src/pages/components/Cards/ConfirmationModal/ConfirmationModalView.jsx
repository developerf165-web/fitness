import React from "react";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import FormButton from "@/components/ui/FormButton";
import AlertIcon from "@/components/Icons/AlertIcon";

export const ConfirmationModalView = ({
  isOpen,
  title,
  message,
  dataItems,
  confirmButtonText,
  onClose,
  handleConfirm,
  isDestructive,
  showTextarea,
  textareaLabel,
  textareaPlaceholder,
  reason,
  setReason,
  isProcessing,
  actionError,
  isConfirmButtonDisabled,
}) => {
  const confirmButtonClass = isDestructive
    ? "bg-red-600 hover:bg-red-700"
    : "color-bg-accent hover:bg-lime-200 text-black";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="w-[400px]">
        
        {actionError && (
          <div className="text-red-400 p-2 my-2 text-center border border-red-500 rounded-lg text-sm">
            {actionError}
          </div>
        )}

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-4">
            <AlertIcon />
          </div>
          <p className="px-13 text-xs text-neutral-400">{message}</p>
        </div>

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
              disabled={isProcessing}
            />
            <p className="text-right text-xs text-neutral-400 mt-1">
              {reason.length} / 150
            </p>
          </div>
        )}
        
        <div className="flex justify-center space-x-20 px-8">
          <FormButton
            onClick={onClose}
            className="flex-1 color-bg-mini-card bg-hover-card cursor-pointer rounded-lg text-black font-semibold"
            disabled={isProcessing}
          >
            Отмена
          </FormButton>

          <FormButton
            onClick={handleConfirm}
            className={`flex-1 text-black font-semibold cursor-pointer rounded-lg ${confirmButtonClass}`}
            disabled={isConfirmButtonDisabled}
          >
            {isProcessing ? "Обработка..." : confirmButtonText}
          </FormButton>
        </div>
      </Card>
    </Modal>
  );
};