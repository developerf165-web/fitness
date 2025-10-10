import React from 'react';
import { motion } from 'framer-motion';

const MenuButton = ({ item, onClick }) => {
  const DANGER_INITIAL_COLOR = "#f87171"; 
  const DANGER_HOVER_COLOR = "#ef4444";   
  const DEFAULT_TEXT_COLOR = "#f5f5f5";
  const DEFAULT_ICON_INITIAL_COLOR = "#9ca3af";

  const isDanger = item.className === "danger";
  const isHighlight = item.className === "highlight";

  return (
    <motion.button
      whileHover="hover"
      onClick={onClick}
      className="flex justify-between items-center font-montserrat font-medium w-full border-none rounded-lg border-b border-[var(--color-bg-card)] text-left cursor-pointer text-[12px] text-[#f5f5f5] mx-2 max-w-[90%] py-2 px-1"
      variants={{
        hover: {
          backgroundColor: "var(--color-bg-card)",
        },
      }}
    >
      <motion.span
        className="flex items-center pl-2 text-[12px]"
        variants={{
          hover: {
            x: 6,
            color: isDanger ? DANGER_HOVER_COLOR : DEFAULT_TEXT_COLOR,
          },
        }}
        initial={{ 
            color: isDanger ? DANGER_INITIAL_COLOR : DEFAULT_TEXT_COLOR 
        }} 
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {item.label}
      </motion.span>

      <motion.span
        className="flex items-center text-[12px]"
        variants={{
          hover: {
            color: isDanger
              ? DANGER_HOVER_COLOR
              : isHighlight
              ? "#fbbf24" 
              : "#ffffff",
          },
        }}
        initial={{ 
            color: isDanger ? DANGER_INITIAL_COLOR : DEFAULT_ICON_INITIAL_COLOR 
        }} 
        transition={{ duration: 0.2 }}
      >
        {item.icon}
      </motion.span>
    </motion.button>
  );
};

export default MenuButton;