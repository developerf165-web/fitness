// TrainerForm.jsx
import React from 'react';
import CustomInput from '../../Shared/CustomInput';
import FileUploader from '../../ui/FileUploader';
import ColorPicker from '../../ui/ColorPicker';
import DropdownField from '../../ui/DropdownField';
import FormButton from "@/components/ui/FormButton";

// Ҳамаи мантиқ ва state ба воситаи props мегузаранд
const TrainerForm = ({ 
    formData, 
    handleChange, 
    handleFileChange, 
    handleColorChange, 
    activeField, 
    setActiveField, 
    closeActiveDropdown, 
    displayFocus,
    FOCUS_OPTIONS_FOR_SELECT,
    getSelectedLabels,
    handleFocusChange,
    isFormValid,
    isLoading,
    handleSubmit,
    onClose
}) => {
    
    const dropdownProps = {
        isActive: activeField === 'focus',
        onToggle: () => setActiveField(activeField === 'focus' ? null : 'focus'),
        onClose: closeActiveDropdown,
        optionsData: FOCUS_OPTIONS_FOR_SELECT,
        selectedValue: getSelectedLabels(formData.focus), // Табдил додани ID ба Label
        onSelectChange: handleFocusChange, // Label-ро мегирад ва дар AddTrainerModal ба ID табдил медиҳад
    };

    const formContent = (
        <form id="add-trainer-form" className="space-y-4 relative pb-32"> 
            {/* Input fields */}
            <CustomInput label="Имя*" placeholder="Введите имя" name="name" value={formData.name} onChange={handleChange} required />
            <CustomInput label="Фамилия*" placeholder="Введите фамилию" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <CustomInput label="Номер телефона*" placeholder="Введите номер телефона" name="phone" value={formData.phone} onChange={handleChange} type="tel" required />

            {/* Dropdown Field */}
            <DropdownField
                label="Направление*"
                placeholder="Выберите направления"
                displayValue={displayFocus}
                {...dropdownProps}
            />

            <CustomInput label="Опыт работы (лет)" placeholder="Укажите стаж (число)" name="experience" value={formData.experience} onChange={handleChange} type="number" />

            {/* Uploaders */}
            <div className="flex flex-col sm:flex-row -mx-2 mt-6 gap-2">
                <FileUploader
                    title="Фотография тренера*" description="Минимальный размер 500x500px."
                    imageSrc={formData.photo} onUpload={(file) => handleFileChange('photo', file)} required
                />
                <FileUploader
                    title="Фоновые фотографии" description="Можно загрузить несколько изображений"
                    imageSrc={formData.background} onUpload={(files) => handleFileChange('background', files)} multiple
                />
            </div>

            {/* Color Picker */}
            <ColorPicker selectedColor={formData.color} onSelectColor={handleColorChange} />
        </form>
    );

    const formFooter = (
        <>
            <FormButton onClick={onClose} className="color-bg-mini-card bg-hover-card cursor-pointer" disabled={isLoading}>
                Отмена
            </FormButton>
            <FormButton
                onClick={handleSubmit} 
                disabled={!isFormValid || isLoading}
                className={isFormValid && !isLoading ? "color-bg-accent hover:bg-lime-200 cursor-pointer text-black font-semibold" : "color-bg-mini-card cursor-not-allowed opacity-70"}
            >
                {isLoading ? "Загрузка..." : "Добавить"}
            </FormButton>
        </>
    );

    return { formContent, formFooter };
};

export default TrainerForm;