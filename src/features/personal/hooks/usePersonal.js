import { useState, useMemo } from 'react';
import { TableData } from "/src/pages/Dashboard/data/TableData";

export const usePersonal = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const staffData = useMemo(
    () => TableData.filter((user) => user.type === "staff"), 
    [refreshTrigger] // Dependency барои навсозӣ
  );

  const onWorkStaff = useMemo(
    () => staffData.filter((user) => user.staffstatus === "На работе"),
    [staffData] 
  );

  const onHolidayStaff = useMemo(
    () => staffData.filter((user) => user.staffstatus === "На карантине"),
    [staffData] 
  );
  
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  
  // Функсияи навсозӣ - баъд аз эҷоди муваффақ
  const refetchStaffData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return {
    staffData,
    onWorkStaff,
    onHolidayStaff,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    refetchStaffData, // Функсияи нав
  };
};