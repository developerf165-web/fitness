import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuButton from "./MenuButton.jsx"; 

export default function DropdownMenu({ items, children }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null); 
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {React.cloneElement(children, {
        ref: triggerRef,
        onClick: () => setOpen((s) => !s),
        "aria-haspopup": "true",
        "aria-expanded": open,
      })}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="menu"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-[190px] bg-[var(--color-bg-main)] rounded-xl py-1.5 z-[100] overflow-hidden shadow-lg"
          >
            {items.map((item, i) => (
              <MenuButton
                key={i}
                item={item}
                onClick={() => {
                  setOpen(false); 
                  item.action(); 
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}