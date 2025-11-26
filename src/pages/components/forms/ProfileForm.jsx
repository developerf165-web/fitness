import React from "react";
import { useProfileFormLogic } from "./useProfileFormLogic";
import { ProfileFormView } from "./ProfileFormView"; // Фарз мекунем, ки ин компонент мавҷуд аст

export default function ProfileForm({ userId, onClose, onUpdateSuccess, refetchProfile }) {
    const {
        form,
        isLoading,
        handleChange,
        handleSubmit,
        isFormValid,
        isProcessing,
        formError,
        photo,
        setPhoto,
        initialPhotoUrl,
    } = useProfileFormLogic({
        userId: userId,
        onClose,
        onUpdateSuccess: onUpdateSuccess || (() => {}),
        refetchProfile,
    });

    if (isLoading || form === null) {
        return (
            <div className="flex justify-center items-center h-40">
                Загрузка данных профиля...
            </div>
        );
    }

    if (formError && Object.keys(form).length === 0) {
        return (
            <div className="text-red-400 p-4 text-center">
                {formError}
            </div>
        );
    }

    return (
        <ProfileFormView
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onClose={onClose}
            isFormValid={isFormValid}
            isProcessing={isProcessing}
            formError={formError}
            photo={photo}
            setPhoto={setPhoto}
            initialPhotoUrl={initialPhotoUrl}
        />
    );
}