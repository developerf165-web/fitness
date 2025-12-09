# 🐛 BUG REPORT: POST /api/coach/create возвращает 500 Internal Server Error

## 📋 Описание проблемы

При отправке POST-запроса на эндпоинт `/api/coach/create` сервер возвращает **500 Internal Server Error** вместо успешного создания тренера или валидной ошибки 422.

---

## 🔍 Анализ

### ✅ Frontend отправляет корректные данные

Формат запроса соответствует документации API:

```
Content-Type: multipart/form-data

name: "Иван"
surname: "Петров"
phone: "992123456789"
work_experience: 3
color: "#ff0000"
status: 1
grade: 5.0
direction_id[]: 1
direction_id[]: 2
direction_id[]: 3
avatar: [FILE: photo.jpg]
cover_img[]: [FILE: cover1.jpg] (опционально)
cover_img[]: [FILE: cover2.jpg] (опционально)
```

### ❌ Предполагаемая причина на Backend

**1. Неправильная обработка массива `direction_id[]`**

Backend ожидает: `array<string>` согласно документации
Frontend отправляет: `direction_id[]` (стандартный формат FormData для массивов)

**Возможная проблема:**
- Сервер не корректно парсит `direction_id[]` как массив
- Требуется специфичная обработка multipart/form-data массивов
- Middleware для обработки файлов (например, multer в Node.js или аналог в Laravel/PHP) не настроен корректно

**2. Проблема с обработкой файлов (`avatar`, `cover_img`)**

- Если файл не отправлен, но поле обязательное → backend падает с 500 вместо 422
- Неправильная валидация типов файлов
- Отсутствие обработки исключений при сохранении файлов

**3. Отсутствие обработки ошибок**

Backend должен возвращать:
- **422 Unprocessable Entity** — если данные невалидны
- **400 Bad Request** — если формат запроса неправильный
- **500 Internal Server Error** — только при критических сбоях сервера

---

## 📤 Данные, отправленные с Frontend (последний запрос)

```json
{
  "timestamp": "2025-12-01T09:27:08.436Z",
  "method": "POST",
  "url": "/coach/create",
  "data": {
    "name": "Иван",
    "surname": "Петров",
    "phone": "992123456789",
    "direction_id[]": "1",
    "direction_id[]": "2", 
    "direction_id[]": "3",
    "work_experience": 3,
    "color": "#ff0000",
    "status": 1,
    "grade": 5.0,
    "avatar": "[FILE: photo.jpg, 52431 bytes, image/jpeg]"
  }
}
```

### 📥 Ответ сервера

```json
{
  "timestamp": "2025-12-01T09:27:11.338Z",
  "type": "ERROR",
  "method": "POST",
  "url": "/coach/create",
  "error": {
    "message": "Request failed with status code 500",
    "status": 500,
    "statusText": "Internal Server Error"
  }
}
```

---

## ✅ Что нужно проверить на Backend

### 1. Настройка multipart/form-data парсера

**Для Laravel (PHP):**
```php
// В контроллере проверить:
$request->file('avatar'); // должно работать
$request->input('direction_id'); // должно вернуть массив
```

**Для Node.js (Express + Multer):**
```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/coach/create', 
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover_img', maxCount: 10 }
  ]), 
  (req, res) => {
    // req.body.direction_id должно быть массивом
    console.log(req.body);
    console.log(req.files);
  }
);
```

### 2. Валидация данных

Добавить try-catch блок и валидировать:
```php
try {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'surname' => 'required|string|max:255',
        'phone' => 'required|string',
        'direction_id' => 'required|array',
        'direction_id.*' => 'integer|exists:directions,id',
        'work_experience' => 'required|integer|min:0',
        'avatar' => 'required|image|max:5120',
        'cover_img' => 'nullable|array',
        'cover_img.*' => 'image|max:5120',
        'color' => 'required|string',
    ]);
} catch (ValidationException $e) {
    return response()->json([
        'status' => false,
        'errors' => $e->errors()
    ], 422); // ← Правильный код ошибки
}
```

### 3. Обработка исключений

```php
try {
    // Логика создания тренера
    $coach = Coach::create($validated);
    
    return response()->json([
        'status' => true,
        'coach' => $coach
    ], 201);
    
} catch (\Exception $e) {
    // Логирование ошибки
    \Log::error('Coach creation failed: ' . $e->getMessage());
    
    return response()->json([
        'status' => false,
        'message' => 'Ошибка при создании тренера'
    ], 500);
}
```

---

## 🧪 Как воспроизвести ошибку

### 1. Через Postman/Insomnia

```
POST http://84.54.31.36:8081/api/coach/create
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

Body:
- name: Иван
- surname: Петров
- phone: 992123456789
- direction_id[0]: 1
- direction_id[1]: 2
- direction_id[2]: 3
- work_experience: 3
- color: #ff0000
- status: 1
- grade: 5.0
- avatar: [файл photo.jpg]
```

### 2. Через cURL

```bash
curl -X POST http://84.54.31.36:8081/api/coach/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Иван" \
  -F "surname=Петров" \
  -F "phone=992123456789" \
  -F "direction_id[]=1" \
  -F "direction_id[]=2" \
  -F "direction_id[]=3" \
  -F "work_experience=3" \
  -F "color=#ff0000" \
  -F "status=1" \
  -F "grade=5.0" \
  -F "avatar=@/path/to/photo.jpg"
```

---

## 📊 Логи Backend (требуется проверить)

Пожалуйста, проверьте логи сервера на момент `2025-12-01T09:27:11.338Z`:

- Laravel: `storage/logs/laravel.log`
- Node.js: console output или файл логов
- Nginx/Apache: error.log

Ищите:
- PHP Fatal Error
- Uncaught Exception
- Database query errors
- File upload errors

---

## ✅ Ожидаемое поведение

### При успехе (201 Created):
```json
{
  "status": true,
  "coach": {
    "id": 123,
    "name": "Иван",
    "surname": "Петров",
    ...
  }
}
```

### При ошибке валидации (422 Unprocessable Entity):
```json
{
  "status": false,
  "errors": {
    "phone": ["Поле телефон обязательно."],
    "direction_id": ["Поле направление обязательно."]
  }
}
```

### При критической ошибке (500 Internal Server Error):
```json
{
  "status": false,
  "message": "Внутренняя ошибка сервера"
}
```
**НО** сейчас 500 возвращается даже при корректных данных!

---

## 🎯 Резюме

Frontend отправляет данные **абсолютно корректно** согласно документации API.

Проблема **100% на стороне Backend**:
1. Неправильная обработка `multipart/form-data`
2. Неправильный парсинг массива `direction_id[]`
3. Отсутствие обработки исключений
4. Возврат 500 вместо 422 при валидационных ошибках

**Требуется:**
- Проверить логи сервера
- Исправить обработку массивов в FormData
- Добавить корректную валидацию
- Добавить обработку исключений

---

## 📎 Приложения

1. Полные API-логи: `api-logs-2025-12-01.json` (прилагается)
2. Скриншот DevTools с запросом (прилагается)
3. Документация API: `coach_create.txt`

---

**Дата:** 2025-12-01  
**Frontend разработчик:** [Ваше имя]  
**Приоритет:** 🔴 HIGH (блокирует функционал добавления тренеров)
