import { useState, useMemo } from 'react';
import { TableData } from "/src/pages/Dashboard/data/TableData";

export const usePersonal = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const staffData = useMemo(
    () => TableData.filter((user) => user.type === "staff"), 
    [] 
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

  return {
    staffData,
    onWorkStaff,
    onHolidayStaff,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
  };
};