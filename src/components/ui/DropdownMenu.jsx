import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import MenuButton from "./MenuButton.jsx";

export default function DropdownMenu({ items, children }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const toggleOpen = (e) => {
    e.stopPropagation();
    if (!open) {
      // Calculate position before opening
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        // Align right edge of menu (190px width) with right edge of trigger
        // Or simply place it. Let's try aligning top-left of menu to bottom-right of trigger, 
        // but typically standard dropdowns align left-left or right-right.
        // Original was 'absolute right-0', meaning right edges aligned.

        const menuWidth = 190;
        setPosition({
          top: rect.bottom + 8, // +8px margin
          left: rect.right - menuWidth
        });
      }
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

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
    // Update position on scroll could be complex, for now close on scroll
    function handleScroll() {
      if (open) setOpen(false);
    }

    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("scroll", handleScroll, true); // Capture phase to catch all scrolls
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [open]);

  return (
    <div className="relative inline-block">
      {React.cloneElement(children, {
        ref: triggerRef,
        onClick: toggleOpen,
        "aria-haspopup": "true",
        "aria-expanded": open,
      })}

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              role="menu"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              style={{ top: position.top, left: position.left }}
              className="fixed w-[190px] bg-[var(--color-bg-main)] rounded-xl py-1.5 z-[9999] overflow-hidden shadow-lg"
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
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}