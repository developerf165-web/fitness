import React from 'react';

const SelectWithOptions = ({ data, selectedValue, onChange }) => {
  
const isMultiSelect = Array.isArray(selectedValue);

const checkIsActive = (item) => {
    if (isMultiSelect) {
        return selectedValue.includes(item);
    } else {
        return selectedValue === item;
    }
}

  return (
    <div className="color-bg-mini-card p-3 rounded-xl w-full max-h-40 overflow-y-auto custom-scrollbar shadow-lg shadow-black/20">
      {data.map((section) => (
        <div key={section.title} className="mb-4 last:mb-0">
          <h3 className="color-accent text-sm font-medium mb-2 ml-2">
            {section.title}
          </h3>
          <ul className="space-y-1">
            {section.items.map((item) => {
              // Ислоҳ: Истифодаи мантиқи checkIsActive барои ҳарду ҳолат
              const isActive = checkIsActive(item); 

              return (
                <li
                  key={item}
                  onClick={() => onChange(item)}
                  className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-zinc-700 transition-colors duration-200"
                >
                  <span
                    className={`text-sm font-medium transition-colors ${
                      isActive ? 'color-accent' : 'text-white'
                    }`}
                  >
                    {item}
                  </span>

                  <span
                    className={`
                      w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                      ${isActive
                        ? 'color-bg-accent border-none'
                        : 'border-zinc-600'
                      }
                    `}
                  >
                    {/* Иловаи аломати чек (✓) дар дохили доирачаи зард, ки акнун барои Clients низ кор мекунад */}
                    {isActive && <span className="text-black text-xs font-bold">✓</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SelectWithOptions;