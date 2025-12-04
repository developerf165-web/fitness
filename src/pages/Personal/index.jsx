import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersonal } from '../../features/personal/hooks/usePersonal';
import DashboardHeader from '../Dashboard/components/DashboardHeader';
import SearchComponent from '../Dashboard/components/SearchComponent';
import Table from '../Dashboard/components/Table/Table';
import AddModalWrapper from "../components/AddModalWrapper/AddModalWrapper";
import Modal from '../components/ui/Modal';

export default function PersonalPage() {
  const navigate = useNavigate();

  const {
    staffData,
    onWorkStaff,
    onHolidayStaff,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    refetchStaffData,
    loading,
  } = usePersonal();

  const handleRowClick = (trainer) => {
    navigate(`/trainer/${trainer.id}`);
  };

  return (
    <div className="bg-black min-h-screen relative">
      <DashboardHeader pageName="Персонал" onAdd={openAddModal} />
      <SearchComponent data={staffData} />

      <div className="py-4">
        <Table
          data={onWorkStaff}
          headers={["ФИО", "Должность", "Статус работы"]}
          fields={["avatar", "position", "staffstatus"]}
          loading={loading}
          onRowClick={handleRowClick}
          minHeight={false}
        />
        <div className="h-6" />
        <Table
          data={onHolidayStaff}
          headers={["ФИО", "Должность", "Статус работы"]}
          fields={["avatar", "position", "staffstatus"]}
          loading={loading}
          onRowClick={handleRowClick}
          minHeight={false}
        />
      </div>

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <AddModalWrapper
          type="trainer"
          onClose={closeAddModal}
          onSuccess={refetchStaffData}
        />
      </Modal>
    </div>
  );
}