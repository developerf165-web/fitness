import { Bell, MessageSquare } from 'lucide-react';

const ChannelIcon = ({ type, zIndex }) => {
  const commonClasses = "relative w-6 h-6 rounded-full flex items-center justify-center border-2 border-[var(--color-bg-card)]";

  if (type === 'sms') {
    return (
      <div className={`${commonClasses} bg-blue-500`} style={{ zIndex: zIndex }}>
        <MessageSquare size={14} className="text-white" />
      </div>
    );
  }
  
  if (type === 'push') {
    return (
      <div className={`${commonClasses} bg-yellow-500`} style={{ zIndex: zIndex }}>
        <Bell size={14} className="text-white" />
      </div>
    );
  }
  
  return null;
};

export default ChannelIcon;