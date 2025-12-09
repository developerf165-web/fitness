import React from "react";
import Modal from "/src/components/ui/Modal";
import ProfileForm from "@/components/forms/ProfileForm";

export default function EditProfile({ isOpen, onClose, onProfileUpdated, userId, refetchProfile }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ProfileForm 
                onClose={onClose} 
                onUpdateSuccess={onProfileUpdated}
                userId={userId} 
                refetchProfile={refetchProfile}
            />
        </Modal>
    );
}