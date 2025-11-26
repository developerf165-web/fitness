import React, { useCallback } from "react";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

export default function InputField({ label, placeholder, type = "text", value, onChange, ...props }) {

  const handleDateChange = useCallback((date) => {
    // Табдил додани Date Object ба формати сатрии "YYYY-MM-DD" барои Form Logic
    const formattedDate = date ? date.toISOString().split('T')[0] : ''; 

    if (onChange) {
      onChange({ target: { value: formattedDate } });
    }
  }, [onChange]);
  
  if (type === 'date') {
    const selectedDate = value ? new Date(value) : null;
    const validDate = (selectedDate && !isNaN(selectedDate.getTime())) ? selectedDate : null;
    const finalPlaceholder = placeholder || "дд.мм.гггг";
    return (
      <div className="mb-4">
        <label className="pl-4 block text-sm font-medium color-accent mb-1">
          {label}
        </label>

        <ReactDatePicker
          selected={validDate}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy"
          placeholderText={finalPlaceholder}
          
          // 💡 Истифодаи Popper Class барои татбиқи стилҳои Dark Mode
          popperClassName="react-datepicker-popper-dark" 
          
          className="w-full text-sm px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent"
          wrapperClassName="w-full"
          {...props} 
        />
      </div>
    );
  }
  
  // Дар дигар ҳолатҳо, <input>-и аслиро нишон медиҳем
  return (
    <div className="mb-4">
      <label className="pl-[12px] block text-sm font-medium color-accent mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-sm px-3 py-2 rounded-md color-bg-mini-card text-white outline-none focus:ring-2 focus:color-accent"
        {...props}
      />
    </div>
  );
}