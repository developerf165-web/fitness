// utils.js
export const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
export const months = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

export const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};
