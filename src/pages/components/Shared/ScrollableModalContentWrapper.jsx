import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ScrollableModalContentWrapper = ({ title, content, footer }) => {
  const contentRef = useRef(null);
  const [showTopBorder, setShowTopBorder] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const handleScroll = () => setShowTopBorder(el.scrollTop > 0);
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="color-bg-card rounded-2xl w-full max-w-lg flex flex-col max-h-[90vh] shadow-xl overflow-hidden"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-white p-6 pb-4 flex-shrink-0">{title}</h2>

        {/* Scrollable content */}
        <div
          ref={contentRef}
          className="overflow-y-auto px-6 flex-1 min-h-[200px] custom-scrollbar"
        >
          {content}
        </div>

        {/* Footer */}
        <div
          className={`flex justify-between mt-auto p-6 pt-4 flex-shrink-0 transition-all duration-150 ${
            showTopBorder ? "border-t color-border-mini-card" : "border-t-transparent"
          }`}
        >
          {footer}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScrollableModalContentWrapper;
