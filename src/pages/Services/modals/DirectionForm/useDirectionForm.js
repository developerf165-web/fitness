// src/pages/Services/components/DirectionForm/useDirectionForm.js

import { useState, useEffect } from 'react';

const DEFAULT_COLOR = 'bg-lime-500';

/**
 * Hook барои идораи формаи Direction
 */
export function useDirectionForm(initialData, isOpen) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    iconUrl: '',
    color: DEFAULT_COLOR,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        iconUrl: initialData.iconUrl || '',
        color: initialData.color || DEFAULT_COLOR,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        iconUrl: '',
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

  const handleIconUpload = (url) => {
    setFormData(prev => ({ ...prev, iconUrl: url }));
  };

  const validate = () => {
    if (!formData.title.trim()) {
      alert('Лутфан номи направлениеро пур кунед');
      return false;
    }
    return true;
  };

  return {
    formData,
    handleChange,
    handleColorSelect,
    handleIconUpload,
    validate,
  };
}
