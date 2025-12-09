import React, { useState, useCallback, useRef, useEffect } from 'react';
import { STATUSES } from '../constants';
import { ChevronRight } from 'lucide-react';
import SelectWithOptions from '/src/components/ui/SelectWithOptions/SelectWithOptions';

const labelStyle = "block pl-2 text-sm font-medium color-accent mb-1";
const inputStyle = "w-full p-3 rounded-xl color-bg-mini-card text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:color-accent border border-transparent";

export default function AddLockerForm({ onSave, setLockerDataForModal }) {
    const [lockerNumber, setLockerNumber] = useState('');
    const [status, setStatus] = useState(STATUSES[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isFormValid = lockerNumber.trim() !== '' && parseInt(lockerNumber.trim()) > 0;

    const statusData = [{ 
        items: STATUSES 
    }];

    useEffect(() => {
        setLockerDataForModal({ id: parseInt(lockerNumber.trim()) || null, status, name: '', isFormValid });
    }, [lockerNumber, status, isFormValid, setLockerDataForModal]);

    const handleStatusSelect = useCallback((newStatus) => {
        setStatus(newStatus);
        setIsDropdownOpen(false);
    }, []);

    const handleSave = useCallback((e) => {
        e.preventDefault();
        if (isFormValid) {
            onSave({ id: parseInt(lockerNumber.trim()), status, name: '' });
        }
    }, [isFormValid, lockerNumber, status, onSave]);

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
    }, []);

    return (
        <form onSubmit={handleSave} className="flex-1 p-4 min-h-[340px] space-y-6">
            <div>
                <label className={labelStyle}>
                    Номер шкафчика<span className="color-accent">*</span>
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

            <div className="relative" ref={dropdownRef}>
                <label className={labelStyle}>
                    Статус шкафчика<span className="color-accent">*</span>
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
                        <SelectWithOptions
                            data={statusData}
                            selectedValue={status}
                            onChange={handleStatusSelect}
                        />
                    </div>
                )}
                
            </div>
        </form>
    );
}