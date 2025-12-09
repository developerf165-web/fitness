import React, { useState, useEffect } from "react";
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function AvatarUpload({ photo, setPhoto, initialPhotoUrl, disabled = false }) {
    const [preview, setPreview] = useState(null);

    const isPlaceholderUrl = initialPhotoUrl && initialPhotoUrl.includes("via.placeholder.com");
    // displayUrl ҳоло танҳо аз preview ва initialPhotoUrl вобаста аст
    const displayUrl = preview || (!isPlaceholderUrl && initialPhotoUrl) || null;

    // --- Ин қисм мушкилотро ҳал мекунад ---
    useEffect(() => {
        // Агар photo мавҷуд набошад, preview-ро ба null мегузорем ва URL-ро тоза намекунем, агар он initialPhotoUrl бошад.
        if (!photo) {
            setPreview(null);
            return;
        }

        // Агар photo мавҷуд бошад, URL-и нав эҷод мекунем
        const objectUrl = URL.createObjectURL(photo);
        setPreview(objectUrl);

        // Cleanup: Вақте ки компонент аз байн меравад ё photo тағйир меёбад, URL-ро тоза мекунем
        return () => URL.revokeObjectURL(objectUrl);
    }, [photo]); // Танҳо photo ҳамчун вобастагӣ лозим аст

    // --- Функсияи пештараро каме беҳтар мекунем ---
    const handleFileChange = (e) => {
        if (disabled) return;
        const file = e.target.files && e.target.files[0];
        if (file) {
            setPhoto(file); 
        } else {
            // Агар файл интихоб нашуд (масалан, корбар cancel кард)
            setPhoto(null);
        }
    };

    const removePhoto = () => {
        if (disabled) return;
        setPhoto(null);
    };

    return (
        <div className="flex flex-col items-center">
            <label className={`relative w-28 h-28 ${disabled ? 'cursor-default opacity-70' : 'cursor-pointer'}`}>
                <div className="w-28 h-28 rounded-full border-2 border-dashed color-border-accent flex items-center justify-center color-bg-mini-card overflow-hidden">
                    
                    {displayUrl ? (
                        <img
                            src={displayUrl}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                            onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = ''; // Сурати хатогиро тоза мекунем
                                // Ба ҷои иваз кардани HTML, беҳтараш иҷозат диҳем, ки нишонаи пешфарз (UserCircleIcon) пайдо шавад
                                setPreview(null); // Барои бозгашт ба нишонаи пешфарз, preview-ро нест мекунем
                                setPhoto(null);
                            }}
                        />
                    ) : (
                        <UserCircleIcon className="w-20 h-20 text-gray-500" /> 
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={disabled}
                />
            </label>

            {(displayUrl || photo) && (
                <button
                    type="button"
                    onClick={removePhoto}
                    className={`mt-2 px-2 py-1 text-xs text-white bg-red-600 rounded ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-700'}`}
                    disabled={disabled}
                >
                    Удалить фото
                </button>
            )}
        </div>
    );
}