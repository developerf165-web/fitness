import React from 'react';

const SelectWithOptions = ({ data, selectedValue, onChange }) => {
  return (
    <div className="color-bg-mini-card p-3 rounded-xl w-full max-w-sm max-h-40 overflow-y-auto custom-scrollbar">
      {data.map((section) => (
        <div key={section.title} className="mb-4 last:mb-0">
          <h3 className="color-accent text-sm font-medium mb-2 ml-2">
            {section.title}
          </h3>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = selectedValue === item;

              return (
                <li
                  key={item}
                  onClick={() => onChange(item)}
                  className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-zinc-700 transition-colors duration-200"
                >
                  <span className={`text-sm font-medium transition-colors ${isActive ? 'color-accent' : 'text-white'}`}>
                    {item}
                  </span>

                  <span
                    className={`
                      w-5 h-5 rounded-full border-2 transition-all duration-200
                      ${isActive
                        ? 'color-bg-accent border-none'
                        : 'border-zinc-600'
                      }
                    `}
                  ></span>
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