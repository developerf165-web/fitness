import React, { useRef, useState, useEffect } from "react";

export default function SearchComponent({ query, setQuery, underlineTitle, rightAccessory = null, ...props }) {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocused(false);
        setHasScrolled(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isFocused && inputRef.current && !hasScrolled) {
      const rect = inputRef.current.getBoundingClientRect();
      const scrollTo = window.scrollY + rect.top - 100;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
      setHasScrolled(true);
    }
  }, [isFocused, hasScrolled]);

  const RightContent = () => {
    if (!isFocused) {
      // Агар rightAccessory дода шудааст → онро намоиш диҳ
      if (rightAccessory) {
        return (
          <div
            className="ml-4 cursor-pointer transition-opacity duration-300"
            style={{ color: "var(--accent-color)" }} // ⬅️ ранги аз variable
          >
            {rightAccessory}
          </div>
        );
      }

      // Агар rightAccessory нест → underlineTitle-ро намоиш диҳ
      if (underlineTitle) {
        return (
          <div
            className="ml-4 cursor-pointer underline transition-opacity duration-300"
            style={{ color: "var(--color-text-muted)" }} // ⬅️ ранги мутобиқ
          >
            <a href="/zablokirovanie">{underlineTitle}</a>
          </div>
        );
      }
    }

    // Агар isFocused → ҳеҷ чиз нишон надиҳ
    return null;
  };


  return (
    <div className="relative">
      <div className="flex justify-start items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Поиск по всем параметрам"
            value={query}
            ref={inputRef}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={props.onKeyDown} // Pass keydown event
            className={`transition-all duration-300 ease-in-out z-20 relative
                            ${isFocused ? "w-full" : "w-80 color-bg-nav"}
                            pl-10 p-3 rounded-xl color-bg-nav text-white text-sm`}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] bg-hover-card pointer-events-none z-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </div>

        <RightContent />
      </div>
    </div>
  );
}