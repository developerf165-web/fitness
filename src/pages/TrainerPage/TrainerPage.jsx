import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserProfileCard from '../components/trainer/UserProfileCard';
import StatsDashboard from '../components/trainer/StatsDashboard.jsx';
import ActivityChart from '../components/trainer/ActivityChart/index.jsx';
import ScheduleCalendar from '../components/trainer/Schedule/ScheduleCalendar';
import ClientCoursesTable from '../components/trainer/ClientCoursesTable/ClientCoursesTable';
import ReviewsSection from '../components/trainer/ReviewsSection';
import ProfileHeader from '../components/trainer/ProfileHeader';
import { chartData } from '../components/data/chartData'
import PrivilegesGrid from './Privileges/PrivilegesGrid.jsx';
import UserProfileCardSkeleton from '../components/Skeletons/UserProfileCardSkeleton';
import { useTrainer } from '../../features/trainer/hooks/useTrainer';

function TrainerPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { coachData, loading, refetch } = useTrainer(id);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    console.log("Мубодила...");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center my-4 space-y-8">
        <ProfileHeader
          onBackClick={handleBack}
          onShareClick={handleShare}
        />
        <UserProfileCardSkeleton />
      </div>
    );
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
        onUpdate={refetch}
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