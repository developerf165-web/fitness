import React from "react";

import ClubHeader from "./ClubHeader";
import ContactSections from "./ContactSections";

import Modal from "/src/components/ui/Modal";
import DeleteConfirmationModal from "/src/components/ui/DeleteConfirmationModal";
import AddEditInfoModal from "../../modals/AddEditInfoModal";
import AddEditContactModal from "../../modals/AddEditContactModal";

import { initialClubInfo, initialContacts } from "../../constants";
import useClubInfo from "../../hooks/useClubInfo";

export default function ClubInfoCard() {
  const {
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
  } = useClubInfo(initialClubInfo, initialContacts);

  return (
    <>
      <div className="flex-1 min-w-[500px]">
        <ClubHeader clubInfo={clubInfo} onEditInfo={handleEditInfo} />

        <ContactSections
          contacts={contacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
      </div>

      <Modal isOpen={isInfoModalOpen} onClose={closeAll}>
        <AddEditInfoModal
          isOpen={isInfoModalOpen}
          onClose={closeAll}
          initialData={clubInfo}
        />
      </Modal>

      <Modal isOpen={isContactModalOpen} onClose={closeAll}>
        <AddEditContactModal
          isOpen={isContactModalOpen}
          onClose={closeAll}
          config={currentModalConfig}
          initialData={selectedItem}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeAll}
        onConfirm={handleConfirmDelete}
        itemName={
          selectedItem
            ? `${selectedItem.categoryTitle} — ${selectedItem.text}`
            : ""
        }
        customMessage={
          selectedItem
            ? `Вы действительно хотите удалить "${selectedItem.categoryTitle}" — "${selectedItem.text}"?`
            : ""
        }
      />


    </>
  );
}
