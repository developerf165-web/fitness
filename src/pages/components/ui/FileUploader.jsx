// FileUploader.jsx

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FileUploader = ({
  title,
  description,
  imageSrc,
  multiple = false,
  onUpload,
  required = false,
  maxSizeMB = 5,
}) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  /**
   * Функция для преобразования объекта File или URL (string) в формат, 
   * удобный для внутреннего состояния: { file: File/null, preview: URL }
   * Она также решает проблему, когда 'imageSrc' является объектом File.
   */
  const normalizedImageSrc = useMemo(() => {
    if (!imageSrc) return null;

    if (multiple) {
      if (Array.isArray(imageSrc)) {
        return imageSrc.map(src => {
          // Если это объект File, создаем URL для превью
          if (src instanceof File) {
            return { file: src, preview: URL.createObjectURL(src) };
          }
          // Если это строка (URL с сервера), используем ее
          return { file: null, preview: src };
        });
      }
      return null;
    }
    
    // Для одиночного файла (например, avatar)
    if (imageSrc instanceof File) {
      // ИСПРАВЛЕНИЕ: Преобразование File Object в URL для превью
      return [{ file: imageSrc, preview: URL.createObjectURL(imageSrc) }];
    }
    // Для URL с сервера
    return [{ file: null, preview: imageSrc }];
    
  }, [imageSrc, multiple]);

  useEffect(() => {
    if (normalizedImageSrc) {
      setFiles(normalizedImageSrc);
    } else {
      setFiles([]);
    }
  }, [normalizedImageSrc]);

  // Очистка URL-ов, созданных с помощью createObjectURL, при размонтировании/изменении
  useEffect(() => {
    return () => {
      files.forEach((f) => f.file && f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  // ===============================
  // HANDLE FILE SELECTION
  // ===============================
  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles)
      .filter(
        (file) =>
          file.type.startsWith("image/") &&
          file.size <= maxSizeMB * 1024 * 1024
      )
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file), // Создаем URL для превью
      }));

    if (!newFiles.length) return;

    // ВАЖНО: Если не multiple, заменяем старые файлы новыми.
    const updatedFiles = multiple ? [...files, ...newFiles] : [newFiles[0]];
    setFiles(updatedFiles);

    // Передаем родительскому компоненту только объекты File
    if (multiple) {
      // onUpload ожидает массив объектов File. 
      onUpload(updatedFiles.map((f) => f.file).filter(Boolean));
    } else {
      onUpload(updatedFiles[0].file);
    }
  };

  const handleInputChange = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    const fileToRemove = files[index];
    if (fileToRemove.file) {
      URL.revokeObjectURL(fileToRemove.preview); // Очистка URL
    }
    
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    // Обновляем состояние в родительском компоненте
    if (multiple) {
      onUpload(updatedFiles.map((f) => f.file).filter(Boolean));
    } else {
      onUpload(null);
    }
  };

  return (
    <div className="w-full sm:w-1/2">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="relative cursor-pointer color-bg-mini-card rounded-lg overflow-hidden h-40 flex items-center justify-center hover:opacity-90 transition"
      >
        <input
          type="file"
          multiple={multiple}
          required={required && !files.length}
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleInputChange}
        />

        {files.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 w-full h-full p-1 overflow-y-auto">
            <AnimatePresence>
              {files.map((f, idx) => (
                <motion.div
                  key={idx}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={f.preview}
                    alt={"preview-" + idx}
                    className="w-full h-24 object-cover rounded-md"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black transition"
                  >
                    ✖
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
            <div className="color-bg-accent rounded-full p-1 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a 1 1 0 110 2h-3v3a 1 1 0 11-2 0v-3H6a 1 1 0 110-2h3V6a 1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-white text-sm font-medium">{title}</p>
            <p className="text-gray-400 text-xs mt-1">{description}</p>
            <p className="text-gray-400 text-xs mt-1 italic">Drag & Drop работает</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;