const MailingFormFooter = ({ onClose, isFormValid }) => {
  return (
    <div className="mt-auto flex-shrink-0 flex justify-between space-x-4 pt-6">
      <button 
        type="button" 
        onClick={onClose} 
        className="color-bg-mini-card text-white font-semibold py-3 px-8 rounded-xl bg-hover-card cursor-pointer"
      >
        Отмена
      </button>
      <button
        type="submit"
        form="mailing-form"
        disabled={!isFormValid} // Тугмаро ғайрифаъол мекунем, агар форма пурра набошад
        className={`font-semibold py-3 px-8 rounded-xl transition-colors duration-200 
          ${isFormValid
            ? 'color-bg-accent text-black cursor-pointer hover:opacity-90'
            : 'color-bg-mini-card text-white cursor-not-allowed opacity-60'
          }`
        }
      >
        Добавить
      </button>
    </div>
  );
};

export default MailingFormFooter;