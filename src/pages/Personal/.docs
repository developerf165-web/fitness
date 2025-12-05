# 🔌 BACKEND INTEGRATION GUIDE

Дастури пайваст ба Backend барои саҳифаи Personal.

---

## 📋 ВАЗЪИЯТИ ҲОЗИРА

✅ **Frontend омода аст!**

Ҳоло Personal Page бо **mock data** кор мекунад:
- Ҳамаи API функсияҳо тайёр
- Mock data реалистӣ
- Структура backend-compatible

---

## 🎯 ЧӢ ТАВР ПАЙВАСТ КУНЕМ

### Қадами 1: Backend API Endpoints

Шумо бояд ин endpoints-ҳоро дар backend созед:

#### GET - Гирифтани ҳамаи staff
```
GET /api/staff

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "fullName": "Иванов Иван Иванович",
      "position": "Тренер",
      "status": "На работе",
      "avatar": "/avatars/trainer1.jpg",
      "phone": "+992 900 123 456",
      "email": "ivanov@example.com",
      "hireDate": "2023-01-15",
      "salary": 5000,
      "type": "staff"
    },
    ...
  ]
}
```

#### GET - Гирифтани staff аз рӯи ID
```
GET /api/staff/:id

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "Иванов Иван Иванович",
    ...
  }
}
```

#### POST - Сохтани staff нав
```
POST /api/staff
Content-Type: application/json

Body:
{
  "fullName": "Новый Сотрудник",
  "position": "Тренер",
  "phone": "+992 900 000 000",
  "email": "new@example.com",
  "hireDate": "2025-11-29",
  "salary": 5000,
  "status": "На работе"
}

Response:
{
  "success": true,
  "data": {
    "id": 11,
    "fullName": "Новый Сотрудник",
    ...
  }
}
```

#### PUT - Таҳрири staff
```
PUT /api/staff/:id
Content-Type: application/json

Body:
{
  "fullName": "Обновленное Имя",
  "salary": 6000,
  ...
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "Обновленное Имя",
    ...
  }
}
```


#### DELETE - Нест кардани staff
```
DELETE /api/staff/:id

Response:
{
  "success": true,
  "message": "Staff deleted successfully"
}
```

#### GET - Фильтр аз рӯи статус
```
GET /api/staff?status=На работе

Response:
{
  "success": true,
  "data": [ ... ]
}
```

#### GET - Фильтр аз рӯи должность
```
GET /api/staff?position=Тренер

Response:
{
  "success": true,
  "data": [ ... ]
}
```

#### GET - Search
```
GET /api/staff?search=Иван

Response:
{
  "success": true,
  "data": [ ... ]
}
```

---

## ⚡ ҚАДАМИ 2: Пайваст дар Frontend

Танҳо **як файл** тағйир медиҳад:
📄 `features/staff/api/staffApi.js`

### Пеш (Mock):
```javascript
export const getAllStaff = async () => {
  // ҲОЗИР: Mock data
  return await simulateApiCall(mockStaffData);
};
```

### Баъд (Backend):
```javascript
export const getAllStaff = async () => {
  try {
    const response = await fetch('/api/staff');
    if (!response.ok) throw new Error('Failed to fetch staff');
    const result = await response.json();
    return result.data; // Backend response.data
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};
```

---

## 📝 ТАҒЙИРОТИ КОМИЛ

Барои пайваст ба backend, дар `staffApi.js` ҳар функсияро тағйир диҳед:

### getAllStaff
```javascript
export const getAllStaff = async () => {
  try {
    const response = await fetch('/api/staff');
    if (!response.ok) throw new Error('Failed to fetch staff');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};
```

### getStaffById
```javascript
export const getStaffById = async (id) => {
  try {
    const response = await fetch(`/api/staff/${id}`);
    if (!response.ok) throw new Error('Staff not found');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching staff ${id}:`, error);
    throw error;
  }
};
```

### createStaff
```javascript
export const createStaff = async (staffData) => {
  try {
    const response = await fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(staffData)
    });
    if (!response.ok) throw new Error('Failed to create staff');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error creating staff:', error);
    throw error;
  }
};
```

### updateStaff
```javascript
export const updateStaff = async (id, staffData) => {
  try {
    const response = await fetch(`/api/staff/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(staffData)
    });
    if (!response.ok) throw new Error('Failed to update staff');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error updating staff ${id}:`, error);
    throw error;
  }
};
```


### deleteStaff
```javascript
export const deleteStaff = async (id) => {
  try {
    const response = await fetch(`/api/staff/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete staff');
    return await response.json();
  } catch (error) {
    console.error(`Error deleting staff ${id}:`, error);
    throw error;
  }
};
```

### getStaffByStatus, getStaffByPosition, searchStaff
Ҳамон принсип - танҳо URL-ро тағйир диҳед.

---

## 🎯 CHECKLIST ПАЙВАСТ

- [ ] Backend API endpoints созда шуданд
- [ ] Endpoints тест карда шуданд (Postman/Insomnia)
- [ ] Response format мувофиқ аст
- [ ] `staffApi.js` тағйир дода шуд (mock → fetch)
- [ ] Frontend бо backend тест карда шуд
- [ ] Error handling кор мекунад
- [ ] Loading states дуруст

---

## ⏱️ ВАҚТ

- Backend API созед: **1-2 соат**
- Frontend пайваст: **15 дақиқа**
- Тест: **30 дақиқа**

**Ҷамъ: ~3 соат**

---

## 🚨 МУҲИМ

1. **Response Format** - Backend бояд ҳамон format-ро барои data истифода барад
2. **Error Handling** - Backend бояд дурусти errors бозгардонад
3. **CORS** - Агар frontend ва backend дар портҳои гуногун бошанд
4. **Authentication** - Агар лозим бошад, headers илова кунед

---

## 📞 ДАСТГИРӢ

Агар мушкилот пайдо шаванд:
1. Console.log-ро санҷед
2. Network tab-ро дар DevTools бинед
3. Backend logs-ро санҷед
4. Response format-ро муқоиса кунед

---

*Таҳия: 29.11.2025*
