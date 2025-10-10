import React, { useState } from 'react';
import ConfirmPasswordModal from './ConfirmPasswordModal'; 

function ConfirmPasPage() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(true); 

  const handleConfirmation = (code) => {
    console.log('Коди тасдиқкунанда гирифта шуд:', code);
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-10">
      <h1 className="text-white text-3xl mb-6">Саҳифаи Модалҳо</h1>

      <button
        onClick={() => setIsConfirmModalOpen(true)}
        className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition"
      >
        Кушодани Тасдиқ
      </button>

      <ConfirmPasswordModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        phoneNumber="+992 92 000 00 00"
        onConfirm={handleConfirmation}
      />
    </div>
  );
}

export default ConfirmPasPage;