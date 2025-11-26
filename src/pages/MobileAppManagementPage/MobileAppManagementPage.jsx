import React, { useState } from 'react';
import Button from '../components/ui/Button';
import ClubInfoCard from './components/MobileAppManagement/ClubInfoCard';
import SplashScreenCard from './components/MobileAppManagement/SplashScreenCard';
import Modal from '@/components/ui/Modal';
import AddEditInfoModal from './modals/AddEditInfoModal';
import ProfileHeader from '../components/trainer/ProfileHeader';
import AddButton from '@/components/ui/AddButton';

export default function MobileAppManagementPage() {
  const [isAddInfoModalOpen, setIsAddInfoModalOpen] = useState(false);

  return (
    <>
      <div className="text-white pt-4">
        <ProfileHeader
          title="Управление мобильным приложением"
          rightContent={
            <AddButton onClick={() => setIsAddInfoModalOpen(true)}>
              Добавить
            </AddButton>
          }
        />

        <div className="flex flex-col gap-6 mt-4">
          <ClubInfoCard />
          <SplashScreenCard />
        </div>
      </div>

      <Modal isOpen={isAddInfoModalOpen} onClose={() => setIsAddInfoModalOpen(false)}>
        <AddEditInfoModal
          isOpen={isAddInfoModalOpen}
          onClose={() => setIsAddInfoModalOpen(false)}
          initialData={null}
        />
      </Modal>
    </>
  );
}
