import React, { useState, useCallback } from 'react';
import AddLockerForm from './AddLockerForm';
import FormButton from '/src/components/ui/FormButton';

export default function AddLockerModal({ onClose, onSave }) {
  const [lockerData, setLockerData] = useState({ id: null, status: '', name: '', isFormValid: false });

  const setLockerDataForModal = useCallback((data) => {
    setLockerData(data);
  }, []);

  const handleSave = () => {
    if (lockerData.isFormValid) {
      onSave({ id: lockerData.id, status: lockerData.status, name: lockerData.name });
      onClose();
    } else {
        alert("Лутфан, ҳамаи майдонҳои ҳатмиро (Номер шкафчика) дуруст пур кунед.");
    }
  };

  return (
    <div className="color-bg-card rounded-2xl w-full max-w-md p-2 flex flex-col max-h-[90vh] overflow-hidden">
      <div className="flex justify-between p-4 items-center pb-4">
        <h2 className="text-xl font-bold text-white">ДОБАВИТЬ ШКАФЧИК</h2>

      </div>

      <div className="flex-grow overflow-y-auto py-0">
        <AddLockerForm 
            onSave={onSave} 
            setLockerDataForModal={setLockerDataForModal} 
        />
      </div>

      <div className="p-4 flex justify-between space-x-3 w-full">
        <FormButton
          onClick={onClose}
          className="color-bg-mini-card text-white bg-hover-card"
        >
          Отменить
        </FormButton>
        <FormButton
          onClick={handleSave}
          className={`color-bg-accent text-black font-semibold hover:bg-lime-400 ${!lockerData.isFormValid ? 'cursor-not-allowed' : ''}`}
          disabled={!lockerData.isFormValid}
        >
          Сохранить
        </FormButton>
      </div>
    </div>
  );
}