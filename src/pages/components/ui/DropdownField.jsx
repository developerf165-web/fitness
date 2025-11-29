// fileName: DropdownField.jsx
import React, { useRef, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import SelectWithOptions from './SelectWithOptions/SelectWithOptions';
import useClickOutside from '/src/pages/Services/forms/CourseForm/hooks/useClickOutside';

export default function DropdownField({
  label,
  displayValue,
  isActive,
  onToggle, // Функсияи toggle ҳоло аз тарафи беруна идора мешавад
  optionsData,
  selectedValue,
  onSelectChange,
  placeholder,
  onClose, // Функсияи нав барои бастан аз берун
}) {
  const wrapperRef = useRef(null);

  // Истифодаи Hook барои пӯшидани Dropdown ҳангоми клики берунӣ
  // useCallback барои оптимизатсияи функсияи handler истифода мешавад
  const handleOutsideClick = useCallback(() => {
      // Танҳо вақте ки Dropdown фаъол аст, кӯшиши бастан кунед
      if (isActive) {
          onClose();
      }
  }, [isActive, onClose]);

  // Бо истифодаи useClickOutside: Вақте ки isActive=true, listener фаъол мешавад.
  useClickOutside(wrapperRef, handleOutsideClick);

  return (
    <div className="relative" ref={wrapperRef}> {/* Ref-ро ба wrapper илова мекунем */}
      <label className="color-accent text-md mb-1 block pl-4 font-medium">
        {label}
      </label>
      <div 
        onClick={onToggle}
        className="color-bg-mini-card p-3 rounded-xl flex justify-between items-center cursor-pointer bg-hover-card transition-colors duration-200"
      >
        <span className={`text-sm ${displayValue ? 'text-white' : 'text-zinc-500'}`}>
          {displayValue || placeholder}
        </span>
        <ChevronRight size={16} className={`color-accent transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`} />
      </div>
      
      {isActive && (
        // `z-50` барои он ки Dropdown дар болои ҳамаи элементҳо бошад
        <div className="absolute w-full z-50 mt-1"> 
          <SelectWithOptions 
            data={optionsData} 
            selectedValue={selectedValue} 
            onChange={onSelectChange} 
          />
        </div>
      )}
    </div>
  );
}