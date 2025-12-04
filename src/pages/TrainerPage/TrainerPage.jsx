import React, { useState, useEffect } from 'react';
import UserProfileCard from '../components/trainer/UserProfileCard';
import StatsDashboard from '../components/trainer/StatsDashboard.jsx';
import ActivityChart from '../components/trainer/ActivityChart/index.jsx';
import ScheduleCalendar from '../components/trainer/Schedule/ScheduleCalendar';
import ClientCoursesTable from '../components/trainer/ClientCoursesTable/ClientCoursesTable';
import ReviewsSection from '../components/trainer/ReviewsSection';
import ProfileHeader from '../components/trainer/ProfileHeader';
import { chartData } from '../components/data/chartData'
import { useNavigate, useParams } from 'react-router-dom';
import PrivilegesGrid from './Privileges/PrivilegesGrid.jsx';
import { getCoachById } from '../../services/Personal/coachService';

function TrainerPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coachData, setCoachData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await getCoachById(id);
          setCoachData(data);
        }
      } catch (error) {
        console.error('Error loading coach:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    console.log("Мубодила...");
  };

  const handleCoachUpdate = async () => {
    // Refetch data after update
    try {
      if (id) {
        const data = await getCoachById(id);
        setCoachData(data);
      }
    } catch (error) {
      console.error('Error refreshing coach:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  }

  if (!coachData) {
    return <div className="flex justify-center items-center min-h-screen text-white">Coach not found</div>;
  }

  return (
    <div className="flex flex-col items-center my-4 space-y-8">
      <ProfileHeader
        onBackClick={handleBack}
        onShareClick={handleShare}
      />
      <UserProfileCard
        trainerData={coachData}
        onUpdate={handleCoachUpdate}
      />

      <StatsDashboard />
      <PrivilegesGrid />
      <ActivityChart data={chartData} />
      <ScheduleCalendar />
      <ClientCoursesTable />
      <ReviewsSection />

    </div>
  );
}

export default TrainerPage;