// src/components/Courses/CourseCancelConfirmationModal.jsx (Масалан)

import React from 'react';
import ConfirmationModal from '@/components/Cards/ConfirmationModal/ConfirmationModal'; // Роҳро ба ConfirmationModal тасдиқ кунед

// Барои ин компонент шумо бояд ActionType 'cancel'-ро дар ConfirmationModal.jsx муайян кунед.
// (Ба поён нигаред)

export default function CourseCancelConfirmationModal({ isOpen, onClose, courseData, onActionSuccess }) {
  if (!courseData) return null; // Агар маълумоти курс набошад, чизе нишон надиҳед

  const dataItems = [
    { label: "Курс", value: courseData.title || "Курс без названия" },
    // Агар шумо хоҳед, ки ID-ро низ нишон диҳед:
    // { label: "ID", value: courseData.id } 
  ];
  
  // Ба ConfirmationModal ҳамеша actionType="cancel"-ро мефиристем
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      actionType="cancel" 
      targetId={courseData.id} // ID-и курсе, ки бекор мешавад
      dataItems={dataItems} // Маълумоти иловагӣ дар бораи курс
      onActionSuccess={onActionSuccess} // Callback, ки тостерро нишон медиҳад
    />
  );
}