import React from "react";
import ConfirmationModal from "/src/pages/components/Cards/ConfirmationModal/ConfirmationModal";
import BalanceModal from "/src/pages/components/Cards/BalanceModal/BalanceModal";
import EditProfile from "@/components/Cards/EditProfile/EditProfile";

export default function ClientProfileModals({
  isDeleteModalOpen,
  isBlockModalOpen,
  isRefillModalOpen,
  isWithdrawModalOpen,
  isEditProfileOpen,
  setIsDeleteModalOpen,
  setIsBlockModalOpen,
  setIsRefillModalOpen,
  setIsWithdrawModalOpen,
  handleCloseEditProfile,
  handleActionSuccess,
  mainCard,
  bonusCard,
  userId,
  deleteDataItems,
  refetchProfile,
  isUnblockModalOpen,
  setIsUnblockModalOpen,
}) {
  const mainCardId = mainCard?.id;

  return (
    <>
      <EditProfile
        isOpen={isEditProfileOpen}
        onClose={handleCloseEditProfile}
        onProfileUpdated={handleActionSuccess}
        userId={userId}
        refetchProfile={refetchProfile}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        actionType="delete"
        targetId={userId}
        dataItems={deleteDataItems}
        onActionSuccess={handleActionSuccess}
      />

      <ConfirmationModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        actionType="disable"
        targetId={userId}
        dataItems={deleteDataItems}
        onActionSuccess={handleActionSuccess}
      />

      <ConfirmationModal
        isOpen={isUnblockModalOpen}
        onClose={() => setIsUnblockModalOpen(false)}
        actionType="enable" // АМАЛИ НАВ БАРОИ ФАЪОЛ КАРДАН (АЗ БЛОК БАРОВАРДАН)
        targetId={userId}
        dataItems={deleteDataItems}
        onActionSuccess={handleActionSuccess}
      />

      <BalanceModal
        isOpen={isRefillModalOpen}
        onClose={() => setIsRefillModalOpen(false)}
        onConfirm={handleActionSuccess}
        currentBalance={mainCard ? mainCard.balance : 0}
        currentBonuses={bonusCard ? bonusCard.balance : 0}
        mode="refill"
        cardId={mainCardId}
      />

      <BalanceModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleActionSuccess}
        currentBalance={mainCard ? mainCard.balance : 0}
        currentBonuses={bonusCard ? bonusCard.balance : 0}
        mode="withdraw"
        cardId={mainCardId}
      />
    </>
  );
}
