import React from "react";
import ScrollableModalContentWrapper from "@/components/Shared/ScrollableModalContentWrapper";
import InputField from "/src/components/ui/InputField";
import RadioGroup from "/src/components/ui/RadioGroup";
import FormButton from "/src/components/ui/FormButton";
import FormSection from "/src/components/ui/FormSection";
import AvatarUpload from "/src/components/ui/AvatarUpload"; // <-- Илова шуд

/**
 * @typedef {object} ProfileFormViewProps
 * @property {object} form - Объект бо арзишҳои форма.
 * @property {string | null} initialPhotoUrl - URL-и сурати мавҷуда аз Backend.
 * @property {File | null} photo - Файли нави интихобшуда.
 * @property {(file: File | null) => void} setPhoto - Функсияи тағирдиҳандаи фото.
 * @property {(field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} handleChange - Функсияи тағирдиҳандаи майдон.
 * @property {(e: React.FormEvent) => void} handleSubmit - Функсияи ирсоли форма.
 * @property {() => void} onClose - Функсияи пӯшидани модал.
 * @property {boolean} isFormValid - Нишондиҳандаи дурустии форма.
 * @property {boolean} isProcessing - Нишондиҳандаи коркарди дархост.
 * @property {string | null} formError - Хатогие, ки ҳангоми ирсоли форма ба вуҷуд омадааст.
 */

/**
 * Компоненти намоишдиҳандаи формаи профил бо wrapper-и скроллшаванда.
 * @param {ProfileFormViewProps} props
 * @returns {JSX.Element}
 */
export const ProfileFormView = ({
    form,
    initialPhotoUrl, // <-- NEW
    photo, // <-- NEW
    setPhoto, // <-- NEW
    handleChange,
    handleSubmit,
    onClose,
    isFormValid,
    isProcessing,
    formError,
}) => {
    // 1. Мундариҷаи асосии форма (Content)
    const modalContent = (
        <div className="space-y-6"> 
            
            {/* --- АВАТАР --- */}
            <AvatarUpload 
                photo={photo} 
                setPhoto={setPhoto} 
                initialPhotoUrl={initialPhotoUrl} // URL-и сурати мавҷударо мегузаронем
                disabled={isProcessing} // Ҳангоми коркард ғайрифаъол мекунем
            />

            {/* Бахши хато */}
            {formError && (
                <div className="text-red-400 p-2 text-center border border-red-500 rounded-lg text-sm">
                    {formError}
                </div>
            )}

            {/* Майдонҳои форма */}
            <FormSection>
                <InputField
                    label="Имя"
                    name="name"
                    value={form.name || ''}
                    onChange={handleChange("name")}
                    disabled={isProcessing}
                />
                <InputField
                    label="Фамилия"
                    name="surname"
                    value={form.surname || ''}
                    onChange={handleChange("surname")}
                    disabled={isProcessing}
                />
                {/* <InputField
                    label="Номер телефона" 
                    name="username"
                    value={form.username || ''}
                    onChange={handleChange("username")}
                    disabled={isProcessing}
                /> */}
                {/* <InputField
                    label="Дата рождения"
                    name="birthday"
                    type="date"
                    value={form.birthday || ''}
                    onChange={handleChange("birthday")}
                    disabled={isProcessing}
                /> */}
            </FormSection>

            <FormSection className="grid grid-cols-3 gap-3"> 
                <InputField
                    label="Возраст"
                    name="age"
                    type="number"
                    value={form.age || ''}
                    onChange={handleChange("age")}
                    disabled={isProcessing}
                />
                <InputField
                    label="Вес (кг)"
                    name="weight"
                    type="number"
                    value={form.weight || ''}
                    onChange={handleChange("weight")}
                    disabled={isProcessing}
                />
                <InputField
                    label="Рост (см)"
                    name="height"
                    type="number"
                    value={form.height || ''}
                    onChange={handleChange("height")}
                    disabled={isProcessing}
                />
            </FormSection>

            <RadioGroup
                name="gender"
                value={form.gender || 'male'}
                onChange={handleChange("gender")}
                options={[
                    { label: "Мужской", value: "male" },
                    { label: "Женский", value: "female" },
                ]}
                disabled={isProcessing}
            />
        </div>
    );

    // 2. Қисмати поёнӣ (Footer)
    const modalFooter = (
        <>
            <FormButton
                type="button"
                onClick={onClose}
                className="color-bg-mini-card bg-hover-card"
                disabled={isProcessing}
            >
                Отмена
            </FormButton>

            <FormButton
                type="submit"
                disabled={!isFormValid || isProcessing}
                className={
                    !isFormValid || isProcessing
                        ? "color-bg-mini-card cursor-not-allowed"
                        : "color-bg-accent hover:bg-lime-200 text-black font-semibold"
                }
                onClick={handleSubmit} 
            >
                {isProcessing ? "Сохранение..." : "Сохранить"}
            </FormButton>
        </>
    );

    // 3. Компоненти умумии wrapper
    return (
        <form onSubmit={handleSubmit} className="h-full">
            <ScrollableModalContentWrapper
                title="ИЗМЕНЕНИЕ ПРОФИЛЯ"
                content={modalContent}
                footer={modalFooter}
                onClose={onClose}
            />
        </form>
    );
};