import React from "react";
import { useConfirmationModalLogic } from "./useConfirmationModalLogic";
import { ConfirmationModalView } from "./ConfirmationModalView";

const getConfig = (actionType, dataItems) => {
  switch (actionType) {
    case 'delete':
      return {
        title: "Удаление пользователя",
        message: "Вы уверены, что хотите безвозвратно удалить этого пользователя? Это действие нельзя отменить.",
        confirmButtonText: "Удалить",
        isDestructive: true,
        showTextarea: false,
        dataItems: dataItems,
      };
    case 'disable':
      return {
        title: "Блокировка пользователя",
        message: "Для отключения пользователя, пожалуйста, укажите причину блокировки. Это действие обратимо.",
        confirmButtonText: "Заблокировать",
        isDestructive: true,
        showTextarea: true,
        textareaLabel: "Причина блокировки",
        textareaPlaceholder: "Укажите причину блокировки (до 150 символов)",
        dataItems: dataItems,
      };
    case 'enable':
      return {
        title: "Разблокировка пользователя",
        message: "Вы уверены, что хотите разблокировать этого пользователя и восстановить ему доступ?",
        confirmButtonText: "Разблокировать",
        isDestructive: false,
        showTextarea: false,
        dataItems: dataItems,
      };
    case 'cancel': // <-- Махсус барои CourseCancelConfirmationModal
      return {
        title: "Отмена курса",
        message: "Вы действительно хотите отменить курс?",
        confirmButtonText: "Отменить",
        isDestructive: true,
        showTextarea: true,
        textareaLabel: "Причина отмены",
        textareaPlaceholder: "Укажите причину отмены курса",
        dataItems: dataItems, // Маълумоти курсро аз CourseCancelConfirmationModal қабул мекунад
      };
    default:
      return {
        title: "Подтверждение действия",
        message: "Вы уверены, что хотите выполнить это действие?",
        confirmButtonText: "Подтвердить",
        isDestructive: false,
        showTextarea: false,
        dataItems: dataItems,
      };
  }
};

const ConfirmationModal = ({
  isOpen,
  actionType,
  targetId, 
  dataItems = [], 
  onClose,
  onActionSuccess, 
}) => {
  
  const config = getConfig(actionType, dataItems);

  const {
    reason,
    setReason,
    handleConfirm,
    isProcessing,
    actionError,
    isConfirmButtonDisabled,
  } = useConfirmationModalLogic({ 
    isOpen, 
    actionType, 
    targetId, 
    onActionSuccess, 
    onClose 
  });

  return (
    <ConfirmationModalView
      isOpen={isOpen}
      onClose={onClose}
      handleConfirm={handleConfirm}
      
      title={config.title}
      message={config.message}
      confirmButtonText={config.confirmButtonText}
      isDestructive={config.isDestructive}
      dataItems={config.dataItems}
      showTextarea={config.showTextarea}
      textareaLabel={config.textareaLabel}
      textareaPlaceholder={config.textareaPlaceholder}

      reason={reason}
      setReason={setReason}
      isProcessing={isProcessing}
      actionError={actionError}
      isConfirmButtonDisabled={isConfirmButtonDisabled}
    />
  );
};

export default ConfirmationModal;