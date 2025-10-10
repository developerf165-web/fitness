import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const maxButtons = 10; 
  let start = 1;
  let end = Math.min(totalPages, maxButtons);

  const buttons = [];
  for (let i = start; i <= end; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-2 py-1 cursor-pointer rounded ${
          currentPage === i ? "color-bg-accent text-black" : "bg-hover-card"
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex gap-1">
      {buttons}
      {totalPages > maxButtons && (
        <>
          <span className="px-2 py-1">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-2 py-1 cursor-pointer rounded ${
              currentPage === totalPages ? "color-bg-accent text-black" : "bg-hover-card"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
}

