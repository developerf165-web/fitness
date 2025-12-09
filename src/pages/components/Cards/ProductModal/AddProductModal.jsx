// src/components/Cards/AddProductModal/AddProductModal.jsx

import React, { useState, useMemo, useEffect, useRef } from 'react'; // 💡 useRef ва useEffect илова карда шуданд
import { ChevronRightIcon } from '@heroicons/react/24/solid'; // 💡 Иконка барои тирча

// Компоненти интихобии шумо
import SelectWithOptions from '/src/components/ui/SelectWithOptions/SelectWithOptions';

// Ворид кардани компонентҳои асосии UI
import Modal from '/src/components/ui/Modal';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import InputField from '/src/components/ui/InputField';
import FileUploader from '/src/components/ui/FileUploader';
import Button from '/src/components/ui/Button';

// Ворид кардани модали категория (барои кушодани он)
import AddCategoryModal from './AddCategoryModal';

const initialState = {
  title: '',
  description: '',
  price: '',
  discount: '',
  category: '',
  image: null
};

export default function AddProductModal({
  isOpen,
  onClose,
  onSave,
  onSaveCategory,
  categories = [],
  isSaving
}) {

  const [formData, setFormData] = useState(initialState);
  const [charCount, setCharCount] = useState(0);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // --- 1. Логикаи Dropdown аз MailingFormBody.jsx ---
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null); // Ref барои div-и категория

  useEffect(() => {
    // Функсия барои пӯшидани dropdown ҳангоми клики беруна
    function handleClickOutside(event) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryDropdownRef]);
  // --- ------------------------------------------ ---

  // --- Идоракунии Форма ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    if (value.length <= 150) {
      setFormData(prev => ({ ...prev, "description": value }));
      setCharCount(value.length);
    }
  };

  const handleImageUpload = (file) => {
    setFormData(prev => ({ ...prev, image: file }));
  };

  // 💡 2. handleSelectCategory ҳоло dropdown-ро низ мепӯшад
  const handleSelectCategory = (category) => {
    setFormData(prev => ({ ...prev, category: category }));
    setIsCategoryDropdownOpen(false); // Пӯшидани dropdown
  };

  // --- Идоракунии Модали Категория ---
  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategoryInternal = (categoryName) => {
    if (onSaveCategory) {
      onSaveCategory(categoryName);
    }
    setFormData(prev => ({ ...prev, category: categoryName }));
    setIsCategoryModalOpen(false);
  };

  // 💡 3. Маълумот барои SelectWithOptions (бетағйир)
  const categoryData = useMemo(() => {
    const items = categories.filter(cat => cat !== "Все");
    return [{
      title: "Категории",
      items: items
    }];
  }, [categories]);

  // --- (Дигар функсияҳо: total, handleClose, handleSave) ---
  const total = useMemo(() => {
    const priceNum = parseFloat(formData.price) || 0;
    const discountNum = parseFloat(formData.discount) || 0;
    if (discountNum > 0 && discountNum <= 100) {
      const finalPrice = priceNum - (priceNum * discountNum / 100);
      return finalPrice.toFixed(2);
    }
    return priceNum > 0 ? priceNum.toFixed(2) : '';
  }, [formData.price, formData.discount]);

  const handleClose = () => {
    setFormData(initialState);
    setCharCount(0);
    onClose();
  };

  const handleSave = () => {
    onSave(formData);
    setFormData(initialState);
    setCharCount(0);
  };

  // --- Мундариҷа (Content) ва Поён (Footer) ---
  const modalContent = (
    <div className="flex flex-col">

      {/* ... (Заголовок, Описание, File Uploader, Нархҳо бетағйир) ... */}
      <InputField
        label="Заголовок*"
        name="title"
        placeholder="Введите название продукта"
        value={formData.title}
        onChange={handleChange}
      />

      {/* 💡 4. БАХШИ "КАТЕГОРИЯ" ТАҒЙИР ДОДА ШУД */}
      <div>
        <label className="pl-2.5 block text-sm font-medium color-accent mb-2">Категория*</label>

        {/* Ин div ҳоло Ref-ро барои handleClickOutside истифода мебарад */}
        <div className="relative" ref={categoryDropdownRef}>
          {/* Ин input ҳоло ҳамчун тугмаи кушодани dropdown кор мекунад */}
          <input
            type="text"
            readOnly
            placeholder="Выберите категорию"
            className="w-full text-sm px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent cursor-pointer"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            value={formData.category} // Категорияи интихобшударо нишон медиҳад
          />
          {/* Тирча (Стрелка) ба монанди намуна */}
          <ChevronRightIcon
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-90' : 'rotate-0'
              }`}
          />

          {/* SelectWithOptions ҳоло дар дохили ин div-и пинҳоншаванда ҷойгир аст */}
          {isCategoryDropdownOpen && (
            <div className="absolute top-full mt-2 w-full z-10">
              <SelectWithOptions
                data={categoryData}
                selectedValue={formData.category}
                onChange={handleSelectCategory}
              />
            </div>
          )}
        </div>


        <div>
          <label className="pl-2.5 pt-4 block text-sm font-medium color-accent mb-1">Описание*</label>
          <textarea
            name="description"
            placeholder="Введите текст"
            value={formData.description}
            onChange={handleDescriptionChange}
            rows="4"
            className="w-full text-sm px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent resize-none"
          />
          <p className="text-right text-xs text-gray-500 mt-1">{charCount} / 150 символов</p>
        </div>

        <FileUploader
          title="Загрузить фотографию"
          description="Минимальный размер 300х320. Макс 10."
          onUpload={handleImageUpload}
          multiple={false}
        />
        <div className="flex gap-3 pt-2 pb-4">
          <div className="flex-1">
            <label className="pl-4 block text-sm font-medium color-accent mb-1">Цена за шт.*</label>
            <input name="price" placeholder="Цена шт." type="number" value={formData.price} onChange={handleChange} className="w-full text-sm px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent" />
          </div>
          <div className="flex-1">
            <label className="pl-4 block text-sm font-medium color-accent mb-1">Скидка</label>
            <input name="discount" placeholder="Скидка %" type="number" value={formData.discount} onChange={handleChange} className="w-full text-sm px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent" />
          </div>
          <div className="flex-1">
            <label className="pl-4 block text-sm font-medium color-accent mb-1">Итого</label>
            <input name="total" placeholder="Итого" type="text" value={total} disabled={true} className="w-full text-sm px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent disabled:opacity-70" />
          </div>
        </div>

      </div>
    </div>
  );

  const modalFooter = (
    <>
      <Button onClick={handleClose} variant="default" disabled={isSaving}>
        Отмена
      </Button>
      <Button onClick={handleSave} variant="primary" disabled={isSaving}>
        {isSaving ? "Добавление..." : "Добавить"}
      </Button>
    </>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ScrollableModalContentWrapper
          title="ДОБАВИТЬ ПРОДУКТ"
          content={modalContent}
          footer={modalFooter}
          onClose={handleClose}
        />
      </Modal>

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategoryInternal}
        isSaving={isSaving}
      />
    </>
  );
}