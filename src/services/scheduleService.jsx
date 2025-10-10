// Ин файл рафтори API-и воқеиро симулятсия мекунад.
import { scheduleData as initialData } from '../pages/components/data/scheduleData';

// Ёрдамчии хурд барои гирифтани номи моҳ
const getMonthName = (monthIndex) => {
  const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  return months[monthIndex];
};

// Функсияи ёрдамчӣ барои ҳисоб кардани вақти анҷомёбӣ
const calculateEndTime = (startTime, durationHours) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalHours = hours + durationHours;
  const endHours = totalHours % 24;
  return `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

// --- ФУНКСИЯИ НАВИ БЕҲТАРШУДА ---
const generateFakeScheduleForDate = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1));

  // Массив барои номҳои рӯзҳои ҳафта, ки барои калидҳо истифода мешаванд
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // --- Генерацияи ҳафта ---
  const week = [];
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + i);
    week.push({
      day: currentDay.getDate(), // Рақами рӯз, масалан: 17
      name: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i], // Номи кӯтоҳ
      dayName: dayNames[i], // Номи англисӣ барои мувофиқат бо TimeGrid, масалан: 'Wednesday'
      dateISO: currentDay.toISOString().slice(0, 10), // Формати ISO барои интихоби рӯз
    });
  }

  // --- Генерацияи динамикии рӯйдодҳо барои ҳафтаи ҷорӣ ---
  const events = [];

  // Курси гурӯҳӣ дар рӯзи чоршанбе соати 12:00 (3 соат давом мекунад)
  events.push({
    id: 1,
    day: week[2].dayName, // 'Wednesday'
    startTime: '12:00',
    endTime: calculateEndTime('12:00', 3), // '15:00'
    type: 'course',
    details: { title: 'Курс групповой', trainer: 'Раҳима Ғафурова', count: 10 }
  });

  // Якчанд аватарҳои тасодуфӣ (1 соат давом мекунанд)
  events.push({
    id: 2,
    day: week[0].dayName, // 'Monday'
    startTime: '09:00',
    endTime: calculateEndTime('09:00', 1), // '10:00'
    type: 'avatar'
  });
  events.push({
    id: 3,
    day: week[4].dayName, // 'Friday'
    startTime: '15:00',
    endTime: calculateEndTime('15:00', 1), // '16:00'
    type: 'avatar'
  });
  events.push({
    id: 4,
    day: week[1].dayName, // 'Tuesday'
    startTime: '11:00',
    endTime: calculateEndTime('11:00', 2), // '13:00' (2 соат)
    type: 'avatar'
  });

  return {
    currentMonth: getMonthName(startOfWeek.getMonth()),
    currentWeek: week,
    timeSlots: initialData.timeSlots,
    events: events,
  };
};

export const getScheduleData = (date) => {
  console.log(`Запрос фейковых данных для недели, включающей: ${date.toDateString()}`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      const fakeData = generateFakeScheduleForDate(date);
      resolve({ data: fakeData }); 
    }, 500);
  });
};