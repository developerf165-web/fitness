const activeMockData = [
  // 1. Элемент с SubItems и 3 аватарами (Группа)
  {
    id: 1,
    avatar: "/images/avatar.jpg",
    name: "Алиса Рязанова",
    role: "Тренер",
    category: "Кардио нагрузки",
    count: 2,
    subItems: [
      { 
        type: "Группа", 
        time: "10:00 - 11:00", 
        avatars: ["/images/image1.jpg", "/images/fitness.jpg", "/images/profile_image.jpg"] 
      },
      { 
        type: "Группа", 
        time: "13:00 - 14:00", 
        avatars: ["/images/profile_image.jpg", "/images/fitness1.jpg", "/images/image1.jpg"] 
      }
    ]
  },

  // 2. Элемент с SubItems (Индивидуальные)
  {
    id: 2,
    avatar: "/images/profile_image.jpg",
    name: "Жанна Гафурова",
    role: "Тренер",
    category: "Силовые нагрузки",
    count: 3,
    subItems: [
      { 
        type: "Индивидуально", 
        time: "08:30 - 09:30", 
        avatars: ["/images/fitness.jpg"] 
      },
      { 
        type: "Группа", 
        time: "11:30 - 12:30", 
        avatars: ["/images/image1.jpg", "/images/avatar.jpg"] 
      },
      { 
        type: "Индивидуально", 
        time: "18:00 - 19:00", 
        avatars: ["/images/profile_image.jpg"] 
      }
    ]
  },

  // 3. Элемент без SubItems (Активный, но без дополнительных записей)
  {
    id: 3,
    avatar: "/images/avatar.jpg",
    name: "Муниса Камолова",
    role: "Тренер",
    category: "Силовые нагрузки",
    count: 0,
    subItems: null,
  },
  
  // 4. Дополнительный элемент с SubItems
  {
    id: 4,
    avatar: "/images/fitness1.jpg",
    name: "Нодир Рахимов",
    role: "Тренер",
    category: "Йога и Расслабление",
    count: 1,
    subItems: [
      { 
        type: "Группа", 
        time: "07:00 - 08:00", 
        avatars: ["/images/image1.jpg", "/images/fitness.jpg", "/images/avatar.jpg", "/images/profile_image.jpg"] 
      }
    ]
  },

  // 5. Дополнительный элемент без SubItems
  {
    id: 5,
    avatar: "/images/image1.jpg",
    name: "Сабина Иброхимзода",
    role: "Тренер",
    category: "Диета и Консультации",
    count: 0,
    subItems: null,
  }
];

export default activeMockData;