import React from "react";
import Modal from "/src/components/ui/Modal";
import Card from "/src/components/ui/Card";
import FormButton from "/src/components/ui/FormButton";
import AlertIcon from "@/components/Icons/AlertIcon";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "ПОДТВЕРДИТЕ УДАЛЕНИЕ",
  message = "Вы действительно хотите удалить этот элемент?",
  itemName,
  confirmText = "Удалить",
  cancelText = "Отмена",
  isSaving = false,
  actionError,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="w-[400px]">

        {/* Ошибки */}
        {actionError && (
          <div className="text-red-400 p-2 my-2 text-center border border-red-500 rounded-lg text-sm">
            {actionError}
          </div>
        )}

        {/* Заголовок + иконка */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">{title}</h2>

          <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-4">
            <AlertIcon />
          </div>

          <p className="text-md text-neutral-400 px-8">
            {message}
            {itemName && <span className="block text-white mt-1 font-medium">"{itemName}"</span>}
          </p>
        </div>

        {/* Кнопки */}
        <div className="flex justify-center space-x-20 px-8">
          <FormButton
            onClick={onClose}
            className="flex-1 color-bg-mini-card bg-hover-card cursor-pointer rounded-lg text-black font-semibold"
            disabled={isSaving}
          >
            {cancelText}
          </FormButton>

          <FormButton
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 cursor-pointer rounded-lg text-black font-semibold"
            disabled={isSaving}
          >
            {isSaving ? `${confirmText}...` : confirmText}
          </FormButton>
        </div>

      </Card>
    </Modal>
  );
}
