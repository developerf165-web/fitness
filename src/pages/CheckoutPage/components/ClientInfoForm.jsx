import React from 'react';
import InputField from '../../components/ui/InputField';

export default function ClientInfoForm({ formData, onChange, errors }) {
    return (
        <div className="color-bg-card rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Информация о клиенте</h2>

            {/* Майдони ФИО */}
            <InputField
                label="ФИО"
                type="text"
                placeholder="Введите ФИО"
                value={formData.fullName}
                onChange={(e) => onChange('fullName', e.target.value)}
            />
            {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}

            {/* Майдони телефон */}
            <InputField
                label="Номер телефона"
                type="tel"
                placeholder="+992 XX XXX XX XX"
                value={formData.phone}
                onChange={(e) => onChange('phone', e.target.value)}
            />
            {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
        </div>
    );
}
