import React from 'react';

const scheduleData = {
  currentMonth: "Октябрь",
  currentWeek: [
    { day: 9, name: 'Пон' },
    { day: 10, name: 'ВТ', isSelected: true },
    { day: 11, name: 'Ср' },
    { day: 12, name: 'Чт' },
    { day: 13, name: 'Пт' },
    { day: 14, name: 'Сб' },
    { day: 15, name: 'Вс' },
  ],
  timeSlots: [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ],
  events: [
    { day: 9, time: '09:00', type: 'avatar', top: '10%' },     
    { day: 10, time: '12:00', duration: 3, type: 'course', details: { title: 'Курс групповой', trainer: 'Раҳима Ғафурова', count: 10 } },
    { day: 10, time: '15:00', type: 'avatar', top: '75%' }, 
    { day: 13, time: '10:00', type: 'avatar', top: '35%' }, 
    { day: 13, time: '17:00', type: 'avatar', top: '80%' }, 
    { day: 15, time: '12:00', type: 'avatar', top: '75%' }, 
  ],
};

const avatarUrl = '/images/avatar.jpg'; 
const studentAvatar = '/images/image1.jpg'; 
const trainerAvatar = '/images/avatar.jpg';

const getTimeIndex = (time) => scheduleData.timeSlots.indexOf(time);

const ScheduleCalendar = () => {
  const totalDays = scheduleData.currentWeek.length;
  const selectedDayIndex = scheduleData.currentWeek.findIndex(day => day.isSelected);

  return (
    <div className="w-full mx-auto color-bg-card p-4 md:p-6 rounded-xl shadow-2xl text-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-xl font-bold">
          <svg className="w-5 h-5 color-accent mr-2 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          {scheduleData.currentMonth}
          <svg className="w-5 h-5 color-accent ml-2 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </div>
      

      <div 
        className="grid relative"
        style={{ 
            gridTemplateColumns: `40px repeat(${totalDays}, 1fr)`,
            gridTemplateRows: 'auto 1fr' 
        }}
      >
        
        <div className="col-span-1"></div>
        {scheduleData.currentWeek.map((day, index) => (
          <div 
            key={day.day} 
            className={`
              text-center pb-2 cursor-pointer transition-colors duration-200
              ${day.isSelected ? 'color-accent' : 'text-gray-400 hover:text-white'}
            `}
          >
            <div className="text-xs">{day.name}</div>
            <div className="text-xl font-bold">{day.day}</div>
          </div>
        ))}

        {selectedDayIndex !== -1 && (
            <div 
                className="absolute top-10 bottom-0"
                style={{ 
                    left: `${40 + (selectedDayIndex * (100 - (40/384*100))/totalDays)}px`, 
                    width: `calc(${100/totalDays}%)`
                }}
            ></div>
        )}

        {scheduleData.timeSlots.map((time, timeIndex) => (
          <React.Fragment key={time}>
            <div className="text-xs text-gray-500 pt-1 text-right pr-2 -translate-y-1/2">{time}</div>
            {scheduleData.currentWeek.map((day, dayIndex) => {
              
              const event = scheduleData.events.find(e => 
                e.day === day.day && getTimeIndex(e.time) === timeIndex
              );
              
              return (
                <div 
                  key={day.day} 
                  className="relative bottom-border-color mb-8"
                >
                  {event && event.type === 'avatar' && (
                    <img 
                      src={trainerAvatar} 
                      alt="Avatar" 
                      className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full border-2 border-lime-500 z-10"
                      style={{ bottom: '-16px' }}
                    />
                  )}

                  {event && event.type === 'course' && (
                    <div 
                      className="absolute inset-x-0 ml-1 mr-1 p-2 rounded-lg bg-transparent shadow-lg z-30"
                      style={{ 
                        height: `${event.duration * 75}px`, 
                        top: 0
                      }}
                    >
                      <div className='color-bg-accent text-black rounded-xl p-2 w-full'>
                       <p className="text-sm font-bold">{event.details.title} {event.details.count}</p>
                       <p className="text-xs">{event.details.trainer}</p>
                      </div>
                      <div className='color-bg-mini-card text-white rounded-xl p-2 mt-1'>
                       <div className="mt-3 space-y-1">
                         {[1, 2, 3, 4].map(i => (
                             <div key={i} className="flex items-center text-xs">
                                 <img src={studentAvatar} alt="Student"  className="w-6 h-6 rounded-full mr-2" />
                                 <p className='text-xs'>Нигора Шарипова</p>
                                 <span className="ml-auto text-green-800">✓✓</span>
                             </div>
                         ))}
                       </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCalendar;