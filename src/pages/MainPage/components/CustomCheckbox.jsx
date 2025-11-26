// === FILE: /components/Schedule/CustomCheckbox.js ===

import React from 'react';
import { CheckIcon } from './icons';

const CustomCheckbox = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0
      ${checked 
        ? 'bg-transparent color-border-accent' 
        : 'border-gray-600 hover:border-gray-400'
      }`}
  >
    {checked && <CheckIcon className="w-3 h-3 text-white" />}
  </button>
);

export default CustomCheckbox;