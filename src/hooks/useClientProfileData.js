import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "/src/services/apiGetUserById";

export const useClientProfileData = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  // ҲОЛАТИ НАВ БАРОИ МАҶБУР КАРДАНИ TOAST
  const [toastTrigger, setToastTrigger] = useState(0); 

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    if (!id) {
      setError("User ID not found in URL.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getUserById(id);
      setUserData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch user data.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserData();
  }, [fetchUserData]);
  
  // ФУНКСИЯИ ЁРИРАСОН БАРОИ ЗАХИРА ВА НАВИГАЦИЯ
  const setSuccessAndNavigate = useCallback((title, message) => {
    const TOAST_KEY = 'pending_toast_message';
    const toastMessage = { type: 'success', title: title, message: message };
    
    sessionStorage.setItem(TOAST_KEY, JSON.stringify(toastMessage));
    
    navigate('/clienti'); 
  }, [navigate]);

  // ФУНКСИЯИ ЁРИРАСОН БАРОИ ЗАХИРА БЕ НАВИГАЦИЯ (НАВСОЗӢ)
  const setSuccessToast = useCallback((title, message) => {
    const TOAST_KEY = 'pending_toast_message';
    const toastMessage = { type: 'success', title: title, message: message };
    
    sessionStorage.setItem(TOAST_KEY, JSON.stringify(toastMessage));
    // ТРИГГЕР-ро тағйир медиҳем, то ки usePersistentToast кор кунад
    setToastTrigger(prev => prev + 1); 
  }, []);


  const handleActionSuccess = useCallback(async (actionType, ...args) => {
    const userName = userData ? `${userData.name} ${userData.surname}` : "Пользователь";
    
    switch (actionType) {
      case 'delete':
        setSuccessAndNavigate('Удаление успешно!', `${userName} успешно удален.`);
        break;
      case 'disable':
        setSuccessAndNavigate('Блокировка успешно!', `${userName} успешно заблокирован.`);
        break;
      case 'enable':
        setSuccessToast('Разблокировка успешно!', `${userName} успешно разблокирован.`);
        await fetchUserData();
        break;
      case 'refill':
      case 'withdraw':
        await fetchUserData();
        break;
      default:
        break;
    }
  }, [fetchUserData, setSuccessAndNavigate, setSuccessToast, userData]);

  const handleOpenEditProfile = useCallback(() => setIsEditProfileOpen(true), []);
  const handleCloseEditProfile = useCallback(() => setIsEditProfileOpen(false), []);

  const handleDeleteConfirm = () => setIsDeleteModalOpen(false);
  const handleBlockConfirm = () => setIsBlockModalOpen(false);
  const handleRefillConfirm = () => setIsRefillModalOpen(false);
  const handleWithdrawConfirm = () => setIsWithdrawModalOpen(false);
  const handleUnblockConfirm = () => setIsUnblockModalOpen(false);

  const allCardsFromBackend = userData?.card || [];
  const mainCard = allCardsFromBackend.length > 0 ? allCardsFromBackend[0] : null;
  const additionalCards = allCardsFromBackend.length > 1 ? allCardsFromBackend.slice(1) : [];
  const bonusCard = additionalCards.length > 0 ? additionalCards[0] : null;
  const userName = userData ? `${userData.name} ${userData.surname}` : "";

  const deleteDataItems = [
    { label: "ФИО", value: userName }
  ];

  return {
    userData,
    loading,
    error,
    mainCard,
    additionalCards,
    bonusCard,
    userName,
    user: userData?.serverId || id,
    deleteDataItems,
    isDeleteModalOpen,
    isBlockModalOpen,
    isRefillModalOpen,
    isWithdrawModalOpen,
    isEditProfileOpen,
    isUnblockModalOpen,
    toastTrigger, // ТРИГГЕР-и навро бароварда истодаем
    setIsDeleteModalOpen,
    setIsBlockModalOpen,
    setIsRefillModalOpen,
    setIsWithdrawModalOpen,
    setIsUnblockModalOpen,
    handleOpenEditProfile,
    handleCloseEditProfile,
    handleDeleteConfirm,
    handleBlockConfirm,
    handleRefillConfirm,
    handleWithdrawConfirm,
    handleUnblockConfirm,
    handleActionSuccess,
    refetchProfile: fetchUserData
  };
};