const tableData = [
  {
    fio: 'Азиза Султанова',
    phone: '92 000 00 00',
    price: '500 TJS',
    discount: '-5%',
    finalPrice: '+80 TJS',
    type: 'Онлайн', 
    period: '15.10.2023 - 15.11.2023',
    status: 'green', 
  },
  {
    fio: 'Алимова Султанова',
    phone: '92 000 00 00',
    price: '500 TJS',
    discount: '-5%',
    finalPrice: '+80 TJS',
    type: 'Карзид', 
    period: '15.10.2023 - 15.11.2023',
    status: 'yellow', 
  },
];

const tableColumns = [
  { key: 'fio', header: 'ФИО', style: 'text-left' },
  { key: 'phone', header: 'Телефон', style: 'text-center' },
  { key: 'price', header: 'Цена', style: 'text-right' },
  { key: 'discount', header: 'Скидка', style: 'text-center' },
  { key: 'finalPrice', header: 'Цена со %', style: 'text-right' },
  { key: 'type', header: 'Внд.', style: 'text-center' },
  { key: 'period', header: 'Период', style: 'text-right' },
];