const CustomCheckbox = ({ id, label, checked = true, onChange, ...props }) => {
  return (
    <div className="relative mb-6 flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="
          peer h-6 w-6 cursor-pointer appearance-none rounded border border-gray-500
          bg-gray-300 checked:bg-[rgba(208,253,62,1)] checked:border-[rgba(208,253,62,1)]
          focus:outline-none
        "
        {...props}
      />
      {/* Галочка */}
      <svg
        className="pointer-events-none absolute left-1 top-1 h-4 w-4 text-black opacity-0 peer-checked:opacity-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <label
        htmlFor={id}
        className="ml-2 cursor-pointer text-sm font-medium text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
