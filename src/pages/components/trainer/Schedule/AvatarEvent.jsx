import React from 'react';

const TRAINER_AVATAR_URL = '/images/avatar.jpg';

const AvatarEvent = ({ event, onEventClick }) => (
  <img 
    onClick={() => onEventClick(event)} 
    src={TRAINER_AVATAR_URL}
    alt="Avatar" 
    className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 color-border-accent z-10 cursor-pointer hover:scale-110 transition-transform duration-200"
    style={{ bottom: '4px' }}
  />
);

export default AvatarEvent;