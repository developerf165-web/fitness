import React from 'react';
import ReviewCard from './ReviewCard';
const avatarLailo = '/images/avatar.jpg';
const avatarShakhnoza = '/images/iim.png';
const avatarAziza = '/images/image1.jpg';
const avatarOther = '/images/iim.png';

const allReviews = {
  positive: [
    { name: 'Лайло', score: 4.6, date: '28.10.2023', avatarUrl: avatarLailo, text: "Прошли замечательный урок с тренером. Она оценила уровень моей физической подготовки и скорректировала тренировку так, чтобы она мне подошла. Лучшая в своем деле!" },
    { name: 'Шахноза', score: 5.0, date: '16.10.2023', avatarUrl: avatarShakhnoza, text: "Провели замечательный урок с тренером. Она оценила уровень моей физической подготовки и скорректировала тренировку так, чтобы она мне подошла. Лучшая в своем деле!" },
    { name: 'Лайло', score: 4.6, date: '28.10.2023', avatarUrl: avatarLailo, text: "Прошли замечательный урок с тренером. Она оценила уровень моей физической подготовки и скорректировала тренировку так, чтобы она мне подошла. Лучшая в своем деле!" },
  ],
  blocked: [
    { name: 'Азиза', score: 2.1, date: '17.10.2023', avatarUrl: avatarAziza, text: "Совсем не понравился тренер! Опоздала на урок, занятие прошло непродуктивно, не последовал подробный список занятия." },
  ],
};

const ReviewsSection = () => {
  return (
    <div className="w-full mx-auto color-bg-card py-10 px-20 rounded-xl shadow-2xl text-white">
      
      <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
        <h2 className="text-2xl font-bold">Отзывы</h2>
        

        <div className="flex items-center -space-x-3">
          <img src={avatarLailo} alt="Аватар" className="w-12 h-12 rounded-full border-2 border-gray-900" />
          <img src={avatarShakhnoza} alt="Аватар" className="w-12 h-12 rounded-full border-2 border-gray-900" />
          <img src={avatarAziza} alt="Аватар" className="w-12 h-12 rounded-full border-2 border-gray-900" />

          <div className="
            w-12 h-12 rounded-full color-bg-accent text-black text-sm font-bold 
            flex items-center justify-center border-2 border-gray-900 z-10
          ">
            +10
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Положительные</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {allReviews.positive.map((review, index) => (
          <ReviewCard key={`pos-${index}`} review={review} />
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-4">Заблокированные</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allReviews.blocked.map((review, index) => (
          <ReviewCard key={`neg-${index}`} review={review} />
        ))}
      </div>
      
    </div>
  );
};

export default ReviewsSection;