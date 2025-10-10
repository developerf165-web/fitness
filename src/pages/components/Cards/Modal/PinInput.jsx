import React, { useRef, useState } from 'react';

const PinInput = ({ length = 4, onComplete }) => {
  const [pin, setPin] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1); 
    setPin(newPin);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    const fullPin = newPin.join('');
    if (fullPin.length === length) {
      onComplete(fullPin);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-between space-x-3 mt-8 mb-8">
      {pin.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="tel" 
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`w-14 h-16 text-center text-3xl font-bold bg-gray-700/80 text-white rounded-lg border-2 transition duration-200 focus:outline-none 
             ${digit ? 'border-lime-400' : 'border-gray-700'} 
             ${index === pin.findIndex(d => !d) ? 'border-lime-400' : ''} // Нишондиҳандаи вуруди фаъол
          `}
        />
      ))}
    </div>
  );
};

export default PinInput;