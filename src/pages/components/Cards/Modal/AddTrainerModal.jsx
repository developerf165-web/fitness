import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FileUploader from '../../ui/FileUploader';
import ColorPicker from './ColorPicker';
import CustomInput from '../../Shared/CustomInput';
import FormButton from "@/components/ui/FormButton";

const AddTrainerModal = ({ isOpen, onClose, onAddTrainer }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    focus: '',
    experience: '',
    photo: null,
    background: [],
    color: 'bg-red-600',
  });


  const isFormValid =
    formData.name &&
    formData.lastName &&
    formData.phone &&
    formData.focus &&
    formData.experience &&
    formData.photo &&
    formData.background &&
    formData.color;

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name, fileOrFiles) => {
    setFormData(prev => ({ ...prev, [name]: fileOrFiles }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTrainer(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50"
      onClick={onClose}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="color-bg-card rounded-2xl w-full max-w-lg flex flex-col max-h-[95vh] overflow-hidden shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-white p-6 pb-4 flex-shrink-0">
            ДОБАВИТЬ ТРЕНЕРА
          </h2>

          <div className="overflow-y-auto px-6 flex-1 custom-scrollbar">
            <form id="add-trainer-form" onSubmit={handleSubmit} className="space-y-4">

              <CustomInput
                label="Имя"
                placeholder="Введите имя"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <CustomInput
                label="Фамилия"
                placeholder="Введите фамилию"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <CustomInput
                label="Номер телефона"
                placeholder="Введите номер телефона"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                required
              />
              <CustomInput
                label="Направление"
                placeholder="Укажите направление"
                name="focus"
                value={formData.focus}
                onChange={handleChange}
                required
              />
              <CustomInput
                label="Опыт работы"
                placeholder="Укажите опыт работы"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />

              <div className="flex flex-col sm:flex-row -mx-2 mt-6 gap-2">
                <FileUploader
                  title="Фотография тренера"
                  description="Минимальный размер 500x500px."
                  imageSrc={formData.photo}
                  onUpload={(file) => handleFileChange('photo', file)}
                  required
                />

                <FileUploader
                  title="Фоновые фотографии"
                  description="Можно загрузить несколько изображений"
                  imageSrc={formData.background}
                  onUpload={(files) => handleFileChange('background', files)}
                  multiple
                />
              </div>

              <ColorPicker
                selectedColor={formData.color}
                onSelectColor={(color) => setFormData(prev => ({ ...prev, color }))}
              />
            </form>
          </div>

          <div className="flex justify-between mt-auto p-6 pt-4 border-t color-border-mini-card flex-shrink-0">
            <FormButton
              onClick={onClose}
              className="color-bg-mini-card bg-hover-card cursor-pointer"
            >
              Отмена
            </FormButton>

            <FormButton
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={
                isFormValid
                  ? "color-bg-accent hover:bg-lime-200 cursor-pointer text-black font-semibold"
                  : "color-bg-mini-card cursor-not-allowed"
              }
            >
              Добавить
            </FormButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AddTrainerModal;
