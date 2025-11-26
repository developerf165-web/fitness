export default function Badge({ value, color, className = "" }) {
  const colors = {
    yellow: "bg-yellow-700 text-white", 
    blue: "bg-[rgba(67,133,232,1)] text-white", 
    red: "bg-[rgba(255,37,103,1)] text-white",
    green: "bg-[rgba(22,219,101,1)] text-white", 
    purple: "bg-[rgba(168,85,247,1)] text-white",
    pink: "bg-[rgba(236,72,153,1)] text-white",
    indigo: "bg-[rgba(99,102,241,1)] text-white",
    teal: "bg-[rgba(20,184,166,1)] text-white", 
    orange: "bg-[rgba(249,115,22,1)] text-white", 
    gray: "bg-[rgba(107,114,128,1)] text-white", 
    accent: "color-bg-accent text-black", 
    blocked: "bg-[rgba(173,173,173,1)] text-white",
  };

  return (
    <span
      className={`rounded-full text-sm font-bold flex items-center justify-center w-6 h-6 ${
        colors[color] || colors["gray"] 
      } ${className}`}
    >
      {value}
    </span>
  );
}