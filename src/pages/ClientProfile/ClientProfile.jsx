import React, { useState } from "react";
import ProfileCard from "/src/components/ProfileCard/ProfileCard";
import StatsGrid from "/src/components/StatsGrid";
import Trainings from "/src/components/Trainings/Trainings";
import InfoCards from "/src/components/InfoCards/InfoCards";
import ConfirmationModal from "/src/pages/components/Cards/ConfirmationModal/ConfirmationModal"; 
import BalanceModal from "/src/pages/components/Cards/BalanceModal/BalanceModal"; 
// import UpgradeCardModal from "/src/pages/components/Cards/UpgradeCardModal/UpgradeCardModal"; 
// import DowngradeCardModal from "../components/Cards/DowngradeCardModal/DowngradeCardModal";
import CardActionModal from "../components/Cards/CardActionModal/CardActionModal";
import EditProfile from "../components/Cards/EditProfile/EditProfile";

const deleteDataItems = [
    { label: "Абонемент:", value: 12 },
    { label: "Массаж:", value: 5 },
    { label: "Танцы:", value: 10 },
    { label: "Йога:", value: 8 },
];


export default function ClientProfile() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);  
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  // const [isDowngradeOpen, setIsDowngradeOpen] = useState(false);
  // const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [balance, setBalance] = useState(500);
  const [bonuses, setBonuses] = useState(100);


  const handleOpenEditProfile = () => setIsEditProfileOpen(true);
  const handleCloseEditProfile = () => setIsEditProfileOpen(false);

  const handleRefillConfirm = (amount) => {
    console.log(`-> ПОПОЛНЕНИЕ НА ${amount} TJS ИҶРО ШУД!`);
    // Логикаи API-ро барои пур кардан дар ин ҷо илова кунед
    setBalance(prev => prev + amount); // Намунаи навсозии бақия
    setIsRefillModalOpen(false);
  };
  const handleWithdrawConfirm = (commentOrAmount) => {
    console.log("-> ЗАПРОС НА СНЯТИЕ:", commentOrAmount);
    // Дар ин ҷо API-ро менависӣ (масалан subtract аз balance)
    setIsWithdrawModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log("Удаление пользователя...");
    // Логикаи API-и нест карданро инҷо илова кунед
    setIsDeleteModalOpen(false);
  };

  const handleBlockConfirm = () => {
    console.log("Блокировка пользователя...");
    // Логикаи API-и маҳкам карданро инҷо илова кунед
    setIsBlockModalOpen(false);
  };

  const handleUpgradeConfirm = ({ reason, description, selectedCard }) => {
    console.log(`-> КОРТ БА ${selectedCard} БАЛАНД БАРДОШТА ШУД. Сабаб: ${reason}`);
    // Логикаи API-ро дар инҷо илова кунед
    setIsUpgradeOpen(false);
  };

  const handleDowngradeConfirm = ({ reason, description, selectedCard }) => {
    console.log(`-> КОРТ БА ${selectedCard} ПАСТ КАРДА ШУД. Сабаб: ${reason}`);
    // Логикаи API-ро дар инҷо илова кунед
    setIsDowngradeOpen(false);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="spacer">
        <span>‹</span>
      </div>
      <ProfileCard 
        onOpenDelete={() => setIsDeleteModalOpen(true)} 
        onOpenBlock={() => setIsBlockModalOpen(true)}
        onOpenRefill={() => setIsRefillModalOpen(true)}
        onOpenWithdraw={() => setIsWithdrawModalOpen(true)}
        onOpenEditProfile={handleOpenEditProfile}
      />
      <StatsGrid />
      <Trainings />
      <InfoCards />


      <EditProfile
          isOpen={isEditProfileOpen}
          onClose={handleCloseEditProfile}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Вы действительно хотите удалить этого пользователя?"
        message="При удалении пользователя аккаунт и все данные будут уничтожены."
        dataItems={deleteDataItems}
        confirmButtonText="Удалить"
        isDestructive={true}
      />

      <ConfirmationModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        onConfirm={handleBlockConfirm}
        title="Вы действительно хотите заблокировать этого пользователя?"
        message=""
        dataItems={deleteDataItems}
        confirmButtonText="Блокировать"
        isDestructive={true}
        showTextarea={true}
      />      

      <BalanceModal
        isOpen={isRefillModalOpen}
        onClose={() => setIsRefillModalOpen(false)}
        onConfirm={handleRefillConfirm}
        currentBalance={balance}
        currentBonuses={bonuses}
        mode="refill"
      />

      <BalanceModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleWithdrawConfirm}
        currentBalance={balance}
        currentBonuses={bonuses}
        mode="withdraw"
      />

      {/* <CardActionModal
        isOpen={isDowngradeOpen}
        onClose={() => setIsDowngradeOpen(false)}
        onConfirm={handleDowngradeConfirm}
        actionType="downgrade" 
      />


      <CardActionModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onConfirm={handleUpgradeConfirm}
        actionType="upgrade" 
      /> */}
    </div>
  );
}
