// src/pages/Personal/mocks/mockStaffData.js

import { STAFF_STATUS, POSITIONS } from '../constants';

/**
 * Mock маълумот барои Staff
 * TODO: Backend пайваст шуд - ин файлро нест кунед
 */

export const mockStaffData = [
  {
    id: 1,
    fullName: 'Иванов Иван Иванович',
    position: POSITIONS.TRAINER,
    status: STAFF_STATUS.ON_WORK,
    avatar: '/avatars/trainer1.jpg',
    phone: '+992 900 123 456',
    email: 'ivanov@example.com',
    hireDate: '2023-01-15',
    salary: 5000,
    type: 'staff'
  },
  {
    id: 2,
    fullName: 'Петрова Мария Сергеевна',
    position: POSITIONS.ADMINISTRATOR,
    status: STAFF_STATUS.ON_WORK,
    avatar: '/avatars/admin1.jpg',
    phone: '+992 900 234 567',
    email: 'petrova@example.com',
    hireDate: '2023-02-20',
    salary: 4500,
    type: 'staff'
  },
  {
    id: 3,
    fullName: 'Сидоров Петр Алексеевич',
    position: POSITIONS.TRAINER,
    status: STAFF_STATUS.ON_HOLIDAY,
    avatar: '/avatars/trainer2.jpg',
    phone: '+992 900 345 678',
    email: 'sidorov@example.com',
    hireDate: '2023-03-10',
    salary: 4800,
    type: 'staff'
  },
  {
    id: 4,
    fullName: 'Смирнова Анна Петровна',
    position: POSITIONS.CLEANER,
    status: STAFF_STATUS.ON_WORK,
    avatar: '/avatars/cleaner1.jpg',
    phone: '+992 900 456 789',
    email: 'smirnova@example.com',
    hireDate: '2023-04-05',
    salary: 3000,
    type: 'staff'
  },
  {
    id: 5,
    fullName: 'Козлов Дмитрий Иванович',
    position: POSITIONS.MANAGER,
    status: STAFF_STATUS.ON_WORK,
    avatar: '/avatars/manager1.jpg',
    phone: '+992 900 567 890',
    email: 'kozlov@example.com',
    hireDate: '2022-12-01',
    salary: 6000,
    type: 'staff'
  },
  {
    id: 6,
    fullName: 'Новикова Елена Александровна',
    position: POSITIONS.TRAINER,
    status: STAFF_STATUS.ON_HOLIDAY,
    avatar: '/avatars/trainer3.jpg',
    phone: '+992 900 678 901',
    email: 'novikova@example.com',
    hireDate: '2023-05-15',
    salary: 4700,
    type: 'staff'
  },
  {
    id: 7,
    fullName: 'Морозов Сергей Дмитриевич',
    position: POSITIONS.SECURITY,
    status: STAFF_STATUS.ON_WORK,
    avatar: '/avatars/security1.jpg',
    phone: '+992 900 789 012',
    email: 'morozov@example.com',
    hireDate: '2023-06-20',
    salary: 3500,
    type: 'staff'
  },
  {
    id: 8,
    fullName: 'Волкова Ольга Сергеевна',
    position: POSITIONS.RECEPTIONIST,
    status: STAFF_STATUS.ON_WORK,
    avatar: '/avatars/receptionist1.jpg',
    phone: '+992 900 890 123',
    email: 'volkova@example.com',
    hireDate: '2023-07-10',
    salary: 3800,
    type: 'staff'
  },
  {
    id: 9,
    fullName: 'Соколов Александр Петрович',
    position: POSITIONS.ACCOUNTANT,
    status: STAFF_STATUS.ON_WORK,
    avatar: '/avatars/accountant1.jpg',
    phone: '+992 900 901 234',
    email: 'sokolov@example.com',
    hireDate: '2022-11-15',
    salary: 5500,
    type: 'staff'
  },
  {
    id: 10,
    fullName: 'Лебедева Наталья Ивановна',
    position: POSITIONS.DIRECTOR,
    status: STAFF_STATUS.ON_WORK,
    avatar: '/avatars/director1.jpg',
    phone: '+992 900 012 345',
    email: 'lebedeva@example.com',
    hireDate: '2022-01-10',
    salary: 10000,
    type: 'staff'
  }
];

/**
 * Helper функция барои гирифтани staff аз рӯи ID
 */
export const getStaffById = (id) => {
  return mockStaffData.find(staff => staff.id === id);
};

/**
 * Helper функция барои гирифтани staff аз рӯи статус
 */
export const getStaffByStatus = (status) => {
  return mockStaffData.filter(staff => staff.status === status);
};

/**
 * Helper функция барои гирифтани staff аз рӯи должность
 */
export const getStaffByPosition = (position) => {
  return mockStaffData.filter(staff => staff.position === position);
};
