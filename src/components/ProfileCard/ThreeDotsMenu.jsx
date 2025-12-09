import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import getMenuItems from "/src/pages/components/Icons/menuData.jsx";
import MenuButton from "/src/components/ui/MenuButton";

export default function ThreeDotsMenu({
  onOpenDelete,
  onOpenBlock,
  onOpenRefill,
  onOpenWithdraw,
  onOpenEditProfile,
  onOpenUnblock,
  userStatus,
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
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

  const items = getMenuItems({
    onOpenDelete,
    onOpenBlock,
    onOpenRefill,
    onOpenWithdraw,
    onOpenEditProfile,
    onOpenUnblock,
    userStatus,
  });

  return (
    <div className="relative inline-block mt-5 w-[4px] h-[6px]">
      <button
        ref={buttonRef}
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="true"
        aria-expanded={open}
        className="border-none bg-transparent rounded-full cursor-pointer text-muted"
        title="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="1.75" />
          <circle cx="12" cy="12" r="1.75" />
          <circle cx="12" cy="19" r="1.75" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="menu"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 -mt-2 w-[190px] bg-[var(--color-bg-main)] rounded-xl py-1.5 z-[100] overflow-hidden shadow-lg"
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