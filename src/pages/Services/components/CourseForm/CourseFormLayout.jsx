// fileName: CourseFormLayout.jsx
import React from 'react';

// Компонентҳои дохилӣ
import DropdownField from '../../../components/ui/DropdownField';
import Calendar from './Calendar';
import ScheduleToggle from './ScheduleToggle';
import TimeSelector from './TimeSelector';
import SelectWithOptions from '../../../components/ui/SelectWithOptions/SelectWithOptions';

export default function CourseFormLayout({
  formData,
  activeField,
  timeSelectorRef,
  trainerDropdownStyle,
  currentTrainerOptions,
  courseOptions,
  goalOptions,
  clientOptions,
  handleClientToggle,
  closeActiveDropdown,
  handleSelectChange,
  handleFreeTrainersClick,
  setActiveField,
  getClientDisplayValue,
  setFormData,
}) {
  const trainerDisplay = formData.trainer && activeField !== 'trainer';

  // !!! МУҲИМ: "relative" илова шуд, то absolute positioning кор кунад !!!
  return (
    <div className="relative space-y-4 font-sans text-white pb-40"> 
      
      {/* 1. Курсы */}
      <DropdownField
        label="Курсы*"
        displayValue={formData.course}
        isActive={activeField === 'course'}
        onToggle={() => setActiveField(activeField === 'course' ? null : 'course')}
        onClose={closeActiveDropdown}
        optionsData={courseOptions}
        selectedValue={formData.course}
        onSelectChange={(val) => handleSelectChange('course', val)}
        placeholder="Выберите курсы"
      />

      {/* 2. Цель тренировки */}
      <DropdownField
        label="Цель тренировки*"
        displayValue={formData.goal}
        isActive={activeField === 'goal'}
        onToggle={() => setActiveField(activeField === 'goal' ? null : 'goal')}
        onClose={closeActiveDropdown}
        optionsData={goalOptions} 
        selectedValue={formData.goal}
        onSelectChange={(val) => handleSelectChange('goal', val)} 
        placeholder="Выберите цель"
      />

      {/* 3. Список клиентов */}
      <DropdownField
        label="Список клиентов*"
        displayValue={getClientDisplayValue(formData.clients)}
        isActive={activeField === 'clients'}
        onToggle={() => setActiveField(activeField === 'clients' ? null : 'clients')}
        onClose={closeActiveDropdown}
        optionsData={clientOptions}
        selectedValue={formData.clients}
        onSelectChange={handleClientToggle}
        placeholder="Выберите клиентов"
      />
      
      {/* 4. График (ScheduleToggle) */}
      <ScheduleToggle 
        scheduleType={formData.scheduleType}
        onToggle={(type) => setFormData(prev => ({ ...prev, scheduleType: type }))}
      />

      {/* 5. Календарь (Calendar) */}
      <Calendar 
        selectedFullDate={formData.selectedFullDate}
        scheduleType={formData.scheduleType}
        onDateSelect={(date) => setFormData(prev => ({ ...prev, selectedFullDate: date }))}
      />

      {/* 6. TimeSelector бо REF */}
      <div ref={timeSelectorRef} className="relative">
        <TimeSelector 
          selectedTime={formData.selectedTime}
          onSelectTime={(time) => setFormData(prev => ({ ...prev, selectedTime: time }))}
          onFreeTrainersClick={handleFreeTrainersClick} 
        />
      </div>

      {/* 7. SelectWithOptions (Рӯйхати тренерҳо) */}
      {activeField === 'trainer' && (
        <div 
          className="absolute z-50" 
          style={trainerDropdownStyle} 
        > 
           <SelectWithOptions 
             data={currentTrainerOptions} 
             selectedValue={formData.trainer} 
             onChange={(val) => handleSelectChange('trainer', val)} 
           />
        </div>
      )}
      
      {/* 8. Намоиши тренери интихобшуда */}
      {trainerDisplay && (
         <div className="mt-4 p-3 rounded-xl color-bg-mini-card text-white flex justify-between items-center">
            <span className="text-sm text-zinc-400">Тренер:</span>
            <span className="text-sm font-bold text-white">{formData.trainer}</span>
         </div>
      )}

    </div>
  );
}