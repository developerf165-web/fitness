import React from 'react';
import { usePersonal } from '../../features/personal/hooks/usePersonal';
import DashboardHeader from '../Dashboard/components/DashboardHeader';
import SearchComponent from '../Dashboard/components/SearchComponent';
import Table from '../Dashboard/components/Table/Table';
import AddModalWrapper from "../components/AddModalWrapper/AddModalWrapper";
import Modal from '../components/ui/Modal';

export default function PersonalPage() {
  const {
    staffData,
    onWorkStaff,
    onHolidayStaff,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    refetchStaffData,
  } = usePersonal();

  return (
    <div className="bg-black min-h-screen relative">
      <DashboardHeader pageName="Персонал" onAdd={openAddModal} />
      <SearchComponent data={staffData} />
      
      <div className="py-4"> 
        <Table
            data={onWorkStaff}
            headers={["ФИО", "Должность", "Статус работы"]}
            fields={["avatar", "position", "staffstatus"]}
        />
        <div className="h-6" />
        <Table
            data={onHolidayStaff}
            headers={["ФИО", "Должность", "Статус работы"]}
            fields={["avatar", "position", "staffstatus"]}
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