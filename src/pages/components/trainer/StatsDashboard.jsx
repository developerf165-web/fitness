import React from 'react';

const statsData = [
  {
    title: "Количество курсов",
    value: "18",
    change: "+15%",
    isMoney: false,
    period: "от предыдущего периода",
  },
  {
    title: "Выручка",
    value: "4800 TJS",
    change: "+15%",
    isMoney: true,
    period: "от предыдущего периода",
  },
  {
    title: "Опыт работы",
    value: "2 года",
    color: 'yellow',
  },
  {
    title: "Курсы индивидуальные",
    value: "40",
    color: 'yellow',
  },
  {
    title: "Курсы групповые",
    value: "25",
    color: 'lime',
  },
  {
    title: "Средняя оценка",
    value: "4.8",
    color: 'lime',
  },
];

const TinyLineChart = () => (
  <svg className="w-40 h-20" viewBox="0 0 154 117" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 116.31V75.6897L5.8046 69.5747L17.1609 52.5402L26.3333 41.6207L43.8046 32.4483L59.5287 27.6437L76.1264 29.3908L95.7816 35.5057L111.506 34.6322C121.633 31.16 131.143 26.0989 139.68 19.6386L142.954 17.1609L153 1V116.31H1Z" fill="url(#paint0_linear_9360_38150)" fillOpacity="0.4"/>
    <path d="M1.87305 75.6897L16.7705 53.1948C30.8827 31.8858 57.8245 23.1214 81.7729 32.0489C108.296 41.9363 137.991 30.0554 150.374 4.60137L152.126 1" stroke="#57DB41" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="paint0_linear_9360_38150" x1="76.7816" y1="-12.5402" x2="76.7816" y2="116.31" gradientUnits="userSpaceOnUse">
        <stop stopColor="#57DB41"/>
        <stop offset="1" stopColor="#57DB41" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const StatsDashboard = () => {
  const topRow = statsData.slice(0, 2);
  const bottomRow = statsData.slice(2);

  return (
    <div className="w-full mx-auto space-y-4">
      
      <div className="grid grid-cols-2 gap-4">
        {topRow.map((stat, index) => (
          <div key={index} className="color-bg-card p-4 rounded-xl shadow-lg flex flex-col">
            <div className='flex justify-between items-center mb-2'>
              <span className="text-white text-md">{stat.title}</span>
            </div>
            <div className='flex flex-row items-center justify-between flex-1'>
              <div>
                <p className="text-6xl font-extrabold text-white">
                  {stat.value}
                </p>
              </div>

              <div className="flex justify-between mb-2">
                <TinyLineChart />
              </div>
            </div>
            
            <div className="flex items-center text-xs font-semibold">
              <span className="bg-green-500/20 text-white px-6 py-2 rounded-3xl mr-2">
                {stat.change}
              </span>
              <span className="text-gray-500 ml-1">{stat.period}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-6 gap-4">
        {bottomRow.map((stat, index) => {
          const match = stat.value.match(/^([\d.,]+)\s*(.*)$/); // рақам + матн
          const numberPart = match ? match[1] : stat.value;
          const textPart = match && match[2] ? match[2] : "";
          
          return (
            <div 
              key={index} 
              className="color-bg-card p-4 rounded-xl shadow-lg h-32 flex flex-col relative"
            >
              <span className="text-white text-md">
                {stat.title}
              </span>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex items-end gap-1">
                  <p 
                    className={`text-5xl font-extrabold 
                      ${stat.color === 'yellow' ? 'color-accent' : 'color-accent'}
                    `}
                  >
                    {numberPart}
                  </p>
                  {textPart && (
                    <p className="text-xs color-accent font-medium mb-1">{textPart}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default StatsDashboard;
