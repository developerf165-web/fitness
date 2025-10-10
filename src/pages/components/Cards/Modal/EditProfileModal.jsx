import React, { useState, useEffect } from 'react'; // useEffect-ро import мекунем
import CustomInput from '../../Shared/CustomInput';

const initialProfileData = {
    status: 'На работе',
    name: 'Азиза',
    lastName: 'Султанова',
    phone: '+992 92 000 00 00',
    position: 'Администратор',
    photoUrl: '/images/default-avatar.jpg',
};

const EditProfileModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState(initialProfileData);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]); 

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleStatusChange = (status) => {
        setFormData(prev => ({ ...prev, status }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={onClose}>
            
            <div 
                className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]" 
                onClick={(e) => e.stopPropagation()}
            >
            
                <h2 className="text-2xl font-bold text-white p-6 pb-4 flex-shrink-0">
                    РЕДАКТИРОВАТЬ
                </h2>

                <div className="overflow-y-auto px-6 custom-scrollbar">
                    <form id="edit-profile-form" onSubmit={handleSubmit}>
                        <div className="flex justify-center mb-6">
                            <div className="w-28 h-28 rounded-xl overflow-hidden shadow-lg border-2 border-gray-700 relative">
                                <img src={formData.photoUrl} alt="Профил" className="w-full h-full object-cover" />
                                <div className="absolute bottom-1 right-1 w-3 h-3 bg-lime-400 rounded-full border-2 border-gray-900" />
                            </div>
                        </div>

                        <div className="flex justify-center space-x-6 mb-6">
                            <label className="flex items-center space-x-2 text-white cursor-pointer">
                                <input type="radio" name="status" value="На работе" checked={formData.status === 'На работе'} onChange={() => handleStatusChange('На работе')} className="hidden" />
                                <div className={`w-4 h-4 rounded-full border-2 transition duration-150 ${formData.status === 'На работе' ? 'border-lime-400 bg-lime-400' : 'border-gray-500'}`}>
                                    {formData.status === 'На работе' && <div className="w-2 h-2 bg-gray-900 rounded-full mx-auto my-auto mt-0.5" />}
                                </div>
                                <span>На работе</span>
                            </label>
                            
                            <label className="flex items-center space-x-2 text-white cursor-pointer">
                                <input type="radio" name="status" value="На карантине" checked={formData.status === 'На карантине'} onChange={() => handleStatusChange('На карантине')} className="hidden" />
                                <div className={`w-4 h-4 rounded-full border-2 transition duration-150 ${formData.status === 'На карантине' ? 'border-lime-400 bg-lime-400' : 'border-gray-500'}`}>
                                    {formData.status === 'На карантине' && <div className="w-2 h-2 bg-gray-900 rounded-full mx-auto my-auto mt-0.5" />}
                                </div>
                                <span className="text-gray-400">На карантине</span>
                            </label>
                        </div>
                        
                        <CustomInput label="Имя" placeholder="Азиза" name="name" value={formData.name} onChange={handleChange} required />
                        <CustomInput label="Фамилия" placeholder="Султанова" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        <CustomInput label="Номер телефона" placeholder="+992 92 000 00 00" name="phone" value={formData.phone} onChange={handleChange} type="tel" required />
                        <CustomInput label="Должность" placeholder="Администратор" name="position" value={formData.position} onChange={handleChange} required />

                        <div className="text-right mt-1 mb-6">
                            <button type="button" className="text-lime-400 hover:text-lime-300 transition duration-200 text-sm font-medium">
                                Изменить пароль
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex justify-between p-6 pt-4 mt-auto flex-shrink-0">
                    <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition duration-200 font-medium">
                        Отмена
                    </button>
                    <button type="submit" form="edit-profile-form" className="px-6 py-2 rounded-lg text-black bg-lime-400 hover:bg-lime-300 transition duration-200 font-medium">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;