import React from 'react';
import UserProfileCard from '../components/trainer/UserProfileCard';
import StatsDashboard from '../components/trainer/StatsDashboard';
import ActivityChart from '../components/trainer/ActivityChart/index.jsx';
import ScheduleCalendar from '../components/trainer/Schedule/ScheduleCalendar';
import ClientCoursesTable from '../components/trainer/ClientCoursesTable/ClientCoursesTable';
import ReviewsSection from '../components/trainer/ReviewsSection';
import ProfileHeader from '../components/trainer/ProfileHeader';
import { chartData } from '../components/data/chartData'

function TrainerPage() {
  return (
    <div className="flex flex-col items-center my-4 space-y-8">
      <ProfileHeader />
      <UserProfileCard />
      
      <StatsDashboard />
      <ActivityChart data={chartData} />
      <ScheduleCalendar />
      <ClientCoursesTable />
      <ReviewsSection />
      
    </div>
  );
}

export default TrainerPage;