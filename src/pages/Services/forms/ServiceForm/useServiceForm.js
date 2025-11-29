// src/pages/Services/forms/ServiceForm/useServiceForm.js

import { useState, useEffect } from 'react';

const DEFAULT_COLOR = 'bg-lime-500';

/**
 * Hook барои идораи формаи Service
 */
export function useServiceForm(initialData, isOpen) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imageUrl: '',
    description: '',
    color: DEFAULT_COLOR,
  });

  // Пур кардани форма
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        price: initialData.tjs || '',
        imageUrl: initialData.imageUrl || '',
        description: initialData.description || '',
        color: initialData.color || DEFAULT_COLOR,
      });
    } else {
      setFormData({
        title: '',
        price: '',
        imageUrl: '',
        description: '',
        color: DEFAULT_COLOR,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const handleFileUpload = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  const validate = () => {
    if (!formData.title.trim() || !formData.price) {
      alert('Лутфан номи хидмат ва нархро пур кунед');
      return false;
    }
    return true;
  };

  return {
    formData,
    handleChange,
    handleColorSelect,
    handleFileUpload,
    validate,
  };
}
