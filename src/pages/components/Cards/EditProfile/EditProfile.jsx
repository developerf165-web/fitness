import React from "react";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import ProfileForm from "@/components/forms/ProfileForm";

export default function EditProfile({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card title="РЕДАКТИРОВАНИЕ" className="w-[400px]">
        <ProfileForm onClose={onClose} />
      </Card>
    </Modal>
  );
}
