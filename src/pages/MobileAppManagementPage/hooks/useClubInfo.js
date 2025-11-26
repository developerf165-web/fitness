import { useState } from "react";
import { modalConfigs } from "../constants";

// --- Custom hook that contains all logic and handlers --- //
export default function useClubInfo(initialClubInfo, initialContacts) {
  const [clubInfo, setClubInfo] = useState(initialClubInfo);
  const [contacts, setContacts] = useState(initialContacts);

  // Modal states
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [currentModalConfig, setCurrentModalConfig] = useState({});

  // --- Info edit ---
  const handleEditInfo = () => setIsInfoModalOpen(true);

  // --- Edit contact ---
  const handleEditContact = (item) => {
    setSelectedItem(item);
    setCurrentModalConfig(modalConfigs[item.type] || modalConfigs.link);
    setIsContactModalOpen(true);
  };

  // --- Delete contact ---
  const handleDeleteContact = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted:", selectedItem);
    setSelectedItem(null);
    setIsDeleteModalOpen(false);
  };

  // --- Close all modals ---
  const closeAll = () => {
    setIsInfoModalOpen(false);
    setIsContactModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  return {
    clubInfo,
    contacts,
    isInfoModalOpen,
    isContactModalOpen,
    isDeleteModalOpen,
    selectedItem,
    currentModalConfig,
    handleEditInfo,
    handleEditContact,
    handleDeleteContact,
    handleConfirmDelete,
    closeAll,
  };
}
