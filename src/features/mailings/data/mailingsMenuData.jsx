// Иконкаҳоро аз ҷои лозима import кунед. Агар надошта бошед,
// метавонед бе иконка истифода баред ё онҳоро эҷод кунед.
import HolidayIcon from '/src/pages/components/Icons/HolidayIcon'; 
import BirthdayIcon from '/src/pages/components/Icons/BirthdayIcon'; 

const getMailingsMenuItems = ({ onOpenModal }) => [
  { 
    label: "Праздник", 
    icon: <HolidayIcon />, 
    action: () => onOpenModal('holiday') 
  },
  { 
    label: "День Рождения", 
    icon: <BirthdayIcon />, 
    action: () => onOpenModal('birthday') 
  },
];

export default getMailingsMenuItems;