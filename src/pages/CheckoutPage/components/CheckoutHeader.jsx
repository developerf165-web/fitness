import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutHeader() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Бозгашт ба саҳифаи қаблӣ
    };

    return (
        <div className="flex items-center gap-4 mb-6">
            {/* Тугмаи бозгашт */}
            <button
                onClick={handleBack}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label="Назад"
            >
                <ArrowLeft size={24} className="text-white" />
            </button>

            {/* Сарлавҳа */}
            <h1 className="text-3xl font-bold text-white">Касса</h1>
        </div>
    );
}
