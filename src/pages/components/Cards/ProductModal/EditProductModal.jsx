// src/components/Cards/EditProductModal/EditProductModal.jsx

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Modal from '/src/components/ui/Modal';
import ScrollableModalContentWrapper from '@/components/Shared/ScrollableModalContentWrapper';
import InputField from '/src/components/ui/InputField';
import Button from '/src/components/ui/Button';
import SelectWithOptions from '/src/components/ui/SelectWithOptions/SelectWithOptions';
import FileUploader from '/src/components/ui/FileUploader';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

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
  const categoryDropdownRef = useRef(null);

  // ----- CLICK OUTSIDE -----
  useEffect(() => {
    function handleClickOutside(e) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleSave = () => {
    if (!formData.title.trim() || !formData.price.trim() || !formData.category.trim()) {
      alert("Пожалуйста, заполните обязательные поля.");
      return;
    }

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

      {/* CATEGORY (SAME AS AddProductModal) */}
      <div>
        <label className="pl-2.5 block text-sm font-medium color-accent mb-2">Категория*</label>

        <div className="relative" ref={categoryDropdownRef}>
          <input
            type="text"
            readOnly
            placeholder="Выберите категорию"
            className="w-full text-sm px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent cursor-pointer"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            value={formData.category}
            name="category"
          />

          <ChevronRightIcon
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-90' : 'rotate-0'
              }`}
          />

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
      </div>

      {/* PRICE */}
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
          imageSrc={formData.imageUrl}   // ✔ ДУРУСТ
          multiple={false}
          onUpload={(file) => {
            setFormData(prev => ({
              ...prev,
              image: file,
              imageUrl: file ? URL.createObjectURL(file) : prev.imageUrl
            }));
          }}
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
        disabled={isSaving}
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
