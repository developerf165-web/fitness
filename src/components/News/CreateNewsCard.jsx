import React from 'react';
import PropTypes from 'prop-types';

function CreateNewsCard({ onClick, title = "Создать новость" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group  flex flex-col justify-center items-center color-bg-card rounded-2xl cursor-pointer aspect-[16/9] text-white 
                 transition-all duration-300 ease-in-out bg-hover-card 
                 hover:-translate-y-2  {/* <- Класси hover:scale-105 хориҷ карда шуд */}
                 active:scale-95"
    >
      <div 
        className="w-12 h-12 rounded-full color-bg-accent text-black flex justify-center items-center text-3xl font-bold mb-4
                   transition-transform duration-300 ease-in-out
                   group-hover:rotate-90"
      >
        +
      </div>
      <p className="font-medium">{title}</p>
    </button>
  );
}

CreateNewsCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default CreateNewsCard;