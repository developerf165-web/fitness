# Components

Компонентҳои UI барои саҳифаи Services.

## 📁 Структура

```
components/
├── Active/              # Курсҳои фаъол
│   ├── ActiveItem.jsx
│   └── ActiveSection.jsx
│
├── Cards/               # Картҳои хидматҳо
│   ├── Cards.jsx
│   ├── CardSkeleton.jsx
│   └── CardsSection.jsx
│
├── Courses/             # Картҳои курсҳо
│   ├── CourseCard.jsx
│   ├── CardDetails.jsx
│   ├── CardImage.jsx
│   └── CoursesSection.jsx
│
├── Directions/          # Картҳои самтҳо
│   ├── DirectionCard.jsx
│   └── DirectionsSection.jsx
│
└── ServicesHeader.jsx   # Header компонент
```

## 🎯 Мақсад

Ҳар папка як навъи UI компонентро дар бар мегирад:
- **Presentation components** - танҳо UI
- **Логика нест** - танҳо props қабул мекунад
- **Reusable** - дар ҷойҳои гуногун истифода мешавад

## 📝 Истифода

```javascript
import { 
  ActiveSection,
  CardsSection,
  CoursesSection,
  DirectionsSection 
} from '@/pages/Services/components';

<ActiveSection items={activeItems} />
<CardsSection items={services} onEdit={handleEdit} />
```

## ✅ Принсипҳо

1. **Single Responsibility** - ҳар компонент як кор
2. **Props-driven** - ҳама чиз аз props
3. **No side effects** - бе API calls, бе state management
4. **Composable** - осон таркиб мешавад
