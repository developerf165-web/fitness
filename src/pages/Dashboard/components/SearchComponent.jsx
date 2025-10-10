import React, { useState, useMemo, useRef, useEffect } from "react";
import Fuse from "fuse.js";

export default function SearchComponent({ data, underlineTitle }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1); 
  const listRef = useRef(); 
  const inputRef = useRef();

  useEffect(() => {
  if (active && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
   }
  }, [active]);

  

  const Data = useMemo(
    () => (data || []).filter((u) => !u.blocked),
    [data]
  );

  const fuse = useMemo(() => {
    return new Fuse(Data, {
      keys: ["name", "phone", "status", "abonement", "course"],
      threshold: 0.3,
    });
  }, [Data]);

  const results = query ? fuse.search(query) : [];

  const highlight = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="color-bg-accent rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex];
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  const handleKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        const selected = results[highlightIndex].item;
        setQuery(selected.name);
        setActive(false);
        setHighlightIndex(-1);
      }
    }
  };

  return (
    <div className="relative">
      {active && (
        <div
          className="fixed inset-0 color-bg-main z-10"
          onClick={() => setActive(false)}
        />
      )}
      <div className="flex justify-between items-center pt-12">
      <div className="relative w-full">
      <input
          type="text"
          placeholder="Поиск по всем параметрам"
          value={query}
          ref={inputRef}
          onChange={(e) => {
          setQuery(e.target.value);
          setHighlightIndex(0);
          setActive(true);
          }}
          onFocus={() => setActive(true)}
          onKeyDown={handleKeyDown}
          className={`transition-all scroll-mt-16 duration-300 ease-in-out z-20 relative
          ${active ? "w-full" : "w-80 color-bg-nav"} 
          pl-10 p-3 rounded-xl color-bg-nav/50 text-white text-sm`}
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
      <div className={`color-text-muted cursor-pointer underline ${active ? "hidden" : "display"}`}>
        <a href="/zablokirovanie">{underlineTitle}</a>
      </div>
      </div>

      {active && query && (
        <div
          ref={listRef} 
          className="absolute mt-2 w-full max-h-60 overflow-y-auto z-[9999] color-bg-nav rounded-xl shadow-lg hide-scrollbar"
        >
          {results.length ? (
            results.map(({ item }, i) => (
              <div
                key={i}
                className={`p-3 cursor-pointer z-[9999] ${
                  highlightIndex === i ? "color-bg-nav/50" : "color-bg-nav/30"
                }`}
                onMouseEnter={() => setHighlightIndex(i)} 
                onClick={() => {
                  setQuery(item.name);
                  setActive(false);
                  setHighlightIndex(-1);
                }}
              >
                <div>{highlight(item.name)}</div>
                <div className="text-sm">
                  {highlight(item.phone)} — {highlight(item.status)} — {highlight(item.course)}
                </div>
              </div>
            ))
          ) : (
            <div className="p-5 color-bg-nav/50 color-text-muted ">Результатов не найдено</div>
          )}
        </div>
      )}
    </div>
  );
}
