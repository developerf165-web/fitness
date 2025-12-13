import React, { useState, useEffect, useMemo } from 'react';

// Shared UI Components
import Modal from '../../../components/ui/Modal';
import ScrollableModalContentWrapper from '../../components/Shared/ScrollableModalContentWrapper';
import InputField from '../../../components/ui/InputField';
import FileUploader from '../../../components/ui/FileUploader';
import Button from '../../../components/ui/Button';
import DropdownField from '../../../components/ui/DropdownField';

export default function EditProductModal({
  isOpen,
  onClose,
  onSave,
  isSaving = false,
  product,
  categories = []
}) {

  // ----- STATE -----
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    oldPrice: '',
    discount: '',
    image: null,
    imageUrl: ''
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // ----- APPLY PRODUCT -----
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.name || '',
        category: product.category || '',
        price: product.price?.toString() || '',
        oldPrice: product.oldPrice?.toString() || '',
        discount: product.discount?.toString() || '',
        image: null,
        imageUrl: product.imageUrl || '',
      });
    }
  }, [product]);

  // ----- CATEGORY DATA -----
  const categoryData = useMemo(() => {
    const items = categories.filter(cat => cat !== "Все");
    return [{
      title: "Категории",
      items
    }];
  }, [categories]);

  // ----- EVENTS -----
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
    setFormData(prev => ({
      ...prev,
      image: file,
      imageUrl: file ? URL.createObjectURL(file) : prev.imageUrl
    }));
  };

  const handleSelectCategory = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
    setIsCategoryDropdownOpen(false);
  };

  // ----- VALIDATION -----
  const isFormValid = useMemo(() => {
    return (
      formData.title.trim() !== '' &&
      formData.category.trim() !== '' &&
      formData.price.trim() !== ''
    );
  }, [formData]);

  const handleSave = () => {
    if (!isFormValid) return;
    onSave(product.id, formData);
  };

  // ----- CONTENT -----
  const content = (
    <div className="space-y-4 pb-4">

      <InputField
        label="Название продукта*"
        name="title"
        value={formData.title}
        placeholder="Введите название продукта"
        onChange={handleChange}
      />

      <DropdownField
        label="Категория*"
        displayValue={formData.category}
        isActive={isCategoryDropdownOpen}
        onToggle={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
        onClose={() => setIsCategoryDropdownOpen(false)}
        optionsData={categoryData}
        selectedValue={formData.category}
        onSelectChange={handleSelectCategory}
        placeholder="Выберите категорию"
      />

      <InputField
        label="Цена*"
        name="price"
        type="number"
        placeholder="0.00"
        value={formData.price}
        onChange={handleChange}
      />

      <InputField
        label="Старая Цена"
        name="oldPrice"
        type="number"
        placeholder="0.00 (Опционально)"
        value={formData.oldPrice}
        onChange={handleChange}
      />

      <InputField
        label="Скидка (%)"
        name="discount"
        type="number"
        placeholder="0 (Опционально)"
        value={formData.discount}
        onChange={handleChange}
      />

      <div className="pt-1">
        <FileUploader
          title="Загрузить новое фото"
          description="Перетащите или нажмите чтобы выбрать"
          imageSrc={formData.imageUrl}
          multiple={false}
          onUpload={handleImageUpload}
        />
      </div>

    </div>
  );

  const footer = (
    <>
      <Button onClick={onClose} variant="default" disabled={isSaving}>
        Отмена
      </Button>
      <Button
        onClick={handleSave}
        variant="primary"
        disabled={!isFormValid || isSaving}
      >
        {isSaving ? "Сохранение..." : "Сохранить"}
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ScrollableModalContentWrapper
        title={`РЕДАКТИРОВАТЬ: ${product?.name || ''}`}
        content={content}
        footer={footer}
        onClose={onClose}
      />
    </Modal>
  );
}
