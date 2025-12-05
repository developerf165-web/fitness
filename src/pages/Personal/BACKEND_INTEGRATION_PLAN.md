# 📋 ПЛАН ПАЙВАСТ БА BACKEND - Personal Page

Пайваст ба Backend барои саҳифаи Personal бо API-ҳои воқеӣ.

---

## 🎯 МАҚСАД

1. ✅ Гирифтани рӯйхати Направлений аз backend
2. ✅ Намоиш додани Направленияҳо дар форма (dropdown)
3. ✅ Сохтани Тренер (POST) бо ҳамаи майдонҳо
4. ✅ Toast notification пас аз муваффақият
5. ✅ Навсозии саҳифа баъд аз сохтан

---

## 📊 САНҶИШИ API DOCUMENTATION

### API 1: GET Directions
```
GET http://84.54.31.36:8081/api/direction/get/all
Headers: Authorization: Bearer 7|XqFsmbbAcUtGpzBJ5Wj7nuDVnF8zflGlWhjz2ZPzac8d8e62

Response:
{
  "status": "true",
  "directions": [
    {
      "id": 1,
      "title": "кардио нагрузка",
      "description": "нагрузка",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### API 2: POST Coach/Trainer Create
```
POST http://84.54.31.36:8081/api/coach/create
Headers: Authorization: Bearer ...
Content-Type: multipart/form-data

Fields:
- name* (string) - "john"
- surname* (string) - "adams"  
- phone* (string) - "78347864"
- avatar* (file) - файл
- work_experience* (integer) - 3
- color* (string) - "#bbcbba"
- direction_id* (array<string>) - [1, 2, 3]
- cover_img (array<file>) - optional

Required: name, surname, phone, avatar, work_experience, color, direction_id
```

---

## 🗂️ СТРУКТУРАИ ФАЙЛҲО

### Файлҳои нав:
```
Personal/
├── features/staff/api/
│   ├── directionApi.js          # 🆕 API барои Directions
│   └── staffApi.js               # 🔄 Таҷдид (backend)
│
├── modals/AddStaffModal/
│   ├── AddStaffForm.jsx          # 🔄 Илова кардани Directions dropdown
│   ├── useAddStaffForm.js        # 🔄 Таҷдид логика
│   └── AddStaffModal.jsx         # 🔄 Toast integration
│
└── constants/
    └── apiConfig.js              # 🆕 API base URL + token
```

---

## 📝 МАРҲИЛАҲОИ КОР

### МАРҲИЛАИ 1: API Configuration
**Вақт: 5 дақиқа**

1. Созем `constants/apiConfig.js`
   - BASE_URL
   - AUTH_TOKEN
   - API endpoints

---

### МАРҲИЛАИ 2: Directions API
**Вақт: 10 дақиқа**

1. Созем `features/staff/api/directionApi.js`
   - `getDirections()` функсия
   - Fetch аз backend
   - Error handling

2. Созем hook `features/staff/hooks/useDirections.js`
   - Auto-fetch directions
   - Loading state
   - Error handling

---

### МАРҲИЛАИ 3: Таҷдиди staffApi.js барои Backend
**Вақт: 15 дақиқа**

1. Таҷдид `features/staff/api/staffApi.js`
   - Иваз кардани mock data бо fetch
   - FormData барои POST (file upload)
   - Mapping майдонҳо:
     - fullName → name + surname
     - avatar (file)
     - work_experience
     - color
     - direction_id (array)
     - cover_img (optional)

---

### МАРҲИЛАИ 4: Форма - Directions Dropdown
**Вақт: 15 дақиқа**

1. Таҷдид `AddStaffForm.jsx`
   - Илова кардани Directions dropdown
   - Multi-select барои направления
   - Color picker
   - Work experience input
   - File upload барои avatar
   - Optional: cover images

2. Таҷдид `useAddStaffForm.js`
   - Илова кардани майдонҳои нав
   - Validation барои майдонҳои нав
   - File handling

---

### МАРҲИЛАИ 5: Toast Integration
**Вақт: 10 дақиқа**

1. Таҷдид `AddStaffModal.jsx`
   - Import useToast
   - showToast() пас аз успех
   - Паёми тоҷикӣ

---

### МАРҲИЛАИ 6: Навсозии саҳифа
**Вақт: 5 дақиқа**

1. Таҷдид `Personal.jsx` (куҳна)
   - refetch() пас аз успех
   - Auto-update table

---

## ⚠️ МУШКИЛОТИ ЭҲТИМОЛӢ

### 1. CORS Issues
```javascript
// Агар CORS хатогӣ:
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'multipart/form-data' // Барои файлҳо
}
```

### 2. File Upload
```javascript
const formData = new FormData();
formData.append('avatar', avatarFile);
formData.append('name', 'John');
// ...
```

### 3. Array барои direction_id
```javascript
// Backend интизор аст: [1, 2, 3]
directions.forEach((id, index) => {
  formData.append(`direction_id[${index}]`, id);
});
```

---

## 🎯 ТАРТИБИ ИҶРО

### Тарзи кор:
Ман ҳар марҳиларо **якто-якто** мекунам:

1. **МАРҲИЛАИ 1** → API Config
2. Шумо санҷед → ✅ Хуб
3. **МАРҲИЛАИ 2** → Directions API
4. Шумо санҷед → ✅ Хуб
5. **МАРҲИЛАИ 3** → staffApi таҷдид
6. ... (давом)

Пас аз ҳар марҳила шумо месанҷед ва мегӯед:
- ✅ **"давом деҳ"** - агар хуб
- 🔄 **"ин ҷойро тағйир деҳ"** - агар мушкил

---

## 📋 CHECKLIST

- [ ] МАРҲИЛАИ 1: API Config (constants/apiConfig.js)
- [ ] МАРҲИЛАИ 2: Directions API + Hook
- [ ] МАРҲИЛАИ 3: staffApi.js таҷдид (mock → backend)
- [ ] МАРҲИЛАИ 4: Форма таҷдид (directions, files)
- [ ] МАРҲИЛАИ 5: Toast integration
- [ ] МАРҲИЛАИ 6: Навсозии саҳифа

---

## 🔑 МУҲИМ

1. **Authorization Token**: `7|XqFsmbbAcUtGpzBJ5Wj7nuDVnF8zflGlWhjz2ZPzac8d8e62`
2. **Base URL**: `http://84.54.31.36:8081`
3. **File Upload**: FormData истифода
4. **Array**: direction_id[0], direction_id[1]...
5. **Тексҳо**: Ҳамаи тексҳо бо русӣ (форма, toast, validation)

---

## ✅ НАТИҶАИ ИНТИЗОРӢ

**Пеш:**
- Mock data
- Бе направления
- Форма оддӣ

**Баъд:**
- Backend API
- Directions аз сервер
- File upload
- Toast notifications
- Auto-refresh

**Вақти умумӣ:** ~60 дақиқа

---

## 🚀 ОМОДА БАРОИ ОҒОЗ?

Агар план хуб бошад, гӯед **"давом деҳ"** ва ман:
1. МАРҲИЛАИ 1 оғоз мекунам
2. API Config месозам
3. Шуморо хабар медиҳам

Баъд якто-якто ба марҳилаи навбатӣ мегузарем! 🎯
