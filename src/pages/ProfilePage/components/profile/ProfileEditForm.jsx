import React, { useState, useEffect } from 'react';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';

/**
 * @param {object} props
 * @param {object} props.user - Маълумоти корбар
 * @param {function} props.onSave - Функсияи захира кардан
 * @param {boolean} props.isSaving - Ҳолати захиракунӣ
 */
export default function ProfileEditForm({ user, onSave, isSaving }) {
  // Ҳолат (state) барои идора кардани форма
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
  });

  // Вақте ки 'user' (аз props) тағйир меёбад, формаро навсозӣ мекунем
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        role: user.role || '',
      });
    }
  }, [user]);

  // Функсияи умумӣ барои тағйир додани майдонҳо
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Ирсоли форма (Submit)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="w-full p-6 color-bg-card rounded-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">
        Редактировать профиль
      </h3>
      
      <form onSubmit={handleSubmit}>
        <InputField
          label="Имя"
          name="firstName" // Барои handleChange
          value={formData.firstName}
          onChange={handleChange}
        />
        
        <InputField
          label="Фамилия"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        
        <InputField
          label="Номер телефона"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        
        <InputField
          label="Должность"
          name="role"
          value={formData.role}
          onChange={handleChange}
          // Агар вазифа тағйирнопазир бошад, 'disabled' илова кунед
          // disabled={true} 
        />
        
        {/* Тугмаи захиракунӣ, ки дар сурат дида намешавад, аммо ҳатмист */}
        <div className="flex justify-end mt-6">
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSaving}
          >
            {isSaving ? 'Сохраняется...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </div>
  );
}