// === FILE: /components/charts/HallOccupancyChart/data.js ===

export const hallOccupancyData = {
  // 'title' лозим нест, зеро мо header-и фармоишӣ дорем
  title: null, 
  
  // Меҳвари X (аз 08:00 то 22:00)
  xLabels: [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
  ],

  // Меҳвари Y (аз 0 то 50)
  yLabels: [0, 10, 20, 30, 40, 50],

  series: [
    {
      name: "Курсы груп.", // Ин дар tooltip ҳамчун 'type' нишон дода мешавад
      color: "#d4ff34", // Ранги сабзи-зард (lime green)
      
      // Маълумот ҳамчун массивҳои объектҳо
      data: [
        { value: 5, details: null },
        { value: 18, details: null },
        { value: 20, details: null },
        { value: 17, details: null },
        { 
          value: 39, // Арзиши умумӣ
          // 'details' барои tooltip-и муфассал
          details: [
            { name: "Йога", value: 5 },
            { name: "Фитнес", value: 24 },
            { name: "Танцы", value: 10 }
          ]
        },
        { value: 35, details: null },
        { value: 25, details: null },
        { value: 18, details: null },
        { value: 20, details: null },
        { value: 17, details: null },
        { value: 12, details: null },
        { value: 7, details: null },
        { value: 15, details: null },
        { value: 22, details: null },
        { value: 24, details: null }
      ]
    }
  ]
};