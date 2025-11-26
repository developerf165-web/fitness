// src/components/fitness/data/products.js
// ВЕРСИЯИ АЛТЕРНАТИВИ бо истифода аз 'loremflickr.com' (агар Unsplash кор накунад)

export const products = [
  // === БАТОНЧИКИ ===
  { id: 1, name: "БАТОНЧИК ПРОТЕИНОВЫЙ XL (Шоколад)", category: "Батончики", price: 15, oldPrice: 18, discount: 5, imageUrl: "https://loremflickr.com/300/300/protein,bar,chocolate?random=1", },
  { id: 6, name: "БАТОНЧИК (Карамель и Арахис)", category: "Батончики", price: 16, oldPrice: null, discount: null, imageUrl: "https://loremflickr.com/300/300/protein,bar,caramel?random=6", },
  { id: 7, name: "Батончик VEGAN (Ягоды)", category: "Батончики", price: 18, oldPrice: 20, discount: 10, imageUrl: "https://loremflickr.com/300/300/protein,bar,vegan,berry?random=7", },
  { id: 8, name: "Батончик (Двойной Шоколад)", category: "Батончики", price: 17, oldPrice: null, discount: null, imageUrl: "https://loremflickr.com/300/300/protein,bar,chocolate?random=8", },

  // === КОКТЕЙЛИ (ШЕЙКИ И ПРОТЕИН) ===
  { id: 2, name: "КОКТЕЙЛЬ ПРОТЕИНОВЫЙ (Готовый)", category: "Коктейли", price: 20, oldPrice: 23, discount: null, imageUrl: "https://loremflickr.com/300/300/protein,shake,bottle?random=2", },
  { id: 4, name: "ШЕЙК ПРОТЕИНОВЫЙ (Ассорти)", category: "Коктейли", price: 17, oldPrice: 20, discount: null, imageUrl: "https://loremflickr.com/300/300/protein,shake,packets?random=4", },
  { id: 9, name: "Протеин WHEY (Клубника, 1кг)", category: "Коктейли", price: 350, oldPrice: 400, discount: 12, imageUrl: "https://loremflickr.com/300/300/protein,powder,strawberry?random=9", },
  { id: 10, name: "Протеин CASEIN (Ваниль, 900г)", category: "Коктейли", price: 380, oldPrice: null, discount: null, imageUrl: "https://loremflickr.com/300/300/protein,powder,vanilla?random=10", },
  { id: 11, name: "Гейнер (Шоколад, 2кг)", category: "Коктейли", price: 550, oldPrice: 600, discount: 8, imageUrl: "https://loremflickr.com/300/300/protein,gainer,chocolate?random=11", },

  // === ПЕЧЕНЬЕ ===
  { id: 3, name: "ПЕЧЕНЬЕ ПРОТЕИНОВОЕ (Арахис)", category: "Печенье", price: 18, oldPrice: 20, discount: 5, imageUrl: "https://loremflickr.com/300/300/protein,cookie,peanut?random=3", },
  { id: 5, name: "ПЕЧЕНЬЕ (Двойной Шоколад)", category: "Печенье", price: 19, oldPrice: 22, discount: 5, imageUrl: "https://loremflickr.com/300/300/protein,cookie,chocolate?random=5", },
  { id: 12, name: "Протеиновое Печенье (Овсянка-Изюм)", category: "Печенье", price: 17, oldPrice: null, discount: null, imageUrl: "https://loremflickr.com/300/300/protein,cookie,oatmeal?random=12", },

  // === ВИТАМИНЫ ===
  { id: 13, name: "Омега-3 (90 капсул)", category: "Витамины", price: 120, oldPrice: 150, discount: 20, imageUrl: "https://loremflickr.com/300/300/vitamins,omega3?random=13", },
  { id: 14, name: "Витамин D3 (120 капсул)", category: "Витамины", price: 90, oldPrice: null, discount: null, imageUrl: "https://loremflickr.com/300/300/vitamins,d3?random=14", },
  { id: 15, name: "Мультивитамины (Мужские, 60 таб)", category: "Витамины", price: 160, oldPrice: null, discount: null, imageUrl: "https://loremflickr.com/300/300/multivitamin,bottle?random=15", },
  { id: 16, name: "Коллаген (Порошок, 300г)", category: "Витамины", price: 220, oldPrice: 250, discount: 10, imageUrl: "https://loremflickr.com/300/300/collagen,powder?random=16", },

  // === АКСЕССУАРЫ ===
  { id: 17, name: "Шейкер (Черный, 700мл)", category: "Аксессуары", price: 50, oldPrice: 65, discount: 20, imageUrl: "https://loremflickr.com/300/300/fitness,shaker,black?random=17", },
  { id: 18, name: "Шейкер (Розовый, 500мл)", category: "Аксессуары", price: 45, oldPrice: null, discount: null, imageUrl: "https://loremflickr.com/300/300/fitness,shaker,pink?random=18", },
  { id: 19, name: "Перчатки для зала (Размер L)", category: "Аксессуары", price: 80, oldPrice: null, discount: null, imageUrl: "https://loremflickr.com/300/300/fitness,gloves?random=19", },
  { id: 20, name: "Лямки для тяги", category: "Аксессуары", price: 60, oldPrice: 70, discount: 10, imageUrl: "https://loremflickr.com/300/300/fitness,straps?random=20", },
];

export const filters = [ 
  "Все", 
  "Батончики", 
  "Печенье", 
  "Коктейли", 
  "Витамины", 
  "Аксессуары" 
];