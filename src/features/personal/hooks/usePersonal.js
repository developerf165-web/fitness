import { useState, useMemo, useEffect } from 'react';
import { getAllCoaches } from '@services/Personal/coachService';

export const usePersonal = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch coaches from API
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true);
        const data = await getAllCoaches();

        // Map API data to table format
        const mappedData = data.map(coach => ({
          id: coach.id,
          serverId: coach.id, // For navigation
          name: `${coach.name} ${coach.surname}`, // Added name for AvatarCell
          fullName: `${coach.name} ${coach.surname}`,
          avatar: coach.avatar ? `http://84.54.31.36:8081/${coach.avatar}` : null, // Fixed avatar URL
          position: coach.directions?.length > 0
            ? (coach.directions.length > 1
              ? `${coach.directions[0].title} +${coach.directions.length - 1}`
              : coach.directions[0].title)
            : 'Тренер',
          staffstatus: coach.status === 1 ? 'На работе' : 'На карантине',
          phone: coach.phone,
          experience: coach.work_experience,
          color: coach.color, // Added color field
          // Keep original data for edit modal
          originalData: coach
        }));

        setCoaches(mappedData);
      } catch (error) {
        console.error('Error loading coaches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, [refreshTrigger]);

  const staffData = coaches;

  const onWorkStaff = useMemo(
    () => staffData.filter((staff) => staff.staffstatus === "На работе"),
    [staffData]
  );

  const onHolidayStaff = useMemo(
    () => staffData.filter((staff) => staff.staffstatus === "На карантине"),
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
    refetchStaffData,
    loading, // NEW: return loading state
  };
};