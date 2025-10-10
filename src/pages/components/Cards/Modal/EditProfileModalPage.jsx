import React, { useState } from 'react';
import EditProfileModal from './EditProfileModal'; 


function EditProfileModalPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(true); // Барои санҷиш, онро кушода мондаем

  const handleSaveProfile = (updatedData) => {
    console.log('Профил таҳрир карда шуд:', updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-10">
      <h1 className="text-white text-3xl mb-6">Саҳифаи Профил</h1>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />

      <button
        onClick={() => setIsEditModalOpen(true)}
        className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition"
      >
        Кушодани Таҳрир
      </button>
    </div>
  );
}

export default EditProfileModalPage;