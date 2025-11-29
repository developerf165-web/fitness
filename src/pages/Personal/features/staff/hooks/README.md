# Staff Hooks

Custom React hooks барои идораи маълумоти staff.

---

## 📋 Hooks-ҳои мавҷуда

### 1. useStaffList
Гирифтани рӯйхати ҳамаи staff

```javascript
import { useStaffList } from '@/pages/Personal/features/staff';

const { staff, isLoading, error, refetch } = useStaffList();

// staff - рӯйхати ҳамаи сотрудникҳо
// isLoading - ҳолати боргирӣ
// error - хатогӣ (агар бошад)
// refetch - функсия барои навсозии маълумот
```

**Истифода:**
```javascript
useEffect(() => {
  if (error) {
    console.error('Failed to load staff:', error);
  }
}, [error]);

if (isLoading) return <div>Загрузка...</div>;
```

---

### 2. useStaffCreate
Сохтани staff нав

```javascript
import { useStaffCreate } from '@/pages/Personal/features/staff';

const { createNewStaff, isCreating, error, success, resetState } = useStaffCreate();

const handleCreate = async () => {
  try {
    const newStaff = await createNewStaff({
      fullName: 'Иванов Иван',
      position: 'Тренер',
      phone: '+992 900 123 456',
      email: 'ivanov@example.com',
      hireDate: '2025-11-29'
    });
    console.log('Created:', newStaff);
  } catch (err) {
    console.error('Error:', err);
  }
};
```

---

### 3. useStaffUpdate
Таҳрири staff

```javascript
import { useStaffUpdate } from '@/pages/Personal/features/staff';

const { updateStaffData, isUpdating, error, success, resetState } = useStaffUpdate();

const handleUpdate = async (staffId) => {
  try {
    const updated = await updateStaffData(staffId, {
      salary: 6000,
      position: 'Старший тренер'
    });
    console.log('Updated:', updated);
  } catch (err) {
    console.error('Error:', err);
  }
};
```

---

### 4. useStaffDelete
Нест кардани staff

```javascript
import { useStaffDelete } from '@/pages/Personal/features/staff';

const { deleteStaffById, isDeleting, error, success, resetState } = useStaffDelete();

const handleDelete = async (staffId) => {
  if (confirm('Шумо мутмаин ҳастед?')) {
    try {
      await deleteStaffById(staffId);
      console.log('Deleted successfully');
    } catch (err) {
      console.error('Error:', err);
    }
  }
};
```

---

### 5. useStaffFilters
Фильтрҳо ва ҷустуҷӯ

```javascript
import { useStaffFilters } from '@/pages/Personal/features/staff';

const { 
  filteredStaff, 
  isFiltering, 
  error, 
  activeFilter,
  filterByStatus, 
  filterByPosition, 
  searchByQuery, 
  clearFilters 
} = useStaffFilters();

// Фильтр аз рӯи статус
filterByStatus('На работе');

// Фильтр аз рӯи должность
filterByPosition('Тренер');

// Ҷустуҷӯ
searchByQuery('Иван');

// Тоза кардан
clearFilters();
```

---

## 🎯 Истифодаи якҷоя

```javascript
import { 
  useStaffList, 
  useStaffCreate, 
  useStaffFilters 
} from '@/pages/Personal/features/staff';

function PersonalPage() {
  const { staff, isLoading, refetch } = useStaffList();
  const { createNewStaff } = useStaffCreate();
  const { searchByQuery, filteredStaff } = useStaffFilters();

  const displayStaff = filteredStaff.length > 0 ? filteredStaff : staff;

  return (
    <div>
      <SearchBar onSearch={searchByQuery} />
      <StaffList data={displayStaff} />
    </div>
  );
}
```

---

## ✅ Афзалиятҳо

1. **Separation of Concerns** - Логика ҷудо аз UI
2. **Reusability** - Дар ҷойҳои гуногун истифода
3. **Error Handling** - Ҳар hook хатогиҳоро идора мекунад
4. **Loading States** - isLoading, isCreating, isUpdating
5. **Success States** - Барои feedback ба корбар
