import React, { useState } from 'react';
import ProfileDisplayCard from './components/profile/ProfileDisplayCard';
import ProfileEditForm from './components/profile/ProfileEditForm';
import ProfileHeader from '../components/trainer/ProfileHeader';
import ChangePasswordModal from '@/components/Cards/PasswordModal/ChangePasswordModal';

const initialUser = {
  id: 1,
  firstName: "Азиза",
  lastName: "Султанова",
  phone: "+992 000 00 00",
  role: "Владелец",
  imageUrl: "/images/profile_image.jpg",
};

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [isSaving, setIsSaving] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleSaveProfile = (updatedData) => {
    setIsSaving(true);

    setTimeout(() => {
      setUser(prev => ({ ...prev, ...updatedData }));
      setIsSaving(false);
      alert("Профил бомуваффақият навсозӣ шуд!");
    }, 1500);
  };

  const handleChangePasswordClick = () => {
    setIsPasswordModalOpen(true);
  };

  const handleChangePasswordSave = ({ oldPassword, newPassword }) => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setIsPasswordModalOpen(false);
      alert("Парол бомуваффақият иваз шуд!");
    }, 1500);
  };

  return (
    <div className="min-h-screen text-white mt-5">

      <ProfileHeader title="Профиль" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-4">

        <div className="h-full flex">
          <ProfileDisplayCard
            user={user}
            onChangePasswordClick={handleChangePasswordClick}
          />
        </div>

        <div className="h-full flex">
          <ProfileEditForm
            user={user}
            onSave={handleSaveProfile}
            isSaving={isSaving}
          />
        </div>

      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handleChangePasswordSave}
        isSaving={isSaving}
      />

    </div>
  );
}
