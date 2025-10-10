export const scheduleData = {
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
    { id: 1, day: 9, time: '09:00', type: 'avatar' },    
    { id: 2, day: 10, time: '12:00', duration: 3, type: 'course', details: { title: 'Курс групповой', trainer: 'Раҳима Ғафурова', count: 10 } },
    { id: 3, day: 10, time: '15:00', type: 'avatar' }, 
    { id: 4, day: 13, time: '10:00', type: 'avatar' }, 
    { id: 5, day: 13, time: '17:00', type: 'avatar' }, 
    { id: 6, day: 15, time: '12:00', type: 'avatar' }, 
  ],
};