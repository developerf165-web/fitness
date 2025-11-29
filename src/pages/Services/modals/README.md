# Modals

Ҳамаи модалҳо барои саҳифаи Services.

## 📁 Структура

```
modals/
├── ServicesModals.jsx       # Модалҳои Services
├── CoursesModals.jsx        # Модалҳои Courses  
├── DirectionsModals.jsx     # Модалҳои Directions
├── CardioCourseModal.jsx    # Modal маълумоти курс
├── components/              # Компонентҳои дохилӣ
│   ├── CourseHeader.jsx
│   ├── CourseContent.jsx
│   ├── ParticipantsTable.jsx
│   ├── CustomTableRow.jsx
│   └── ModalFooter.jsx
└── index.js
```

## 🎯 Мақсад

- **Гурӯҳбандии модалҳо** - ҳар feature модалҳои худро дорад
- **Тозакунии кодҳо** - модалҳо ҷудо аз компонентҳои асосӣ
- **Идораи осон** - ҳамаи модалҳо дар як ҷой

## 📝 Истифода

```javascript
import { 
  ServicesModals,
  CoursesModals,
  DirectionsModals 
} from '@/pages/Services/modals';

// Дар Services.jsx
<ServicesModals modals={serviceModals} handlers={serviceHandlers} />
<CoursesModals modals={courseModals} handlers={courseHandlers} />
```

## 🔄 Модалҳо

### ServicesModals
- DeleteConfirmationModal - Тасдиқи нест кардан
- ServiceFormModal - Таҳрир/сохтан

### CoursesModals
- CardioCourseModal - Маълумоти курс
- CourseCancelConfirmationModal - Тасдиқи бекоркунӣ
- CourseFormModal - Таҳрир/сохтан

### DirectionsModals
- DeleteConfirmationModal - Тасдиқи нест кардан
- DirectionFormModal - Таҳрир/сохтан

## ✅ Афзалиятҳо

1. **Ҷойгиршавии худкор** - ҳамаи модалҳо дар як компонент
2. **Props осон** - танҳо modals ва handlers
3. **Хондани осон** - структураи равшан
