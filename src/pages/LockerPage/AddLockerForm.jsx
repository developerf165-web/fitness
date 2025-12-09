import React, { useState, useCallback } from 'react';
import RadioGroup from '/src/components/ui/RadioGroup';
import { STATUSES } from './constants';
import { ChevronRight } from 'lucide-react';
import SelectWithOptions from '../../features/mailings/components/SelectWithOptions/SelectWithOptions';
import { useRef, useEffect } from 'react';

const labelStyle = "block text-sm font-medium text-gray-300 mb-1";
const inputStyle = "w-full p-3 rounded-xl bg-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 border border-transparent";

export default function AddLockerForm({ onClose, onSave }) {
    const [lockerNumber, setLockerNumber] = useState('');
    const [status, setStatus] = useState(STATUSES[0]);
    // 1. Ҳолати нав барои идоракунии дропдаун
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isFormValid = lockerNumber.trim() !== '' && parseInt(lockerNumber.trim()) > 0;

    // 2. Танзими маълумот ба формати SelectWithOptions
    const statusData = [{
        title: 'Интихоби Статус',
        items: STATUSES
    }];

    // 3. Функсияи идоракунӣ барои SelectWithOptions
    const handleStatusSelect = useCallback((newStatus) => {
        setStatus(newStatus);
        setIsDropdownOpen(false); // Пӯшидани дропдаун пас аз интихоб
    }, []);

    const handleSave = useCallback((e) => {
        e.preventDefault();
        if (isFormValid) {
            onSave({ id: parseInt(lockerNumber.trim()), status: status, name: '' });
            onClose();
        }
    }, [isFormValid, lockerNumber, status, onSave, onClose]);

    // Ҳодисаи клик берун аз дропдаун барои пӯшидани он
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="w-full pb-6 bg-zinc-900 rounded-2xl p-6 h-full flex flex-col shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-700 pb-3">ДОБАВИТЬ ШКАФЧИК</h2>

            <form onSubmit={handleSave} className="flex-1 space-y-6 overflow-y-auto custom-scrollbar">

                <div>
                    <label className={labelStyle}>
                        Номер шкафчика<span className="text-lime-400">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Введите номер"
                        className={inputStyle}
                        value={lockerNumber}
                        onChange={(e) => setLockerNumber(e.target.value)}
                        required
                        min="1"
                    />
                </div>

                {/* 4. Иваз кардани RadioGroup бо SelectWithOptions */}
                <div className="relative" ref={dropdownRef}>
                    <label className={labelStyle}>
                        Статус шкафчика<span className="text-lime-400">*</span>
                    </label>
                    <input
                        type="text"
                        readOnly
                        placeholder="Укажите статус"
                        className={`${inputStyle} cursor-pointer pr-10`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        value={status}
                    />
                    <ChevronRight
                        className={`absolute right-3 top-9 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : ''}`}
                        size={20}
                    />
                    {isDropdownOpen && (
                        <div className="absolute top-full mt-2 w-full z-10">
                            {/* 5. Истифодаи SelectWithOptions бо пропертиҳои зарурӣ */}
                            <SelectWithOptions
                                data={statusData}
                                selectedValue={status}
                                onChange={handleStatusSelect}
                            />
                        </div>
                    )}
                </div>
                {/* Анҷоми қисмати SelectWithOptions */}

            </form>

            <div className="pt-6 flex justify-end space-x-3 border-t border-zinc-700 mt-6">
                <button
                    onClick={onClose}
                    type="button"
                    className="py-2 px-6 rounded-xl text-white font-semibold border border-zinc-600 hover:bg-zinc-800 transition"
                >
                    Отменить
                </button>
                <button
                    onClick={handleSave}
                    type="submit"
                    className={`py-2 px-6 rounded-xl text-black font-semibold transition ${isFormValid ? 'bg-lime-500 hover:bg-lime-400' : 'bg-gray-500 cursor-not-allowed'
                        }`}
                    disabled={!isFormValid}
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
}
