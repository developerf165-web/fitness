# Utils

Helper функсияҳо барои саҳифаи Services.

## 📁 Структура

```
utils/
├── crudHelpers.js       # CRUD операсияҳо
├── formHelpers.js       # Форма validation ва helpers
├── dateHelpers.js       # Кор бо санаҳо
└── index.js
```

## 🎯 Мақсад

- **Reusability** - функсияҳои умумӣ
- **DRY принсип** - дубликатсия нест
- **Pure functions** - бе side effects

## 📝 Истифода

### CRUD Helpers

```javascript
import { createItem, updateItem, deleteItem } from '@/pages/Services/utils';

await createItem(
  apiCall,
  setItems,
  formModal,
  showToast,
  'Item созда шуд'
);
```

### Form Helpers

```javascript
import { 
  validateServiceName,
  validatePrice,
  formatPrice,
  sanitizeFormData 
} from '@/pages/Services/utils';

const result = validateServiceName('Test');
// { valid: true }

const formatted = formatPrice(1000);
// "1,000"
```

### Date Helpers

```javascript
import { 
  formatDate,
  formatDateTime,
  getDayName,
  isPastDate,
  getDaysDifference 
} from '@/pages/Services/utils';

formatDate(new Date());
// "29.11.2025"

getDayName(new Date());
// "Пятница"

getDaysDifference(date1, date2);
// 5
```

## ✅ Принсипҳо

1. **Pure Functions** - бе side effects
2. **Single Responsibility** - ҳар функсия як кор
3. **Type Safety** - input/output равшан
4. **Error Handling** - errors идора мешаванд
