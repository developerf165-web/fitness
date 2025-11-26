import React from "react";

const SubmitButton = ({ isFormFilled, error, disabled, loading }) => {
  const isDisabled = disabled || !!error || !isFormFilled || loading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`w-full font-bold rounded-lg transition duration-300 flex items-center justify-center
        h-12 px-4
        ${isDisabled 
          ? "color-bg-mini-card bg-hover-card text-white cursor-not-allowed" 
          : "color-bg-accent text-black cursor-pointer"}`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <span className="loader border-t-2 border-white rounded-full w-5 h-5 animate-spin"></span>
          <span>Загрузка...</span>
        </div>
      ) : (
        "Войти"
      )}
    </button>
  );
};

export default SubmitButton;
