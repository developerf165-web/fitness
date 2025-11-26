export const privilegesData = [
  {
    id: 'main',
    title: 'ГЛАВНАЯ',
    type: 'toggle',
    isActive: true,
  },
  {
    id: 'clients',
    title: 'КЛИЕНТЫ',
    type: 'dropdown',
    count: 6,
    items: [
      { id: 'add_user', label: 'Добавить пользов.', isActive: true },
      { id: 'add_service', label: 'Добавить услугу', isActive: true },
      { id: 'block', label: 'Заблокировать', isActive: false },
      { id: 'delete', label: 'Удалить', isActive: false },
      { id: 'refill', label: 'Пополнить счёт', isActive: true },
      { id: 'withdraw', label: 'Снять деньги', isActive: true },
    ],
  },
  {
    id: 'staff',
    title: 'ПЕРСОНАЛ',
    type: 'dropdown',
    count: 4,
    items: [
        { id: 'view_staff', label: 'Просмотр списка', isActive: true },
        { id: 'add_staff', label: 'Добавить сотрудника', isActive: true },
        { id: 'edit_schedule', label: 'Управление графиком', isActive: false },
        { id: 'calc_salary', label: 'Расчет зарплаты', isActive: false },
    ]
  },
  {
    id: 'services',
    title: 'УСЛУГИ',
    type: 'dropdown',
    count: 5,
    items: [
        { id: 'view_services', label: 'Просмотр услуг', isActive: true },
        { id: 'create_sub', label: 'Создать абонемент', isActive: true },
        { id: 'edit_price', label: 'Изменить цены', isActive: true },
        { id: 'discounts', label: 'Управление скидками', isActive: false },
        { id: 'archive', label: 'Архив услуг', isActive: false },
    ]
  },
  {
    id: 'news',
    title: 'НОВОСТИ',
    type: 'dropdown',
    count: 3,
    items: [
        { id: 'create_news', label: 'Создать новость', isActive: true },
        { id: 'push_notify', label: 'Push-уведомления', isActive: true },
        { id: 'comments', label: 'Модерация', isActive: false },
    ]
  },
  {
    id: 'finances',
    title: 'ФИНАНСЫ',
    type: 'toggle',
    isActive: true,
  },
  {
    id: 'settings',
    title: 'НАСТРОЙКИ',
    type: 'dropdown',
    count: 3,
    items: [
        { id: 'general', label: 'Общие настройки', isActive: true },
        { id: 'backup', label: 'Резервное копирование', isActive: false },
        { id: 'logs', label: 'Журнал действий', isActive: true },
    ]
  }
];