import React from 'react';
import StatsDashboard from '../components/trainer/StatsDashboard/StatsDashboard.jsx';
import ActivityChart from '../components/trainer/ActivityChart';
import ProfileHeader from '../components/trainer/ProfileHeader';
import { useNavigate } from 'react-router-dom';
import { newChartData } from './chartData.js';
import { financeDashboardData } from './financeDashboardData.js';

function FinancePage() {
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
          title='Финансы'
          onShareClick={handleShare}
      />
      
      <StatsDashboard variant="dashboard" data={financeDashboardData} />

      <ActivityChart data={newChartData} />
      
    </div>
  );
}

export default FinancePage;