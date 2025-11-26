const ErrorMessage = ({ message, throttleTime }) => {
  return (
    <p className="text-red-500 text-sm mb-4">
      {throttleTime > 0 
        ? `Попробуйте через ${throttleTime} секунд.` 
        : message
      }
    </p>
  );
};

export default ErrorMessage