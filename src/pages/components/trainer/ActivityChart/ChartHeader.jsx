import React from 'react';
import { useNavigate } from 'react-router-dom';

const cyrillicToLatin = (text) => {
    // Харитаи транслитератсияи пурра. 'ъ' ва 'ь' ба холигӣ иваз мешаванд.
    const map = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 
        'ъ': '', // Аломати сахтӣ - холигӣ
        'ы': 'y', 
        'ь': '', // Аломати нармӣ - холигӣ
        'э': 'e', 'ю': 'yu', 'я': 'ya',
        'ҷ': 'j', 'қ': 'q', 'ӯ': 'u', 'ҳ': 'h', 'ғ': 'gh', 'ӣ': 'i'
    };
    
    // 1. Ҳамаи ҳарфҳоро ба хурд табдил медиҳем.
    // 2. Ҳарфҳои кириллиро иваз мекунем.
    // 3. Ҳамаи аломатҳоеро, ки дар харита нестанд (масалан, қавсҳо, нуқтаҳо) ба ФОСИЛА иваз мекунем, то бо тире дуруст кор кунанд.
    return text.toLowerCase().split('').map(char => map[char] !== undefined ? map[char] : ' ').join('');
};

const ChartHeader = ({ title, series }) => {
    const navigate = useNavigate();

    const handleSeriesClick = (seriesName) => {
        if (!seriesName || typeof seriesName !== 'string') return;

        // Қадами 1: Аломатҳои кириллиро ба лотинӣ иваз мекунем ва аломатҳои махсусро ба фосила мегардонем
        const latinizedName = cyrillicToLatin(seriesName);
        
        // Қадами 2: Ҳамаи фосилаҳои пайдарпай ва аломатҳои ғайри-a-z/0-9-ро бо ТИРЕ иваз мекунем
        const path = latinizedName
                     .replace(/\s+/g, '-')             // Фосилаҳоро ба тире табдил медиҳем
                     .replace(/[^a-z0-9-]/g, '')       // Аломатҳои ғайри a-z/0-9/тире-ро тоза мекунем
                     .replace(/^-+|-+$/g, '');         // Тираҳои ибтидоӣ ва интиҳоиро тоза мекунем

        if (path) {
             // Ҳоло ин бояд novye-polzovateli бошад
             navigate(`/series/${path}`);
        } else {
             console.error(`Error: Cannot create a valid slug for series: ${seriesName}`);
        }
    };

    return (
        <div className="flex flex-wrap justify-between w-full items-center mb-4 gap-y-2">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-gray-300">
                {series.map((item) => (
                    <div 
                        key={item.name} 
                        className="flex items-center cursor-pointer hover:text-white transition-colors" 
                        onClick={() => handleSeriesClick(item.name)} 
                    >
                        <span
                            className="w-3 h-3 rounded-full mr-1.5"
                            style={{ backgroundColor: item.color }}
                        ></span>
                        {item.name}
                    </div>
                ))}
            </div>
            {title && (
                <div className="text-xl font-bold text-white">
                    {title}
                </div>
            )}
        </div>
    );
};

export default ChartHeader;