import React from "react";
import ProfileCard from "/src/components/ProfileCard/ProfileCard";
import StatsGrid from "/src/components/StatsGrid";
import Trainings from "/src/components/Trainings/Trainings";
import TransactionPage from "/src/components/Transaction/TransactionPage";
import BackButton from "/src/components/ui/BackButton";


export default function ClientProfileContent({
  userData,
  mainCard,
  additionalCards,
  userName,
  // Функсияҳои Кушодани Модалҳо
  setIsDeleteModalOpen,
  setIsBlockModalOpen,
  setIsRefillModalOpen,
  setIsWithdrawModalOpen,
  handleOpenEditProfile,
  setIsUnblockModalOpen,
}) {
  const userId = mainCard ? mainCard.id : null;

  return (
    <>
      <div className="mb-3 mt-4 pl-0">
        <BackButton className="hover:text-[#A1A1A1]" />
      </div>


      <ProfileCard
        userData={userData}
        onOpenDelete={() => setIsDeleteModalOpen(true)}
        onOpenBlock={() => setIsBlockModalOpen(true)}
        onOpenRefill={() => setIsRefillModalOpen(true)}
        onOpenWithdraw={() => setIsWithdrawModalOpen(true)}
        onOpenEditProfile={handleOpenEditProfile}
        onOpenUnblock={() => setIsUnblockModalOpen(true)}
      />

      <StatsGrid enrollServices={userData.enroll_services || []} />

      <Trainings
        mainCard={mainCard}
        additionalCards={additionalCards}
        userName={userName}
      />

      <TransactionPage userId={userId} />
    </>
  );
}