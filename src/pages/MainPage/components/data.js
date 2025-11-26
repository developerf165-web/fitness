// === FILE: /components/Schedule/data.js ===

// Маълумот барои Dropdown-и тренерон
export const trainers = [
  { id: 1, name: 'Азиза Рахимова' },
  { id: 2, name: 'Рахима Гафурова' },
  { id: 3, name: 'Мунира Камолова' },
];

// Маълумот барои интихобкунандаи рӯз
export const days = [
  { id: 9, number: '9', abbr: 'Пон' },
  { id: 10, number: '10', abbr: 'Вт' }, // Рӯзи фаъол (Active)
  { id: 11, number: '11', abbr: 'Ср' },
  { id: 12, number: '12', abbr: 'Чт' },
  { id: 13, number: '13', abbr: 'Пт' },
];

// Маълумот барои ҷадвали вақт
export const scheduleData = {
  times: ['08:00', '09:00', '10:00', '11:00'],
  days: days, // Мо ҳамон рӯзҳоро истифода мебарем
  
  // 'Event'-ҳо дар ҷадвал
  events: [
    {
      id: 1,
      type: 'event', // Намуди "аватар"
      avatar: 'https://i.pravatar.cc/100?img=11', // Сурати тасодуфӣ
      isHighlighted: false,
      dayIndex: 1, // 'Вт' (0=Пон, 1=Вт, ...)
      timeOffset: 'calc(2 * 6rem + 2rem)', // ~10:30 (h-24 = 6rem)
    },
    {
      id: 2,
      type: 'event',
      avatar: 'https://i.pravatar.cc/100?img=12',
      isHighlighted: true, // Доираи сурх
      dayIndex: 3, // 'Чт'
      timeOffset: 'calc(1 * 6rem + 1rem)', // ~09:15
    },
    {
      id: 3,
      type: 'label', // Намуди "label"
      trainer: {
        name: 'Нигора Шарипова',
        avatar: 'https://i.pravatar.cc/100?img=14',
      },
      dayIndex: 2, // 'Ср'
      timeOffset: 'calc(2.5 * 6rem)', // ~10:45
    }
  ],
};