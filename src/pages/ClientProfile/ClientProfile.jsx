import React, { useState } from "react";
import { useClientProfileData } from "/src/hooks/useClientProfileData";
import ClientProfileSkeleton from "../components/Skeletons/ClientProfileSkeleton";
import ClientProfileContent from "./components/ClientProfileContent";
import ClientProfileModals from "./components/ClientProfileModals";
import { useToast } from "@/components/Toast/ToastContext";
import { useLocationStateToast } from "/src/pages/Dashboard/hooks/useLocationStateToast";

export default function ClientProfile() {
  const {
    loading,
    error,
    userData,
    refetchProfile,
    toastTrigger,
    ...allProps
  } = useClientProfileData();

  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const { showToast } = useToast();

  useLocationStateToast(showToast, refetchProfile, toastTrigger);

  if (loading) return <ClientProfileSkeleton />;
  if (error) return <div className="error-message">{error}</div>;
  if (!userData) return null;

  return (
    <div className="h-full overflow-y-auto">
      <ClientProfileContent
        {...allProps}
        userData={userData}
        refetchProfile={refetchProfile}
        setIsUnblockModalOpen={setIsUnblockModalOpen}
      />
      <ClientProfileModals
        {...allProps}
        userId={userData?.id || allProps.user} // Иловаи userId
        handleCloseEditProfile={allProps.handleCloseEditProfile} // Иловаи close handler
        refetchProfile={refetchProfile}
        mainCard={allProps.mainCard}
        bonusCard={allProps.bonusCard}
        deleteDataItems={allProps.deleteDataItems}
        isDeleteModalOpen={allProps.isDeleteModalOpen}
        isBlockModalOpen={allProps.isBlockModalOpen}
        isRefillModalOpen={allProps.isRefillModalOpen}
        isWithdrawModalOpen={allProps.isWithdrawModalOpen}
        isEditProfileOpen={allProps.isEditProfileOpen}
        setIsDeleteModalOpen={allProps.setIsDeleteModalOpen}
        setIsBlockModalOpen={allProps.setIsBlockModalOpen}
        setIsRefillModalOpen={allProps.setIsRefillModalOpen}
        setIsWithdrawModalOpen={allProps.setIsWithdrawModalOpen}
        handleActionSuccess={allProps.handleActionSuccess}
        isUnblockModalOpen={isUnblockModalOpen}
        setIsUnblockModalOpen={setIsUnblockModalOpen}
      />
    </div>
  );
}
