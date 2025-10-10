import React from 'react';

const STUDENT_AVATAR_URL = '/images/image1.jpg';

const CourseEvent = ({ event, onEventClick }) => (
  <div 
    onClick={() => onEventClick(event)}
    className="absolute inset-x-0 ml-1 mr-1 p-2 rounded-lg bg-transparent shadow-lg z-20 cursor-pointer hover:scale-105 transition-transform duration-200"
    style={{ height: `${event.duration * 64}px`, top: 0 }}
  >
    <div className='color-bg-accent text-black rounded-xl p-2 w-full'>
      <p className="text-sm font-bold">{event.details.title} {event.details.count}</p>
      <p className="text-xs">{event.details.trainer}</p>
    </div>
    <div className='color-bg-mini-card text-white rounded-xl p-2 mt-1'>
      <div className="mt-3 space-y-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center text-xs">
            <img src={STUDENT_AVATAR_URL} alt="Student" className="w-6 h-6 rounded-full mr-2" />
            <p className='text-xs'>Нигора Шарипова</p>
            <span className="ml-auto text-green-800">✓✓</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CourseEvent;