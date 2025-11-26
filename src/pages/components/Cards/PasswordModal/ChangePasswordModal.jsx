import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";

export default function ChangePasswordModal({ isOpen, onClose, onSave, isSaving }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = () => {
    if (!oldPassword || !newPassword || !repeatPassword) {
      alert("Лутфан ҳамаи майдонҳоро пур кунед.");
      return;
    }
    if (newPassword !== repeatPassword) {
      alert("Паролҳо мувофиқат намекунанд!");
      return;
    }

    onSave({ oldPassword, newPassword });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card title="Изменить пароль" className="w-[380px]">
        <InputField
          label="Старый пароль"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Введите старый пароль"
        />

        <InputField
          label="Новый пароль"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Введите новый пароль"
        />

        <InputField
          label="Повторите пароль"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          placeholder="Повторите новый пароль"
        />

        <div className="flex justify-between gap-3 mt-4">
          <Button variant="default" onClick={onClose}>
            Отмена
          </Button>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </Card>
    </Modal>
  );
}
