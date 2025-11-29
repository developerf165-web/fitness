// src/pages/Personal/modals/AddStaffModal/useAddStaffForm.js

import { useState } from 'react';
import { STAFF_STATUS, POSITIONS } from '../../constants';

/**
 * Hook барои идораи формаи Add Staff
 */
export const useAddStaffForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    position: POSITIONS.TRAINER,
    phone: '',
    email: '',
    hireDate: new Date().toISOString().split('T')[0],
    salary: '',
    status: STAFF_STATUS.ON_WORK
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Тоза кардани хатогӣ ҳангоми тағйир
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'ФИО зарур аст';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон зарур аст';
    } else if (!/^\+?[0-9\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Формати телефон нодуруст';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email зарур аст';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Формати email нодуруст';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      position: POSITIONS.TRAINER,
      phone: '',
      email: '',
      hireDate: new Date().toISOString().split('T')[0],
      salary: '',
      status: STAFF_STATUS.ON_WORK
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    resetForm
  };
};
