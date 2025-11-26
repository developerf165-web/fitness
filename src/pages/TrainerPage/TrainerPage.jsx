import React from 'react';
import UserProfileCard from '../components/trainer/UserProfileCard';
import StatsDashboard from '../components/trainer/StatsDashboard.jsx';
import ActivityChart from '../components/trainer/ActivityChart/index.jsx';
import ScheduleCalendar from '../components/trainer/Schedule/ScheduleCalendar';
import ClientCoursesTable from '../components/trainer/ClientCoursesTable/ClientCoursesTable';
import ReviewsSection from '../components/trainer/ReviewsSection';
import ProfileHeader from '../components/trainer/ProfileHeader';
import { chartData } from '../components/data/chartData'
import { useNavigate } from 'react-router-dom';
import PrivilegesGrid from './Privileges/PrivilegesGrid.jsx';

function TrainerPage() {
const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    console.log("Мубодила...");
  };

  return (
    <div className="flex flex-col items-center my-4 space-y-8">
      <ProfileHeader
        onBackClick={handleBack}
        onShareClick={handleShare}
      />
      <UserProfileCard />
      
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