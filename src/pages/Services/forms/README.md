# Forms

Ҳамаи формаҳо барои саҳифаи Services.

## 📁 Структура

```
forms/
├── ServiceForm/
│   ├── ServiceFormModal.jsx     # Modal wrapper
│   ├── ServiceFormFields.jsx    # Form fields
│   ├── useServiceForm.js        # Form logic
│   └── index.js
│
├── CourseForm/
│   ├── CourseFormModal.jsx
│   ├── CourseFormLayout.jsx
│   ├── CourseFormData.js
│   ├── components/
│   │   ├── Calendar.jsx
│   │   ├── TimeSelector.jsx
│   │   ├── ScheduleToggle.jsx
│   │   └── FormFooter.jsx
│   ├── hooks/
│   │   └── useClickOutside.js
│   └── index.js
│
├── DirectionForm/
│   ├── DirectionFormModal.jsx
│   ├── DirectionFormFields.jsx
│   ├── useDirectionForm.js
│   └── index.js
│
└── index.js
```

## 🎯 Мақсад

- **Логикаи формаҳо** - ҳамаи form logic дар як ҷой
- **Ҷудокунӣ** - forms ҷудо аз modals ва components
- **Reusability** - формаҳоро дар ҷойҳои гуногун истифода мебарем

## 📝 Истифода

```javascript
import { 
  ServiceFormModal,
  CourseFormModal,
  DirectionFormModal 
} from '@/pages/Services/forms';

<ServiceFormModal 
  isOpen={isOpen}
  onClose={onClose}
  onSubmit={handleSubmit}
  initialData={editingItem}
/>
```

## 🔄 Структураи ҳар form

### ServiceForm
- **Modal** - Wrapper барои форма
- **Fields** - Input fields
- **Hook** - Form state management

### CourseForm (калонтар)
- **Modal** - Wrapper
- **Layout** - Form layout
- **Data** - Options ва конфигуратсия
- **components/** - UI компонентҳо (Calendar, TimeSelector)
- **hooks/** - Custom hooks

### DirectionForm
- **Modal** - Wrapper
- **Fields** - Input fields
- **Hook** - Form state

## ✅ Принсипҳо

1. **Separation of Concerns** - UI ҷудо аз логика
2. **Validation** - Ҳар форма validate мекунад
3. **Controlled Components** - Ҳамаи inputs controlled
4. **Custom Hooks** - Логика дар hooks
