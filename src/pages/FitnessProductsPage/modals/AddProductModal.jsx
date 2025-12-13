import React, { useState, useMemo } from 'react';

// Shared UI Components
import Modal from '../../../components/ui/Modal';
import ScrollableModalContentWrapper from '../../components/Shared/ScrollableModalContentWrapper';
import InputField from '../../../components/ui/InputField';
import FileUploader from '../../../components/ui/FileUploader';
import Button from '../../../components/ui/Button';
import TextArea from '../../../components/ui/TextArea';
import DropdownField from '../../../components/ui/DropdownField';

// Sub-modals
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
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // --- Form Handling ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'discount') {
      if (value === '') {
        setFormData(prev => ({ ...prev, [name]: value }));
        return;
      }
      const numValue = parseFloat(value);
      if (numValue < 0) {
        setFormData(prev => ({ ...prev, [name]: '0' }));
        return;
      }
      if (numValue > 100) {
        setFormData(prev => ({ ...prev, [name]: '100' }));
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file) => {
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSelectCategory = (category) => {
    setFormData(prev => ({ ...prev, category: category }));
    setIsCategoryDropdownOpen(false);
  };

  // --- Category Modal Handling ---
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

  // --- Data & Validation ---
  const categoryOptions = useMemo(() => {
    const items = categories.filter(cat => cat !== "Все");
    return [{
      title: "Категории",
      items: items
    }];
  }, [categories]);

  const total = useMemo(() => {
    const priceNum = parseFloat(formData.price) || 0;
    const discountNum = parseFloat(formData.discount) || 0;
    if (discountNum > 0 && discountNum <= 100) {
      const finalPrice = priceNum - (priceNum * discountNum / 100);
      return finalPrice.toFixed(2);
    }
    return priceNum > 0 ? priceNum.toFixed(2) : '';
  }, [formData.price, formData.discount]);

  const isFormValid = useMemo(() => {
    return (
      formData.title.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.category.trim() !== '' &&
      formData.price.trim() !== ''
    );
  }, [formData]);

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  const handleSave = () => {
    onSave(formData);
    setFormData(initialState);
  };

  // --- Content ---
  const modalContent = (
    <div className="flex flex-col space-y-4">
      <InputField
        label="Заголовок*"
        name="title"
        placeholder="Введите название продукта"
        value={formData.title}
        onChange={handleChange}
      />

      {/* Category Dropdown */}
      <DropdownField
        label="Категория*"
        displayValue={formData.category}
        isActive={isCategoryDropdownOpen}
        onToggle={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
        onClose={() => setIsCategoryDropdownOpen(false)}
        optionsData={categoryOptions}
        selectedValue={formData.category}
        onSelectChange={handleSelectCategory}
        placeholder="Выберите категорию"
      />

      <TextArea
        label="Описание*"
        name="description"
        placeholder="Введите текст"
        value={formData.description}
        onChange={handleChange}
        maxLength={150}
        rows={4}
      />

      <FileUploader
        title="Загрузить фотографию"
        description="Минимальный размер 300х320. Макс 10."
        onUpload={handleImageUpload}
        multiple={false}
      />

      <div className="grid grid-cols-3 gap-2 pt-2 pb-1 px-1 overflow-hidden">
        <div className="min-w-0 col-span-1">
          <InputField
            label="Цена за шт.*"
            name="price"
            type="number"
            placeholder="Цена шт."
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="min-w-0 col-span-1">
          <InputField
            label="Скидка"
            name="discount"
            type="number"
            placeholder="Скидка %"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
        <div className="min-w-0 col-span-1">
          <InputField
            label="Итого"
            name="total"
            value={total}
            disabled={true}
            placeholder="Итого"
            className={!formData.price ? "opacity-70" : ""}
          />
        </div>
      </div>
    </div>
  );

  const modalFooter = (
    <>
      <Button onClick={handleClose} variant="default" disabled={isSaving}>
        Отмена
      </Button>
      <Button onClick={handleSave} variant="primary" disabled={!isFormValid || isSaving}>
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