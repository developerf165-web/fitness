# Personal Components

UI компонентҳо барои саҳифаи Personal.

---

## 📋 Компонентҳо

### 1. PersonalHeader
Header барои саҳифа бо тугмаи "Добавить"

```javascript
import { PersonalHeader } from '@/pages/Personal/components';

<PersonalHeader 
  title="Персонал" 
  onAdd={handleAddClick} 
/>
```

**Props:**
- `title` (string) - Сарлавҳа (default: "Персонал")
- `onAdd` (function) - Handler барои тугмаи добавить

---

### 2. PersonalSearch
Search компонент бо debounce

```javascript
import { PersonalSearch } from '@/pages/Personal/components';

<PersonalSearch 
  onSearch={handleSearch}
  placeholder="Поиск..."
/>
```

**Props:**
- `onSearch` (function) - Handler барои ҷустуҷӯ
- `placeholder` (string) - Матни placeholder

**Хусусиятҳо:**
- ✅ Debounce 300ms
- ✅ Auto-clear button
- ✅ Search icon
- ✅ Ҷустуҷӯ баъд аз 2+ аломат

---

### 3. PersonalTable
Table барои намоиши staff

```javascript
import { PersonalTable } from '@/pages/Personal/components';

<PersonalTable 
  staff={staffList}
  title="На работе"
  onEdit={handleEdit}
  onDelete={handleDelete}
  isLoading={false}
/>
```

**Props:**
- `staff` (array) - Рӯйхати staff
- `title` (string) - Сарлавҳаи ҷадвал (optional)
- `onEdit` (function) - Handler барои таҳрир
- `onDelete` (function) - Handler барои нест кардан
- `isLoading` (boolean) - Ҳолати боргирӣ

**Майдонҳои table:**
- ФИО (бо avatar ва email)
- Должность
- Статус (бо рангҳо)
- Телефон
- Зарплата
- Действия (Edit, Delete)

---

### 4. PersonalTableRow
Сатри ҷадвал (истифода мешавад дар PersonalTable)

```javascript
import { PersonalTableRow } from '@/pages/Personal/components';

<PersonalTableRow 
  staff={staffItem}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

**Props:**
- `staff` (object) - Маълумоти staff
- `onEdit` (function) - Handler барои таҳрир
- `onDelete` (function) - Handler барои нест кардан

---

## 🎨 Дизайн

Ҳамаи компонентҳо бо дизайни dark mode:
- Background: gray-900, gray-800
- Text: white, gray-300, gray-400
- Accent: blue-600, blue-500
- Status colors: green, yellow, blue, red

---

## 📦 Истифодаи якҷоя

```javascript
import { 
  PersonalHeader, 
  PersonalSearch, 
  PersonalTable 
} from '@/pages/Personal/components';
import { useStaffList, useStaffFilters } from '@/pages/Personal/features/staff';

function PersonalPage() {
  const { staff, isLoading } = useStaffList();
  const { searchByQuery, filteredStaff } = useStaffFilters();
  
  const displayStaff = filteredStaff.length > 0 ? filteredStaff : staff;

  return (
    <div className="p-6">
      <PersonalHeader title="Персонал" onAdd={handleAdd} />
      <PersonalSearch onSearch={searchByQuery} />
      <PersonalTable 
        staff={displayStaff}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

---

## ✅ Хусусиятҳо

1. **Responsive** - Кор мекунад дар ҳама экранҳо
2. **Dark Mode** - Дизайни шаб
3. **Loading States** - Spinner ҳангоми боргирӣ
4. **Empty States** - Паём агар маълумот нест
5. **Interactive** - Hover effects, transitions
6. **Icons** - Lucide React icons
