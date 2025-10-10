import React, { useState } from "react";

export default function AvatarUpload({ photo, setPhoto }) {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removePhoto = () => setPhoto(null);

  return (
    <div className="flex flex-col items-center">
      <label className="relative w-18 h-18 cursor-pointer">
        <div className="w-18 h-18 rounded-full border-2 border-dashed color-border-accent flex items-center justify-center color-bg-mini-card overflow-hidden">
          {photo ? (
            <img
              src={photo}
              alt="Avatar Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="color-accent text-xs pt-3 text-center">
              Загрузить фото
            </span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>

      {photo && (
        <button
          type="button"
          onClick={removePhoto}
          className="mt-2 px-2 py-1 text-xs text-white bg-red-500 rounded"
        >
          Удалить
        </button>
      )}
    </div>
  );
}
