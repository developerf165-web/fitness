import React from 'react';
import StatsDashboard from '../components/trainer/StatsDashboard/StatsDashboard.jsx';
import ActivityChart from '../components/trainer/ActivityChart';
import ScheduleCalendar from '../components/trainer/Schedule/ScheduleCalendar';
import ProfileHeader from '../components/trainer/ProfileHeader';
import { chartData } from '../components/data/chartData'
import { useNavigate } from 'react-router-dom';
import HallOccupancyChart from '../components/trainer/HallOccupancyChart/HallOccupancyChart';
import ScheduleHeader from './components/ScheduleHeader';
import { newChartData } from './chartData.js';

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
          title='Главная'
          onShareClick={handleShare}
      />
      
      <StatsDashboard variant="dashboard" />
      <ActivityChart data={newChartData} />
      <HallOccupancyChart />
      <ScheduleHeader />
      <ScheduleCalendar />
      
    </div>
  );
}

export default TrainerPage;