// src/pages/Services/modals/CardioCourseModal.jsx

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import CourseHeader from './components/CourseHeader';
import CourseContent from './components/CourseContent';
import ModalFooter from './components/ModalFooter';

const initialParticipants = [
    { id: 1, name: "Азиза Султанова", phone: "92 000 00 00", payment: "Не оплачено", date: "15.10.2023" },
    { id: 2, name: "Азиза Султанова", phone: "92 000 00 00", payment: "Оплачено", date: "15.10.2023" },
    { id: 3, name: "Азиза Султанова", phone: "92 000 00 00", payment: "Оплачено", date: "15.10.2023" },
    { id: 4, name: "Азиза Султанова", phone: "92 000 00 00", payment: "Оплачено", date: "15.10.2023" },
    { id: 5, name: "Азиза Султанова", phone: "92 000 00 00", payment: "Оплачено", date: "15.10.2023" },
];

export default function CardioCourseModal({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [participants, setParticipants] = useState(initialParticipants);

    const handleSave = () => {
        console.log("Сохранено");
        onClose();
    };

    const ModalContent = (
        <>
            <CourseHeader />
            <CourseContent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                participants={participants}
            />
        </>
    );

    const FooterContent = (
        <ModalFooter
            onCancel={onClose}
            onSave={handleSave}
            cancelText="Отмена"
            saveText="Сохранить"
        />
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ScrollableModalContentWrapper
                title=""
                content={ModalContent}
                footer={FooterContent}
            />
        </Modal>
    );
}
