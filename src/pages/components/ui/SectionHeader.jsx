import React from 'react';
import PropTypes from 'prop-types';
import AddButton from './AddButton'; // Ҳоло файли AddButton мавҷуд аст ва ин кор мекунад

export default function SectionHeader({ title, actionLabel, onAction, customRightElement }) {
  return (
    <div className='w-full flex py-6 justify-between items-center'>
      
      {/* Қисми чап: Сарлавҳа */}
      <div className='font-semibold text-white text-4xl rounded-2xl'>
        <h1>{title}</h1>
      </div>

      {/* Қисми рост */}
      <div className='flex items-center gap-4'>
        
        {/* Элементи иловагӣ (агар бошад) */}
        {customRightElement && (
          <div className="color-accent text-lg font-medium cursor-pointer hover:text-yellow-300 transition">
            {customRightElement}
          </div>
        )}

        {/* Тугмаи AddButton-ро истифода мебарем */}
        {actionLabel && (
          <AddButton 
            onClick={onAction} 
            label={actionLabel} // Матни тугмаро мефиристем
          />
        )}

      </div>
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,     // Матни тугма
  onAction: PropTypes.func,          // Функсия ҳангоми пахш
  customRightElement: PropTypes.node // Барои матнҳои иловагӣ
};